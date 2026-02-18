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
import { CreateSubscriberList, UpdateSubscriberList } from "@mailtura/rpcmodel/api/request-response.js";
import type { Subscriber, SubscriberList } from "@mailtura/rpcmodel/api/index.js";
import { mapSubscriber, mapSubscriberList, unpackOptionalNullable, withPagination } from "@mailtura/database";
import { createError } from "@mailtura/rpcmodel/api/errors.js";
import { PaginationMetadata, PaginationQueryParameters } from "@mailtura/rpcmodel/pagination/index.js";
import uuidv7 from "../../helpers/uuidv7.js";

export function subscriberListRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  const { prisma } = router.context();
  router.get<{
    Params: { tenant_id: string };
    Reply: { data: SubscriberList[]; metadata: PaginationMetadata };
    Querystring: PaginationQueryParameters;
  }>(
    "/",
    {
      schema: {
        tags: ["subscriber-lists"],
        querystring: PaginationQueryParameters,
        response: {
          200: Type.Object({
            data: Type.Array(Type.Ref("SubscriberList")),
            metadata: Type.Ref("PaginationMetadata"),
          }),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async request => {
      const tenantId = request.params.tenant_id;

      const page = await withPagination(
        prisma.subscriber_lists,
        {
          where: {
            tenant_id: tenantId,
          },
        },
        request.query
      );

      return {
        data: page.data.map(mapSubscriberList),
        metadata: page.metadata,
      };
    }
  );

  router.post<{ Params: { tenant_id: string }; Body: CreateSubscriberList; Reply: SubscriberList }>(
    "/",
    {
      schema: {
        tags: ["subscriber-lists"],
        body: CreateSubscriberList,
        response: {
          201: Type.Ref("SubscriberList"),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const tenantId = request.params.tenant_id;

      const newSubscriberList = await prisma.subscriber_lists.create({
        data: {
          id: uuidv7(),
          tenant_id: tenantId,
          name: request.body.name,
          description: request.body.description,
          created_at: UTC.now().toDate(),
          created_by: "api",
        },
      });

      return reply.status(201).send(mapSubscriberList(newSubscriberList));
    }
  );

  router.route("/:subscriber_list_id", subRouter => {
    subRouter.get<{ Params: { tenant_id: string; subscriber_list_id: string }; Reply: SubscriberList }>(
      "/",
      {
        schema: {
          tags: ["subscriber-lists"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            subscriber_list_id: Type.String({ format: "uuid" }),
          }),
          response: {
            200: Type.Ref("SubscriberList"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const subscriberListId = request.params.subscriber_list_id;

        const subscriberList = await prisma.subscriber_lists.findUnique({
          relationLoadStrategy: "join",
          where: {
            id: subscriberListId,
            tenant_id: tenantId,
            subscribers: {
              every: {
                tenant_id: tenantId,
                status: "Subscribed",
              },
            },
          },
        });

        if (!subscriberList) {
          throw createError(404, "SubscriberList not found");
        }

        return mapSubscriberList(subscriberList);
      }
    );

    subRouter.put<{
      Params: { tenant_id: string; subscriber_list_id: string };
      Body: UpdateSubscriberList;
      Reply: SubscriberList;
    }>(
      "/",
      {
        schema: {
          tags: ["subscriber-lists"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            subscriber_list_id: Type.String({ format: "uuid" }),
          }),
          body: UpdateSubscriberList,
          response: {
            200: Type.Ref("SubscriberList"),
            400: Type.Ref("ErrorResponse"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const subscriberListId = request.params.subscriber_list_id;

        if (Object.keys(request.body).length === 0) {
          throw createError(400, "No data provided");
        }

        const oldSubscriberList = await prisma.subscriber_lists.findUnique({
          where: {
            id: subscriberListId,
            tenant_id: tenantId,
          },
        });
        if (!oldSubscriberList) {
          throw createError(404, "SubscriberList not found");
        }

        const newSubscriberList = await prisma.subscriber_lists.update({
          where: { id: subscriberListId, tenant_id: tenantId },
          data: {
            name: request.body.name,
            description: unpackOptionalNullable(request.body.description, oldSubscriberList.description),
            updated_at: UTC.now().toDate(),
            updated_by: "api",
          },
        });

        return mapSubscriberList(newSubscriberList);
      }
    );

    subRouter.delete<{ Params: { tenant_id: string; subscriber_list_id: string } }>(
      "/",
      {
        schema: {
          tags: ["subscriber-lists"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            subscriber_list_id: Type.String({ format: "uuid" }),
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
        const subscriberListId = request.params.subscriber_list_id;

        const found = prisma.subscriber_lists.findUnique({
          where: {
            id: subscriberListId,
            tenant_id: tenantId,
          },
        });

        if (!found) {
          throw createError(404, "SubscriberList not found");
        }

        await prisma.$transaction(async tx => {
          await tx.subscribers.deleteMany({
            where: {
              subscriber_list_id: subscriberListId,
              tenant_id: tenantId,
            },
          });
          await tx.subscriber_lists.delete({
            where: {
              id: subscriberListId,
              tenant_id: tenantId,
            },
          });
        });

        return reply.status(204).send();
      }
    );

    subRouter.route("/subscribers", subscribersRoutes);
  });
}

function subscribersRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  const { prisma } = router.context();
  router.get<{
    Params: { tenant_id: string; subscriber_list_id: string };
    Reply: Subscriber[];
  }>(
    "/",
    {
      schema: {
        tags: ["subscriber-lists"],
        params: Type.Object({
          tenant_id: Type.String({ format: "uuid" }),
          subscriber_list_id: Type.String({ format: "uuid" }),
        }),
        response: {
          200: Type.Array(Type.Ref("Subscriber")),
          401: Type.Ref("ErrorResponse"),
          404: Type.Ref("ErrorResponse"),
        },
      },
    },
    async request => {
      const tenantId = request.params.tenant_id;
      const subscriberListId = request.params.subscriber_list_id;

      const subscribers = await prisma.subscribers.findMany({
        where: {
          tenant_id: tenantId,
          subscriber_list_id: subscriberListId,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      return subscribers.map(mapSubscriber);
    }
  );
}
