import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils.js";
import type { FastifyTypeProvider, FastifyTypeProviderDefault } from "fastify/types/type-provider.js";
import type { FastifyBaseLogger } from "fastify/types/logger.js";
import type { Router } from "../../router/index.js";
import { type Static, Type } from "typebox";
import { requiresInstallation } from "../../helpers/requires-installation.js";
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { newPasswordHasher } from "../../auth/password-hasher.js";
import { CreateMailConfig } from "@mailtura/rpcmodel/api/request-response.js";
import { Prisma } from "@mailtura/database";
import { uuidv7 } from "@mailtura/rpcmodel/helpers/index.js";

const UserEmail = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
  firstName: Type.String(),
  lastName: Type.String(),
});

const Installation = Type.Object(
  {
    user: UserEmail,
    systemMail: CreateMailConfig,
  },
  {
    type: "object",
    additionalProperties: false,
  }
);

type Installation = Static<typeof Installation>;

const passwordHasher = newPasswordHasher();

export function installationRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  const { prisma } = router.context();
  router.get(
    "/",
    {
      schema: {
        hide: true,
      },
    },
    async (_, reply) => {
      if (!(await requiresInstallation(prisma))) {
        return reply.status(500).send({ installation: "finished" });
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
      if (!(await requiresInstallation(prisma))) {
        return reply.status(500).send({ installation: "finished" });
      }

      return prisma.$transaction(async tx => {
        // Create Tenant
        const tenant = await tx.tenants.create({
          data: {
            id: uuidv7(),
            name: "::system::",
            created_at: UTC.now().toDate(),
            created_by: "api",
          },
        });

        // System admin role
        const systemAdmin = await tx.roles.create({
          data: {
            id: uuidv7(),
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
            id: uuidv7(),
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
            id: uuidv7(),
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
            id: uuidv7(),
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
            id: uuidv7(),
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
            id: uuidv7(),
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
            id: uuidv7(),
            tenant_id: tenant.id,
            name: request.body.systemMail.name,
            type: request.body.systemMail.type,
            config: request.body.systemMail.config as Prisma.InputJsonValue,
            created_at: UTC.now().toDate(),
            created_by: "api",
          },
        });

        return reply.status(201).send({ installation: "finished" });
      });
    }
  );
}
