import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils.js";
import type { FastifyTypeProvider, FastifyTypeProviderDefault } from "fastify/types/type-provider.js";
import type { FastifyBaseLogger } from "fastify/types/logger.js";
import type { Router } from "../router/index.js";
import { type Static, Type } from "typebox";
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { newPasswordHasher } from "./password-hasher.js";
import { createEmailVerificationToken } from "better-auth/api";
import type { Auth } from "better-auth";
import { mapUser } from "@mailtura/database";
import { sendInviteEmail } from "../mail/index.js";
import uuidv7 from "../helpers/uuidv7.js";

const SignUpEmail = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
  firstName: Type.String(),
  lastName: Type.String(),
  callbackURL: Type.Optional(Type.String({ format: "uri" })),
});

type SignUpEmail = Static<typeof SignUpEmail>;

const passwordHasher = newPasswordHasher();

export function registerCustomAuthRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>, auth: Auth) {
  const prisma = router.context().prisma;
  router.post<{ Body: SignUpEmail }>(
    "/sign-up/email",
    {
      schema: {
        hide: true,
        body: SignUpEmail,
        response: {
          201: Type.Ref("User"),
          409: Type.Object({ message: Type.String() }),
        },
      },
    },
    async (request, reply) => {
      const { email, password, firstName, lastName } = request.body;

      const existingUser = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        return reply.status(409).send({ message: "User already exists" });
      }

      return prisma.$transaction(async tx => {
        // Create Tenant
        const tenant = await tx.tenants.create({
          data: {
            id: uuidv7(),
            name: (firstName.endsWith("s") ? `${firstName}'` : `${firstName}'s`) + " Tenant",
            created_at: UTC.now().toDate(),
            created_by: "api",
          },
        });

        // Tenant admin role
        const tenantAdmin = await tx.roles.create({
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
            email,
            first_name: firstName,
            last_name: lastName,
            active: true,
            permissions: tenantAdmin.permissions,
            role_id: tenantAdmin.id,
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
            password: await passwordHasher.hash(password),
            created_at: UTC.now().toDate(),
            created_by: "api",
          },
        });

        // Create and send verification email
        const token = await createEmailVerificationToken(auth.options.secret!, email, void 0, 60 * 5);
        const url = `${auth.options.baseURL}/api/v1/auth/verify-email?token=${token}&callbackURL=${request.body.callbackURL || "/"}`;
        await sendInviteEmail(prisma, router.context().taskManager, user, url);

        return reply.status(201).send(mapUser(user));
      });
    },
    false
  );
}
