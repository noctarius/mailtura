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
import { CreateCampaign, UpdateCampaign } from "@mailtura/rpcmodel/api/request-response.js";
import type { Campaign, CampaignStatus } from "@mailtura/rpcmodel/api/index.js";
import { fromDateTime, mapCampaign, unpackOptionalNullable, withPagination } from "@mailtura/database";
import { createError } from "@mailtura/rpcmodel/api/errors.js";
import { PaginationMetadata, PaginationQueryParameters } from "@mailtura/rpcmodel/pagination/index.js";
import uuidv7 from "../../helpers/uuidv7.js";

export function campaignRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  const { prisma } = router.context();
  router.get<{
    Params: { tenant_id: string };
    Reply: { data: Campaign[]; metadata: PaginationMetadata };
    Querystring: PaginationQueryParameters;
  }>(
    "/",
    {
      schema: {
        tags: ["campaigns"],
        querystring: PaginationQueryParameters,
        response: {
          200: Type.Object({
            data: Type.Array(Type.Ref("Campaign")),
            metadata: Type.Ref("PaginationMetadata"),
          }),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async request => {
      const tenantId = request.params.tenant_id;

      const page = await withPagination(
        prisma.campaigns,
        {
          where: {
            tenant_id: tenantId,
          },
        },
        request.query
      );

      return {
        data: page.data.map(mapCampaign),
        metadata: page.metadata,
      };
    }
  );

  router.post<{ Params: { tenant_id: string }; Body: CreateCampaign; Reply: Campaign }>(
    "/",
    {
      schema: {
        tags: ["campaigns"],
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
          id: uuidv7(),
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
          tags: ["campaigns"],
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
          tags: ["campaigns"],
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
          tags: ["campaigns"],
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

        const found = await prisma.campaigns.findUnique({
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
