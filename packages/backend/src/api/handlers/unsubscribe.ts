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
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { CreateUnsubscribe } from "@mailtura/rpcmodel/api/request-response.js";
import type { Unsubscribe } from "@mailtura/rpcmodel/api/index.js";
import { GLOBAL_UNSUBSCRIBE_LIST_ID, mapUnsubscribe, withPagination } from "@mailtura/database";
import { createError } from "@mailtura/rpcmodel/api/errors.js";
import { PaginationMetadata, PaginationQueryParameters } from "@mailtura/rpcmodel/pagination/index.js";
import { uuidv7 } from "@mailtura/rpcmodel/helpers/index.js";

export function unsubscribeRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  const { prisma } = router.context();
  router.get<{
    Params: { tenant_id: string };
    Reply: { data: Unsubscribe[]; metadata: PaginationMetadata };
    Querystring: PaginationQueryParameters;
  }>(
    "/",
    {
      schema: {
        tags: ["suppressions"],
        querystring: PaginationQueryParameters,
        response: {
          200: Type.Object({
            data: Type.Array(Type.Ref("Unsubscribe")),
            metadata: Type.Ref("PaginationMetadata"),
          }),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async request => {
      const tenantId = request.params.tenant_id;

      const page = await withPagination(
        prisma.unsubscribes,
        {
          where: {
            tenant_id: tenantId,
          },
        },
        request.query
      );

      return {
        data: page.data.map(mapUnsubscribe),
        metadata: page.metadata,
      };
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

      const isGlobal = request.body.global ?? false;
      const subscriberListId = isGlobal ? GLOBAL_UNSUBSCRIBE_LIST_ID : request.body.subscriberListId;

      const newUnsubscribe = await prisma.unsubscribes.create({
        data: {
          id: uuidv7(),
          tenant_id: tenantId,
          contact_id: request.body.contactId,
          source: request.body.source,
          subscriber_list_id: subscriberListId ?? GLOBAL_UNSUBSCRIBE_LIST_ID,
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

        const found = await prisma.unsubscribes.findUnique({
          where: {
            id: unsubscribeId,
            tenant_id: tenantId,
          },
        });

        if (!found) {
          throw createError(404, "Unsubscribe not found");
        }

        return await prisma.$transaction(async tx => {
          await tx.unsubscribes.delete({
            where: {
              id: unsubscribeId,
              tenant_id: tenantId,
            },
          });

          const contactId = found.contact_id;
          const subscriberListId = found.subscriber_list_id;
          await tx.subscribers.upsert({
            where: {
              tenant_id_contact_id_subscriber_list_id: {
                tenant_id: tenantId,
                contact_id: contactId,
                subscriber_list_id: subscriberListId,
              },
            },
            create: {
              id: uuidv7(),
              tenant_id: tenantId,
              contact_id: contactId,
              status: "Subscribed",
              subscriber_list_id: subscriberListId,
              subscribed_at: UTC.now().toDate(),
              created_at: UTC.now().toDate(),
              created_by: "api",
            },
            update: {
              status: "Subscribed",
              updated_at: UTC.now().toDate(),
              updated_by: "api",
            },
          });

          return reply.status(204).send();
        });
      }
    );
  });
}
