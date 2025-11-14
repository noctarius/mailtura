import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils.js";
import type { FastifyTypeProvider, FastifyTypeProviderDefault } from "fastify/types/type-provider.js";
import type { FastifyBaseLogger } from "fastify/types/logger.js";
import type { Router } from "../../router/index.js";
import { Type } from "typebox";
import prisma from "../../database/index.js";
import { mapAccount } from "../mapper.js";
import type { Account } from "@mailtura/rpcmodel/lib/api/index.js";

export function accountRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.get<{ Params: { tenant_id: string; user_id: string }; Reply: Account[] }>(
    "/",
    {
      schema: {
        tags: ["accounts"],
        params: Type.Object({
          tenant_id: Type.String({ format: "uuid" }),
          user_id: Type.String({ format: "uuid" }),
        }),
        response: {
          200: Type.Array(Type.Ref("Account")),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const userId = request.params.user_id;

      const accounts = await prisma.accounts.findMany({
        where: {
          user_id: userId,
        },
      });

      return reply.send(accounts.map(mapAccount));
    }
  );
}
