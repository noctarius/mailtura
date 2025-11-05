import type { FastifyInstance, FastifyReply, HTTPMethods } from "fastify";
import type { Auth } from "better-auth";
import path from "node:path";
import { toNodeHandler } from "better-auth/node";

export function registerAuthHandler(app: FastifyInstance, auth: Auth) {
  createSignInSocial(app, auth);
  createGetSession(app, auth);
  createSignOut(app, auth);
  createSignUpEmail(app, auth);
  createSignInEmail(app, auth);
  createResetPassword(app, auth);
  createForgetPassword(app, auth);
  createVerifyEmail(app, auth);
  createSendVerificationEmail(app, auth);
  createChangeEmail(app, auth);
  createChangePassword(app, auth);
  createResetPasswordCallback(app, auth);
  createRequestPasswordReset(app, auth);
  createListSessions(app, auth);
  createRevokeSession(app, auth);
  createRevokeSessions(app, auth);
  createRevokeOtherSessions(app, auth);
  createLinkSocial(app, auth);
  createListAccounts(app, auth);
  createUnlinkAccount(app, auth);
  createRefreshToken(app, auth);
  createGetAccessToken(app, auth);
  createAccountInfo(app, auth);
  createGetTotpUri(app, auth);
  createVerifyTotp(app, auth);
  createSendOtp(app, auth);
  createVerifyOtp(app, auth);
  createVerifyBackupCode(app, auth);
  createGenerateBackupCodes(app, auth);
  createTwoFactorEnable(app, auth);
  createTwoFactorDisable(app, auth);
  createGenerateRegisterOptions1(app, auth);
  createGenerateRegisterOptions2(app, auth);
  createVerifyRegistration(app, auth);
  createVerifyAuthentication(app, auth);
  createListUserPasskeys(app, auth);
  createDeletePasskey(app, auth);
  createUpdatePasskey(app, auth);
  createMagicLink(app, auth);
  createMagicLinkVerify(app, auth);
}

const createMagicLinkVerify = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/magic-link/verify", "GET");
};

const createMagicLink = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/sign-in/magic-link", "POST");
};

const createUpdatePasskey = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/passkey/update-passkey", "POST");
};

const createDeletePasskey = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/passkey/delete-passkey", "POST");
};

const createListUserPasskeys = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/passkey/list-user-passkeys", "POST");
};

const createVerifyAuthentication = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/passkey/verify-authentication", "POST");
};

const createVerifyRegistration = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/passkey/verify-registration", "POST");
};

const createGenerateRegisterOptions2 = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/passkey/generate-register-options", "POST");
};

const createGenerateRegisterOptions1 = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/passkey/generate-register-options", "GET");
};

const createTwoFactorDisable = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/two-factor/disable", "POST");
};

const createTwoFactorEnable = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/two-factor/enable", "POST");
};

const createGenerateBackupCodes = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/two-factor/generate-backup-codes", "POST");
};

const createVerifyBackupCode = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/two-factor/verify-backup-code", "POST");
};

const createVerifyOtp = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/two-factor/verify-otp", "POST");
};

const createSendOtp = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/two-factor/send-otp", "POST");
};

const createVerifyTotp = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/two-factor/verify-totp", "POST");
};

const createGetTotpUri = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/two-factor/get-totp-uri", "POST");
};

const createAccountInfo = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/account-info", "POST");
};

const createGetAccessToken = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/get-access-token", "POST");
};

const createRefreshToken = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/refresh-token", "POST");
};

const createUnlinkAccount = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/unlink-accounts", "POST");
};

const createListAccounts = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/list-accounts", "GET");
};

const createLinkSocial = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/link-social", "POST");
};

const createRevokeOtherSessions = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/revoke-other-sessions", "POST");
};

const createRevokeSessions = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/revoke-sessions", "POST");
};

const createRevokeSession = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/revoke-session", "POST");
};

const createListSessions = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/list-sessions", "GET");
};

const createRequestPasswordReset = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/request-password-reset", "POST");
};

const createResetPasswordCallback = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/reset-password/:token", "GET");
};

const createChangePassword = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/change-password/", "POST");
};

const createChangeEmail = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/change-email/", "POST");
};

const createForgetPassword = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/forget-password/", "POST");
};

const createResetPassword = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/reset-password/", "POST");
};

const createSignOut = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/sign-out", "POST");
};

const createSendVerificationEmail = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/send-verification-email", "POST");
};

const createVerifyEmail = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/verify-email", "GET");
};

const createSignUpEmail = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/sign-up/email", "POST");
};

const createSignInSocial = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/sign-in/social", "POST");
};

const createSignInEmail = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/sign-in/email", "POST");
};

const createGetSession = (app: FastifyInstance, auth: Auth) => {
  return createAuthRoute(app, auth, "/get-session", "GET");
};

const createAuthRoute = (app: FastifyInstance, auth: Auth, subPath: string, method: HTTPMethods) => {
  const authBasePath = auth.options.basePath ?? "/api/auth";
  const authRoute = path.join(authBasePath, subPath);
  const handler = toNodeHandler(auth);
  const handlerMethod =
    method === "GET"
      ? app.get.bind(app)
      : method === "POST"
        ? app.post.bind(app)
        : method === "PUT"
          ? app.put.bind(app)
          : method === "DELETE"
            ? app.delete.bind(app)
            : method === "PATCH"
              ? app.patch.bind(app)
              : method === "OPTIONS"
                ? app.options.bind(app)
                : app.all.bind(app);

  return handlerMethod(authRoute, {
    schema: {
      hide: true,
    },
    handler: async (request, reply) => {
      reply.raw.setHeaders(toNodeHeaders(reply.getHeaders()));
      await handler(request.raw, reply.raw);
    },
  });
};

type HttpHeaders = Partial<ReturnType<FastifyReply["getHeaders"]>>;

const toNodeHeaders = (fastifyHeaders: HttpHeaders) => {
  const headers = new Headers();
  Object.entries(fastifyHeaders).forEach(([key, value]) => {
    if (value) headers.append(key, value.toString());
  });

  return headers;
};
