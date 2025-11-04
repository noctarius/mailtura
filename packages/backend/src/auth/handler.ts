import type { FastifyInstance, FastifyReply, HTTPMethods } from "fastify";
import type { Auth } from "better-auth";
import { Type } from "typebox";
import type { FastifySchema } from "fastify/types/schema.js";
import path from "node:path";
import { toNodeHandler } from "better-auth/node";

export function createForgetPasswordCallback(app: FastifyInstance, auth: Auth) {
  return createAuthRoute(app, auth, "/reset-password/:token", "GET", {
    tags: ["auth"],
    querystring: Type.Object({
      callbackURL: Type.String(),
    }),
    response: {
      200: Type.Ref("ForgetPasswordResponse"),
    },
  });
}

export function createSignOut(app: FastifyInstance, auth: Auth) {
  return createAuthRoute(app, auth, "/sign-out", "POST", {
    tags: ["auth"],
    response: {
      200: Type.Null(),
    },
  });
}

export function createPasswordReset(app: FastifyInstance, auth: Auth) {
  return createAuthRoute(app, auth, "/request-password-reset", "POST", {
    tags: ["auth"],
    response: {
      200: Type.Ref("PasswordResetResponse"),
    },
  });
}

export function createVerifyEmail(app: FastifyInstance, auth: Auth) {
  return createAuthRoute(app, auth, "/verify-email", "GET", {
    tags: ["auth"],
    querystring: Type.Object({
      token: Type.String(),
      callbackUrl: Type.Optional(Type.String()),
    }),
    response: {
      200: Type.Ref("VerifyEmailResponse"),
    },
  });
}

export function createSignUpEmail(app: FastifyInstance, auth: Auth) {
  return createAuthRoute(app, auth, "/sign-up/email", "POST", {
    tags: ["auth"],
    body: Type.Ref("SignUpEmail"),
    response: {
      200: Type.Ref("SignUpEmailResponse"),
    },
  });
}

export function createSignInSocial(app: FastifyInstance, auth: Auth) {
  return createAuthRoute(app, auth, "/sign-in/social", "POST", {
    tags: ["auth"],
    body: Type.Ref("SignInSocial"),
    response: {
      200: Type.Ref("SignInSocialResponse"),
    },
  });
}

export function createSignInEmail(app: FastifyInstance, auth: Auth) {
  return createAuthRoute(app, auth, "/sign-in/email", "POST", {
    tags: ["auth"],
    body: Type.Ref("SignInEmail"),
    response: {
      200: Type.Ref("SignInEmailResponse"),
    },
  });
}

export function createGetSessionRoute(app: FastifyInstance, auth: Auth) {
  return createAuthRoute(app, auth, "/get-session", "GET", {
    tags: ["auth"],
    response: {
      200: Type.Ref("GetSessionResponse"),
    },
  });
}

const createAuthRoute = <SchemaCompiler extends FastifySchema = FastifySchema>(
  app: FastifyInstance,
  auth: Auth,
  subPath: string,
  method: HTTPMethods,
  schema: SchemaCompiler
) => {
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
