import { Type } from "typebox";
import { type SubscriberList } from "@mailtura/rpcmodel/lib/models";
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
import { mapSubscriberList, unpackOptionalNullable } from "../mapper.js";
import { createError } from "../helpers.js";
import { CreateSubscriberList, UpdateSubscriberList } from "@mailtura/rpcmodel/lib/models/request-response.js";

export function subscriberListRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.get<{ Params: { tenant_id: string }; Reply: SubscriberList[] }>(
    "/",
    {
      schema: {
        response: {
          200: Type.Array(Type.Ref("SubscriberList")),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async request => {
      const tenantId = request.params.tenant_id;

      const subscriberLists = await prisma.subscriber_lists.findMany({
        where: {
          tenant_id: tenantId,
        },
      });

      return subscriberLists.map(mapSubscriberList);
    }
  );

  router.post<{ Params: { tenant_id: string }; Body: CreateSubscriberList; Reply: SubscriberList }>(
    "/",
    {
      schema: {
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
          where: {
            id: subscriberListId,
            tenant_id: tenantId,
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
  });
}
