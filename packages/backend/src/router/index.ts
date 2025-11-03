import type { FastifyInstance } from "fastify";
import type { RouteGenericInterface, RouteHandlerMethod, RouteShorthandOptions } from "fastify/types/route.js";
import type {
  ContextConfigDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils.js";
import type { FastifyTypeProvider, FastifyTypeProviderDefault } from "fastify/types/type-provider.js";
import type { FastifyBaseLogger } from "fastify/types/logger.js";
import type { FastifySchema } from "fastify/types/schema.js";
import { fromNodeHeaders } from "better-auth/node";
import type { Session, User } from "better-auth";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

declare module "fastify" {
  interface FastifyRequest {
    user?: User;
    session?: Session;
  }
}

export interface Router<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
> {
  get: <
    RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
    ContextConfig = ContextConfigDefault,
    SchemaCompiler extends FastifySchema = FastifySchema,
  >(
    path: string,
    opts: RouteShorthandOptions<
      RawServer,
      RawRequest,
      RawReply,
      RouteGeneric,
      ContextConfig,
      SchemaCompiler,
      TypeProvider,
      Logger
    >,
    handler: RouteHandlerMethod<
      RawServer,
      RawRequest,
      RawReply,
      RouteGeneric,
      ContextConfig,
      SchemaCompiler,
      TypeProvider,
      Logger
    >
  ) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>;
  post: <
    RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
    ContextConfig = ContextConfigDefault,
    const SchemaCompiler extends FastifySchema = FastifySchema,
  >(
    path: string,
    opts: RouteShorthandOptions<
      RawServer,
      RawRequest,
      RawReply,
      RouteGeneric,
      ContextConfig,
      SchemaCompiler,
      TypeProvider,
      Logger
    >,
    handler: RouteHandlerMethod<
      RawServer,
      RawRequest,
      RawReply,
      RouteGeneric,
      ContextConfig,
      SchemaCompiler,
      TypeProvider,
      Logger
    >
  ) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>;
  delete: <
    RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
    ContextConfig = ContextConfigDefault,
    const SchemaCompiler extends FastifySchema = FastifySchema,
  >(
    path: string,
    opts: RouteShorthandOptions<
      RawServer,
      RawRequest,
      RawReply,
      RouteGeneric,
      ContextConfig,
      SchemaCompiler,
      TypeProvider,
      Logger
    >,
    handler: RouteHandlerMethod<
      RawServer,
      RawRequest,
      RawReply,
      RouteGeneric,
      ContextConfig,
      SchemaCompiler,
      TypeProvider,
      Logger
    >
  ) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>;
  put: <
    RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
    ContextConfig = ContextConfigDefault,
    const SchemaCompiler extends FastifySchema = FastifySchema,
  >(
    path: string,
    opts: RouteShorthandOptions<
      RawServer,
      RawRequest,
      RawReply,
      RouteGeneric,
      ContextConfig,
      SchemaCompiler,
      TypeProvider,
      Logger
    >,
    handler: RouteHandlerMethod<
      RawServer,
      RawRequest,
      RawReply,
      RouteGeneric,
      ContextConfig,
      SchemaCompiler,
      TypeProvider,
      Logger
    >
  ) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>;
  patch: <
    RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
    ContextConfig = ContextConfigDefault,
    const SchemaCompiler extends FastifySchema = FastifySchema,
  >(
    path: string,
    opts: RouteShorthandOptions<
      RawServer,
      RawRequest,
      RawReply,
      RouteGeneric,
      ContextConfig,
      SchemaCompiler,
      TypeProvider,
      Logger
    >,
    handler: RouteHandlerMethod<
      RawServer,
      RawRequest,
      RawReply,
      RouteGeneric,
      ContextConfig,
      SchemaCompiler,
      TypeProvider,
      Logger
    >
  ) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>;
  route(
    prefix: string,
    callback: (router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) => void,
    requiresAuth?: boolean
  ): void;
}

export function createRouter<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = TypeBoxTypeProvider,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(
  app: FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>,
  requiresAuth: boolean = false
): Router<RawServer, RawRequest, RawReply, TypeProvider, Logger> {
  const maybeAuthMiddleware = <
    RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
    ContextConfig = ContextConfigDefault,
    const SchemaCompiler extends FastifySchema = FastifySchema,
  >(
    opts: RouteShorthandOptions<
      RawServer,
      RawRequest,
      RawReply,
      RouteGeneric,
      ContextConfig,
      SchemaCompiler,
      TypeProvider,
      Logger
    >
  ): RouteShorthandOptions<
    RawServer,
    RawRequest,
    RawReply,
    RouteGeneric,
    ContextConfig,
    SchemaCompiler,
    TypeProvider,
    Logger
  > => {
    if (!requiresAuth) return opts;
    return {
      ...opts,
      preHandler: async (request, reply) => {
        const session = await app.auth.api.getSession({
          headers: fromNodeHeaders(request.headers),
        });

        if (!session || !session.user) {
          return reply.status(401 as any).send({ message: "Unauthorized" } as any);
        }

        request.user = session.user;
        request.session = session.session;
      },
    };
  };

  return {
    get: (path, opts, handler) => {
      return app.get(path, maybeAuthMiddleware(opts), handler);
    },
    post: (path, opts, handler) => {
      return app.post(path, maybeAuthMiddleware(opts), handler);
    },
    put: (path, opts, handler) => {
      return app.put(path, maybeAuthMiddleware(opts), handler);
    },
    patch: (path, opts, handler) => {
      return app.patch(path, maybeAuthMiddleware(opts), handler);
    },
    delete: (path, opts, handler) => {
      return app.delete(path, maybeAuthMiddleware(opts), handler);
    },
    route(
      prefix: string,
      callback: (router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) => void,
      requiresAuth: boolean = true
    ): void {
      app.register(
        fastify => {
          const subRouter = createRouter(fastify, requiresAuth);
          callback(subRouter as any);
          return fastify;
        },
        {
          prefix,
        }
      );
    },
  };
}
