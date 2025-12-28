import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils.js";
import type { FastifyTypeProvider, FastifyTypeProviderDefault } from "fastify/types/type-provider.js";
import type { FastifyBaseLogger } from "fastify/types/logger.js";
import type { Router } from "../../router/index.js";
import { User } from "@mailtura/rpcmodel/api/index.js";
import { Type } from "typebox";
import { mapUser } from "@mailtura/database";
import { createError } from "@mailtura/rpcmodel/api/errors.js";

export function profileRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  const prisma = router.context().prisma;
  router.get<{ Reply: User }>(
    "/",
    {
      schema: {
        tags: ["profile"],
        response: {
          200: Type.Ref("User"),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const user = request.user;
      if (!user) {
        throw createError(401, "Unauthorized");
      }

      const userDetails = await prisma.users.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!userDetails) {
        throw createError(401, "Unauthorized");
      }

      return reply.status(200).send(mapUser(userDetails));
    }
  );
}
