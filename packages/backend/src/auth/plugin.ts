import { type Auth, betterAuth, type BetterAuthOptions } from "better-auth";
import type { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { mailturaAdapter } from "./database.js";
import { apiKey, magicLink, openAPI, twoFactor } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { v7 as uuidv7 } from "uuid";
import { registerAuthHandler } from "./handler.js";
import prisma from "../database/index.js";
import { newPasswordHasher } from "./password-hasher.js";

declare module "fastify" {
  interface FastifyInstance {
    auth: Auth;
  }
}

export type AuthOptions = Partial<BetterAuthOptions>;

const auth = fastifyPlugin<AuthOptions>(
  async (fastify: FastifyInstance, options: BetterAuthOptions) => {
    const auth = createBetterAuth(options);
    const openApiSpec = JSON.stringify(await auth.api.generateOpenAPISchema());

    fastify.decorate("auth", auth);
    fastify.register(app => {
      app.addContentTypeParser("application/json", (_, __, done) => {
        done(null, null);
      });

      app.get("/docs/json2", { schema: { hide: true } }, async (_, reply) => {
        return reply.type("application/json").send(openApiSpec);
      });

      // Register routes and openapi schema
      registerAuthHandler(app, auth);
    });
  },
  { name: "auth" }
);

export default auth;

const createBetterAuth = (options: BetterAuthOptions) => {
  return betterAuth({
    ...options,
    database: mailturaAdapter({ debugLogs: true }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      password: newPasswordHasher(),
    },
    plugins: [
      openAPI({}),
      apiKey({}),
      twoFactor({
        schema: {
          user: {
            modelName: "users",
            fields: {
              userId: "user_id",
              backupCodes: "backup_codes",
              twoFactorEnabled: "two_factor_enabled",
            },
          },
        },
      }),
      passkey({
        schema: {
          passkey: {
            modelName: "passkeys",
            fields: {
              userId: "user_id",
              createdAt: "created_at",
              backedUp: "backed_up",
              credentialID: "credential_id",
              deviceType: "device_type",
              publicKey: "public_key",
            },
          },
        },
      }),
      magicLink({
        sendMagicLink: async (user, token) => {
          // TODO implement magic link sending
          console.log("Sending magic link to", user.email, "with token", token);
        },
      }),
    ],
    appName: "Mailtura",
    baseURL: "http://localhost:3000",
    basePath: "/api/v1/auth",
    trustedOrigins: ["http://localhost:3000", "http://localhost:5173"],
    secret: process.env.MAILTURA_AUTH_SECRET,
    advanced: {
      cookiePrefix: "mailtura",
      defaultCookieAttributes: {
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
      database: {
        useNumberId: false,
        generateId: () => uuidv7().toString(),
      },
    },
    databaseHooks: {
      session: {
        create: {
          after: async session => {
            await prisma.users.update({
              where: {
                id: session.userId,
              },
              data: {
                last_login_at: session.createdAt,
              },
            });
          },
        },
      },
    },
    user: {
      modelName: "users",
      fields: {
        createdAt: "created_at",
        updatedAt: "updated_at",
        emailVerified: "email_verified",
      },
      additionalFields: {
        tenantId: {
          fieldName: "tenant_id",
          type: "string",
          required: true,
          returned: true,
          input: true,
        },
        role: {
          fieldName: "role",
          type: "string",
          required: true,
          defaultValue: "",
          returned: true,
          input: true,
        },
        isActive: {
          fieldName: "is_active",
          type: "boolean",
          required: true,
          defaultValue: false,
          returned: true,
          input: true,
        },
        firstName: {
          fieldName: "first_name",
          type: "string",
          required: false,
          returned: true,
        },
        lastName: {
          fieldName: "last_name",
          type: "string",
          required: false,
          returned: true,
        },
        permissions: {
          fieldName: "permissions",
          type: "string[]",
          returned: true,
        },
        createdBy: {
          fieldName: "created_by",
          type: "string",
          required: true,
          defaultValue: "api",
          returned: true,
          input: true,
        },
        updatedBy: {
          fieldName: "updated_by",
          type: "string",
          required: false,
          returned: true,
        },
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      cookieCache: {
        enabled: true,
        maxAge: 60 * 5,
      },
      modelName: "sessions",
      fields: {
        userId: "user_id",
        userAgent: "user_agent",
        ipAddress: "ip_address",
        expiresAt: "expires_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
      additionalFields: {
        createdBy: {
          fieldName: "created_by",
          type: "string",
          required: true,
          defaultValue: "api",
          returned: true,
          input: true,
        },
        updatedBy: {
          fieldName: "updated_by",
          type: "string",
          required: false,
          returned: true,
        },
      },
    },
    account: {
      modelName: "accounts",
      fields: {
        userId: "user_id",
        accountId: "account_id",
        providerId: "provider_id",
        accessToken: "access_token",
        refreshToken: "refresh_token",
        expiresAt: "expires_at",
        accessTokenExpiresAt: "access_token_expires_at",
        refreshTokenExpiresAt: "refresh_token_expires_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
      additionalFields: {
        createdBy: {
          fieldName: "created_by",
          type: "string",
          required: true,
          defaultValue: "api",
          returned: true,
          input: true,
        },
        updatedBy: {
          fieldName: "updated_by",
          type: "string",
          required: false,
          returned: true,
        },
      },
    },
  });
};
