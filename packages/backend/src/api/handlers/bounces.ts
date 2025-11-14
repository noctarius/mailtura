import { Type } from "typebox";
import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils.js";
import type { FastifyTypeProvider, FastifyTypeProviderDefault } from "fastify/types/type-provider.js";
import type { FastifyBaseLogger } from "fastify/types/logger.js";
import type { Router } from "../../router/index.js";
import prisma from "../../database/index.js";
import { UTC } from "@mailtura/rpcmodel/lib/time/Timezone.js";
import { fromDateTime, mapBounce } from "../mapper.js";
import { createError } from "../helpers.js";
import { CreateBounce } from "@mailtura/rpcmodel/lib/api/request-response.js";
import type { Bounce } from "@mailtura/rpcmodel/lib/api/index.js";

export function bouncesRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.get<{ Params: { tenant_id: string }; Reply: Bounce[] }>(
    "/",
    {
      schema: {
        tags: ["suppressions"],
        response: {
          200: Type.Array(Type.Ref("Bounce")),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async request => {
      const tenantId = request.params.tenant_id;

      const bounces = await prisma.bounces.findMany({
        where: {
          tenant_id: tenantId,
        },
      });

      return bounces.map(mapBounce);
    }
  );

  router.post<{ Params: { tenant_id: string }; Body: CreateBounce; Reply: Bounce }>(
    "/",
    {
      schema: {
        tags: ["suppressions"],
        body: CreateBounce,
        response: {
          201: Type.Ref("Bounce"),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const tenantId = request.params.tenant_id;

      const newBounce = await prisma.bounces.create({
        data: {
          tenant_id: tenantId,
          contact_id: request.body.contactId,
          reason: request.body.reason,
          bounced_at: fromDateTime(request.body.bouncedAt),
          bounce_type: request.body.bounceType,
          created_at: UTC.now().toDate(),
          created_by: "api",
        },
      });

      return reply.status(201).send(mapBounce(newBounce));
    }
  );

  router.route("/:bounce_id", subRouter => {
    subRouter.get<{ Params: { tenant_id: string; bounce_id: string }; Reply: Bounce }>(
      "/",
      {
        schema: {
          tags: ["suppressions"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            bounce_id: Type.String({ format: "uuid" }),
          }),
          response: {
            200: Type.Ref("Bounce"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const bounceId = request.params.bounce_id;

        const bounce = await prisma.bounces.findUnique({
          where: {
            id: bounceId,
            tenant_id: tenantId,
          },
        });

        if (!bounce) {
          throw createError(404, "Bounce not found");
        }

        return mapBounce(bounce);
      }
    );

    subRouter.delete<{ Params: { tenant_id: string; bounce_id: string } }>(
      "/",
      {
        schema: {
          tags: ["suppressions"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            bounce_id: Type.String({ format: "uuid" }),
          }),
          response: {
            204: Type.Null(),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async (request, reply) => {
        const tenantId = request.params.tenant_id;
        const bounceId = request.params.bounce_id;

        const found = prisma.bounces.findUnique({
          where: {
            id: bounceId,
            tenant_id: tenantId,
          },
        });

        if (!found) {
          throw createError(404, "Bounce not found");
        }

        await prisma.bounces.delete({
          where: {
            id: bounceId,
            tenant_id: tenantId,
          },
        });

        return reply.status(204).send();
      }
    );
  });
}
