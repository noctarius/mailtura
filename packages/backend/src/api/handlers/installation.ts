import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils.js";
import type { FastifyTypeProvider, FastifyTypeProviderDefault } from "fastify/types/type-provider.js";
import type { FastifyBaseLogger } from "fastify/types/logger.js";
import type { Router } from "../../router/index.js";
import { MailConfig } from "@mailtura/rpcmodel/mails/index.js";
import { type Static, Type } from "typebox";
import { requiresInstallation } from "../../helpers/requires-installation.js";
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { newPasswordHasher } from "../../auth/password-hasher.js";
import prisma from "@mailtura/database";

const UserEmail = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
  firstName: Type.String(),
  lastName: Type.String(),
});

const Installation = Type.Object({
  user: UserEmail,
  systemMail: MailConfig,
});

type Installation = Static<typeof Installation>;

const passwordHasher = newPasswordHasher();

const filterMailSettings = (mailSettings: MailConfig) => {
  const { name, type, ...rest } = mailSettings;
  return rest;
};

export function installationRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.get(
    "/",
    {
      schema: {
        hide: true,
      },
    },
    async (_, reply) => {
      if (!(await requiresInstallation())) {
        return reply.status(500).send({ installation: "Finished" });
      }
      return reply.send({ installation: "required" });
    }
  );

  router.post<{ Body: Installation }>(
    "/",
    {
      schema: {
        hide: true,
        body: Installation,
      },
    },
    async (request, reply) => {
      if (!(await requiresInstallation())) {
        return reply.status(500).send({ installation: "Finished" });
      }

      return prisma.$transaction(async tx => {
        // Create Tenant
        const tenant = await tx.tenants.create({
          data: {
            name: "System",
            created_at: UTC.now().toDate(),
            created_by: "api",
          },
        });

        // System admin role
        const systemAdmin = await tx.roles.create({
          data: {
            tenant_id: tenant.id,
            name: "Super Admin",
            description: "System administrator",
            permissions: [
              "manage::tenants",
              "manage::users",
              "manage::campaigns",
              "manage::templates",
              "manage::contacts",
              "manage::reports",
              "manage::settings",
              "manage::suppressions",
              "manage::api-keys",
              "manage::integrations",
              "manage::logs",
              "manage::webhooks",
            ],
            created_at: UTC.now().toDate(),
            created_by: "api",
          },
        });

        // Tenant admin role
        await tx.roles.create({
          data: {
            tenant_id: tenant.id,
            name: "Tenant Admin",
            description: "Can fully manage the tenant",
            permissions: [
              "manage::users",
              "manage::campaigns",
              "manage::templates",
              "manage::contacts",
              "manage::reports",
              "manage::settings",
              "manage::suppressions",
              "manage::api-keys",
              "manage::integrations",
              "manage::logs",
              "manage::webhooks",
            ],
            created_at: UTC.now().toDate(),
            created_by: "api",
          },
        });

        // User role
        await tx.roles.create({
          data: {
            tenant_id: tenant.id,
            name: "User",
            description: "Can manage campaigns, contacts, and templates",
            permissions: [
              "manage::campaigns",
              "manage::templates",
              "manage::contacts",
              "view::reports",
              "view::suppressions",
              "view::logs",
            ],
            created_at: UTC.now().toDate(),
            created_by: "api",
          },
        });

        // Viewer role
        await tx.roles.create({
          data: {
            tenant_id: tenant.id,
            name: "Viewer",
            description: "Can view reports, suppressions, and logs",
            permissions: ["view::reports", "view::suppressions", "view::logs"],
            created_at: UTC.now().toDate(),
            created_by: "api",
          },
        });

        // Create user
        const user = await tx.users.create({
          data: {
            tenant_id: tenant.id,
            email: request.body.user.email,
            first_name: request.body.user.firstName,
            last_name: request.body.user.lastName,
            active: true,
            email_verified: true,
            permissions: systemAdmin.permissions,
            role_id: systemAdmin.id,
            created_at: UTC.now().toDate(),
            created_by: "api",
          },
        });

        // Create account
        await tx.accounts.create({
          data: {
            user_id: user.id,
            account_id: user.id,
            provider_id: "credential",
            password: await passwordHasher.hash(request.body.user.password),
            created_at: UTC.now().toDate(),
            created_by: "api",
          },
        });

        await tx.mail_configs.create({
          data: {
            tenant_id: tenant.id,
            name: "System",
            type: request.body.systemMail.type,
            config: filterMailSettings(request.body.systemMail),
            created_at: UTC.now().toDate(),
            created_by: "api",
          },
        });

        return reply.status(201).send({ installation: "finished" });
      });
    }
  );
}
