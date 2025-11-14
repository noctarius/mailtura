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
import type { Session } from "better-auth";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { User } from "@mailtura/rpcmodel/lib/api/index.js";
import type { Permission } from "@mailtura/rpcmodel/lib/auth/index.js";
import { hasAllPermissions } from "../auth/index.js";
import { validateApiKey } from "../auth/apiKey.js";
import type { ApiKeyEntity } from "../database/index.js";

declare module "fastify" {
  interface FastifyRequest {
    apiKey?: ApiKeyEntity;
    user?: User;
    session?: Session;
  }
}

type PermissionRouteShorthandOptions<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  ContextConfig = ContextConfigDefault,
  SchemaCompiler extends FastifySchema = FastifySchema,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
> = RouteShorthandOptions<
  RawServer,
  RawRequest,
  RawReply,
  RouteGeneric,
  ContextConfig,
  SchemaCompiler,
  TypeProvider,
  Logger
> & {
  permissions?: Permission[];
};

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
    opts: PermissionRouteShorthandOptions<
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
    >,
    requiresAuth?: boolean
  ) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>;
  post: <
    RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
    ContextConfig = ContextConfigDefault,
    const SchemaCompiler extends FastifySchema = FastifySchema,
  >(
    path: string,
    opts: PermissionRouteShorthandOptions<
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
    >,
    requiresAuth?: boolean
  ) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>;
  delete: <
    RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
    ContextConfig = ContextConfigDefault,
    const SchemaCompiler extends FastifySchema = FastifySchema,
  >(
    path: string,
    opts: PermissionRouteShorthandOptions<
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
    >,
    requiresAuth?: boolean
  ) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>;
  put: <
    RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
    ContextConfig = ContextConfigDefault,
    const SchemaCompiler extends FastifySchema = FastifySchema,
  >(
    path: string,
    opts: PermissionRouteShorthandOptions<
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
    >,
    requiresAuth?: boolean
  ) => FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>;
  patch: <
    RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
    ContextConfig = ContextConfigDefault,
    const SchemaCompiler extends FastifySchema = FastifySchema,
  >(
    path: string,
    opts: PermissionRouteShorthandOptions<
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
    >,
    requiresAuth?: boolean
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
    opts: PermissionRouteShorthandOptions<
      RawServer,
      RawRequest,
      RawReply,
      RouteGeneric,
      ContextConfig,
      SchemaCompiler,
      TypeProvider,
      Logger
    >,
    pathLevelRequiresAuth: boolean
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
    if (!requiresAuth || !pathLevelRequiresAuth) return opts;
    return {
      ...opts,
      preHandler: async (request, reply) => {
        const headerApiKey = request.headers["x-api-key"];
        if (typeof headerApiKey === "string") {
          const apiKey = await validateApiKey(headerApiKey);
          if (!apiKey) {
            return reply.status(401 as any).send({ message: "Unauthorized" } as any);
          }

          request.apiKey = apiKey;

          if (opts.permissions && opts.permissions.length > 0) {
            if (!hasAllPermissions(opts.permissions, apiKey)) {
              return reply.status(401 as any).send({ message: "Unauthorized" } as any);
            }
          }
        } else {
          const session = await app.auth.api.getSession({
            headers: fromNodeHeaders(request.headers),
          });

          if (!session || !session.user) {
            return reply.status(401 as any).send({ message: "Unauthorized" } as any);
          }

          request.user = session.user as unknown as User;
          request.session = session.session;

          if (opts.permissions && opts.permissions.length > 0) {
            if (!hasAllPermissions(opts.permissions, request.user)) {
              return reply.status(401 as any).send({ message: "Unauthorized" } as any);
            }
          }
        }
      },
    };
  };

  return {
    get: (path, opts, handler, pathLevelRequiresAuth = requiresAuth) => {
      return app.get(path, maybeAuthMiddleware(opts, pathLevelRequiresAuth), handler);
    },
    post: (path, opts, handler, pathLevelRequiresAuth = requiresAuth) => {
      return app.post(path, maybeAuthMiddleware(opts, pathLevelRequiresAuth), handler);
    },
    put: (path, opts, handler, pathLevelRequiresAuth = requiresAuth) => {
      return app.put(path, maybeAuthMiddleware(opts, pathLevelRequiresAuth), handler);
    },
    patch: (path, opts, handler, pathLevelRequiresAuth = requiresAuth) => {
      return app.patch(path, maybeAuthMiddleware(opts, pathLevelRequiresAuth), handler);
    },
    delete: (path, opts, handler, pathLevelRequiresAuth = requiresAuth) => {
      return app.delete(path, maybeAuthMiddleware(opts, pathLevelRequiresAuth), handler);
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
