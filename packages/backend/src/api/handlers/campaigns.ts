import { Type } from "typebox";
import { type Campaign, CampaignStatus } from "@mailtura/rpcmodel/lib/models";
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
import { createError } from "../helpers.js";
import { CreateCampaign, UpdateCampaign } from "@mailtura/rpcmodel/lib/models/request-response.js";
import { fromDateTime, mapCampaign, unpackOptionalNullable } from "../mapper.js";

export function campaignRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.get<{ Params: { tenant_id: string }; Reply: Campaign[] }>(
    "/",
    {
      schema: {
        response: {
          200: Type.Array(Type.Ref("Campaign")),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async request => {
      const tenantId = request.params.tenant_id;

      const campaigns = await prisma.campaigns.findMany({
        where: {
          tenant_id: tenantId,
        },
      });

      return campaigns.map(mapCampaign);
    }
  );

  router.post<{ Params: { tenant_id: string }; Body: CreateCampaign; Reply: Campaign }>(
    "/",
    {
      schema: {
        body: CreateCampaign,
        response: {
          201: Type.Ref("Campaign"),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const tenantId = request.params.tenant_id;

      const newCampaign = await prisma.campaigns.create({
        data: {
          tenant_id: tenantId,
          name: request.body.name,
          type: request.body.type,
          status: "Draft" as CampaignStatus,
          sent: 0,
          delivered: 0,
          recipients: 0,
          scheduled_for: fromDateTime(request.body.scheduledFor),
          created_at: UTC.now().toDate(),
          created_by: "api",
        },
      });

      return reply.status(201).send(mapCampaign(newCampaign));
    }
  );

  router.route("/:campaign_id", subRouter => {
    subRouter.get<{ Params: { tenant_id: string; campaign_id: string }; Reply: Campaign }>(
      "/",
      {
        schema: {
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            campaign_id: Type.String({ format: "uuid" }),
          }),
          response: {
            200: Type.Ref("Campaign"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const campaignId = request.params.campaign_id;

        const campaign = await prisma.campaigns.findUnique({
          where: {
            id: campaignId,
            tenant_id: tenantId,
          },
        });

        if (!campaign) {
          throw createError(404, "Campaign not found");
        }

        return mapCampaign(campaign);
      }
    );

    subRouter.put<{ Params: { tenant_id: string; campaign_id: string }; Body: UpdateCampaign; Reply: Campaign }>(
      "/",
      {
        schema: {
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            campaign_id: Type.String({ format: "uuid" }),
          }),
          body: UpdateCampaign,
          response: {
            200: Type.Ref("Campaign"),
            400: Type.Ref("ErrorResponse"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const campaignId = request.params.campaign_id;

        if (Object.keys(request.body).length === 0) {
          throw createError(400, "No data provided");
        }

        const oldCampaign = await prisma.campaigns.findUnique({
          where: {
            id: campaignId,
            tenant_id: tenantId,
          },
        });
        if (!oldCampaign) {
          throw createError(404, "Campaign not found");
        }

        const newCampaign = await prisma.campaigns.update({
          where: { id: campaignId, tenant_id: tenantId },
          data: {
            name: request.body.name,
            scheduled_for: unpackOptionalNullable(fromDateTime(request.body.scheduledFor), oldCampaign.scheduled_for),
            updated_at: UTC.now().toDate(),
            updated_by: "api",
          },
        });

        return mapCampaign(newCampaign);
      }
    );

    subRouter.delete<{ Params: { tenant_id: string; campaign_id: string } }>(
      "/",
      {
        schema: {
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            campaign_id: Type.String({ format: "uuid" }),
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
        const campaignId = request.params.campaign_id;

        const found = prisma.campaigns.findUnique({
          where: {
            id: campaignId,
            tenant_id: tenantId,
          },
        });

        if (!found) {
          throw createError(404, "Campaign not found");
        }

        await prisma.campaigns.delete({
          where: {
            id: campaignId,
            tenant_id: tenantId,
          },
        });

        return reply.status(204).send();
      }
    );
  });
}
