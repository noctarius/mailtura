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
import { UTC } from "@mailtura/rpcmodel/lib/time/Timezone.js";
import { mapUnsubscribe } from "../mapper.js";
import { CreateUnsubscribe, UpdateUnsubscribe } from "@mailtura/rpcmodel/lib/api/request-response.js";
import type { Unsubscribe } from "@mailtura/rpcmodel/lib/api/index.js";
import prisma from "@mailtura/database";
import { createError } from "@mailtura/rpcmodel/lib/api/errors.js";

export function unsubscribeRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.get<{ Params: { tenant_id: string }; Reply: Unsubscribe[] }>(
    "/",
    {
      schema: {
        tags: ["suppressions"],
        response: {
          200: Type.Array(Type.Ref("Unsubscribe")),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async request => {
      const tenantId = request.params.tenant_id;

      const unsubscribes = await prisma.unsubscribes.findMany({
        where: {
          tenant_id: tenantId,
        },
      });

      return unsubscribes.map(mapUnsubscribe);
    }
  );

  router.post<{ Params: { tenant_id: string }; Body: CreateUnsubscribe; Reply: Unsubscribe }>(
    "/",
    {
      schema: {
        tags: ["suppressions"],
        body: CreateUnsubscribe,
        response: {
          201: Type.Ref("Unsubscribe"),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const tenantId = request.params.tenant_id;

      const newUnsubscribe = await prisma.unsubscribes.create({
        data: {
          tenant_id: tenantId,
          contact_id: request.body.contactId,
          source: request.body.source,
          global: request.body.global,
          list_ids: request.body.listIds,
          unsubscribed_at: UTC.now().toDate(),
          created_at: UTC.now().toDate(),
          created_by: "api",
        },
      });

      return reply.status(201).send(mapUnsubscribe(newUnsubscribe));
    }
  );

  router.route("/:unsubscribe_id", subRouter => {
    subRouter.get<{ Params: { tenant_id: string; unsubscribe_id: string }; Reply: Unsubscribe }>(
      "/",
      {
        schema: {
          tags: ["suppressions"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            unsubscribe_id: Type.String({ format: "uuid" }),
          }),
          response: {
            200: Type.Ref("Unsubscribe"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const unsubscribeId = request.params.unsubscribe_id;

        const unsubscribe = await prisma.unsubscribes.findUnique({
          where: {
            id: unsubscribeId,
            tenant_id: tenantId,
          },
        });

        if (!unsubscribe) {
          throw createError(404, "Unsubscribe not found");
        }

        return mapUnsubscribe(unsubscribe);
      }
    );

    subRouter.put<{
      Params: { tenant_id: string; unsubscribe_id: string };
      Body: UpdateUnsubscribe;
      Reply: Unsubscribe;
    }>(
      "/",
      {
        schema: {
          tags: ["suppressions"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            unsubscribe_id: Type.String({ format: "uuid" }),
          }),
          body: UpdateUnsubscribe,
          response: {
            200: Type.Ref("Unsubscribe"),
            400: Type.Ref("ErrorResponse"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const unsubscribeId = request.params.unsubscribe_id;

        if (Object.keys(request.body).length === 0) {
          throw createError(400, "No data provided");
        }

        const oldUnsubscribe = await prisma.unsubscribes.findUnique({
          where: {
            id: unsubscribeId,
            tenant_id: tenantId,
          },
        });
        if (!oldUnsubscribe) {
          throw createError(404, "Unsubscribe not found");
        }

        const newUnsubscribe = await prisma.unsubscribes.update({
          where: { id: unsubscribeId, tenant_id: tenantId },
          data: {
            list_ids: request.body.listIds,
            updated_at: UTC.now().toDate(),
            updated_by: "api",
          },
        });

        return mapUnsubscribe(newUnsubscribe);
      }
    );

    subRouter.delete<{ Params: { tenant_id: string; unsubscribe_id: string } }>(
      "/",
      {
        schema: {
          tags: ["suppressions"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            unsubscribe_id: Type.String({ format: "uuid" }),
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
        const unsubscribeId = request.params.unsubscribe_id;

        const found = prisma.unsubscribes.findUnique({
          where: {
            id: unsubscribeId,
            tenant_id: tenantId,
          },
        });

        if (!found) {
          throw createError(404, "Unsubscribe not found");
        }

        await prisma.unsubscribes.delete({
          where: {
            id: unsubscribeId,
            tenant_id: tenantId,
          },
        });

        return reply.status(204).send();
      }
    );
  });
}
