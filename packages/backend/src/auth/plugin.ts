import { type Auth, betterAuth, type BetterAuthOptions } from "better-auth";
import type { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { mailturaAdapter } from "./database.js";
import { magicLink, openAPI, twoFactor } from "better-auth/plugins";
import { passkey } from "@better-auth/passkey";
import { registerAuthHandler } from "./handler.js";
import { newPasswordHasher } from "./password-hasher.js";
import { registerCustomAuthRoutes } from "./custom-handlers.js";
import { createRouter } from "../router/index.js";
import { sendMagicLinkEmail, sendResetPasswordEmail, sendVerificationEmail } from "../mail/index.js";
import type { ServerContext } from "../context/index.js";

declare module "fastify" {
  interface FastifyInstance {
    auth: Auth;
  }
}

export type AuthOptions = Partial<BetterAuthOptions>;

const auth = fastifyPlugin<AuthOptions & { context: ServerContext }>(
  async (fastify: FastifyInstance, options: BetterAuthOptions & { context: ServerContext }) => {
    const auth = createBetterAuth(options, options.context);

    fastify.decorate("auth", auth);
    fastify.register(app => {
      app.addContentTypeParser("application/json", (_, __, done) => {
        done(null, null);
      });

      // Register routes
      registerAuthHandler(app, auth);
    });

    // Register custom routes
    createRouter(fastify, options.context, true).route("/api/v1/auth", router =>
      registerCustomAuthRoutes(router, auth)
    );
  },
  { name: "auth" }
);

export default auth;

const createBetterAuth = (options: BetterAuthOptions, context: ServerContext) => {
  return betterAuth({
    ...options,
    database: mailturaAdapter({ debugLogs: false, prisma: context.prisma }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      revokeSessionsOnPasswordReset: true,
      password: newPasswordHasher(),
      autoSignIn: false,
      sendResetPassword: async ({ user, token }) => {
        sendResetPasswordEmail(context.prisma, context.taskManager, user.email, token);
      },
    },
    emailVerification: {
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, token }) => {
        sendVerificationEmail(context.prisma, context.taskManager, user.email, token);
      },
    },
    plugins: [
      openAPI({}),
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
        sendMagicLink: async ({ email, token }) => {
          sendMagicLinkEmail(context.prisma, context.taskManager, email, token);
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
      cookies: {
        session_token: {
          attributes: {
            maxAge: 604800,
            httpOnly: false,
          },
        },
      },
      defaultCookieAttributes: {
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: false,
      },
      database: {
        useNumberId: false,
        generateId: false,
      },
    },
    databaseHooks: {
      session: {
        create: {
          before: async session => {
            session.updatedBy = "api";
          },
          after: async session => {
            await context.prisma.users.update({
              where: {
                id: session.userId,
              },
              data: {
                last_login_at: session.createdAt,
              },
            });
          },
        },
        update: {
          before: async session => {
            session.updatedBy = "api";
          },
        },
      },
      verification: {
        create: {
          before: async verification => {
            verification.created_by = "api";
          },
        },
        update: {
          before: async verification => {
            verification.updated_by = "api";
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
    verification: {
      modelName: "verifications",
      fields: {
        identifier: "identifier",
        value: "value",
        expiresAt: "expires_at",
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
      additionalFields: {
        createdBy: {
          fieldName: "created_by",
          type: "string",
          input: false,
          required: true,
          defaultValue: "api",
        },
        updatedBy: {
          fieldName: "updated_by",
          type: "string",
          input: false,
          required: true,
          defaultValue: "api",
        },
      },
    },
  });
};
