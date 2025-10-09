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
    callback: (router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) => void
  ): void;
}

export function createRouter<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(
  app: FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>
): Router<RawServer, RawRequest, RawReply, TypeProvider, Logger> {
  return {
    get: (path, opts, handler) => {
      return app.get(path, opts, handler);
    },
    post: (path, opts, handler) => {
      return app.post(path, opts, handler);
    },
    put: (path, opts, handler) => {
      return app.put(path, opts, handler);
    },
    patch: (path, opts, handler) => {
      return app.patch(path, opts, handler);
    },
    delete: (path, opts, handler) => {
      return app.delete(path, opts, handler);
    },
    route(
      prefix: string,
      callback: (router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) => void
    ): void {
      app.register(fastify => {
        const subRouter = createRouter(fastify);
        callback(subRouter as any);
        return fastify;
      }, {
        prefix,
      });
    },
  };
}
