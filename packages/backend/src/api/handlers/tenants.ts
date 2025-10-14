import prisma from "../../database/index.js";
import { UTC } from "@mailtura/rpcmodel/lib/time/Timezone.js";
import { Type } from "typebox";
import { Tenant } from "@mailtura/rpcmodel/lib/models";
import { createError } from "../helpers.js";
import { contactRoutes } from "./contacts.js";
import type { Router } from "../../router/index.js";
import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils.js";
import type { FastifyTypeProvider, FastifyTypeProviderDefault } from "fastify/types/type-provider.js";
import type { FastifyBaseLogger } from "fastify/types/logger.js";
import { mapTenant } from "../mapper.js";
import { CreateTenant, UpdateTenant } from "@mailtura/rpcmodel/lib/models/request-response.js";
import { subscriberListRoutes } from "./subscriberlists.js";
import { campaignRoutes } from "./campaigns.js";
import { templateRoutes } from "./templates.js";
import { userRoutes } from "./users.js";

export function tenantRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.get<{ Reply: Tenant[] }>(
    "/",
    {
      schema: {
        response: {
          200: Type.Array(Type.Ref("Tenant")),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async () => {
      const tenants = await prisma.tenants.findMany();
      return tenants.map(mapTenant);
    }
  );

  router.post<{ Body: CreateTenant; Reply: Tenant }>(
    "/",
    {
      schema: {
        body: CreateTenant,
        response: {
          201: Type.Ref("Tenant"),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const newTenant = await prisma.tenants.create({
        data: {
          name: request.body.name,
          created_at: UTC.now().toDate(),
          created_by: "api",
        },
      });

      return reply.status(201).send(mapTenant(newTenant));
    }
  );

  router.route("/:tenant_id", subRouter => {
    subRouter.get<{ Params: { tenant_id: string }; Reply: Tenant }>(
      "/",
      {
        schema: {
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
          }),
          response: {
            200: Type.Ref("Tenant"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenant = await prisma.tenants.findUnique({
          where: { id: request.params.tenant_id },
        });

        if (!tenant) {
          throw createError(404, "Tenant not found");
        }

        return mapTenant(tenant);
      }
    );

    subRouter.put<{ Params: { tenant_id: string }; Body: UpdateTenant; Reply: Tenant }>(
      "/",
      {
        schema: {
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
          }),
          body: UpdateTenant,
          response: {
            200: Type.Ref("Tenant"),
            400: Type.Ref("ErrorResponse"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;

        if (Object.keys(request.body).length === 0) {
          throw createError(400, "No data provided");
        }

        const oldTenant = await prisma.tenants.findUnique({ where: { id: tenantId } });
        if (!oldTenant) {
          throw createError(404, "Tenant not found");
        }

        const newTenant = await prisma.tenants.update({
          where: { id: request.params.tenant_id },
          data: {
            name: request.body.name,
            updated_at: UTC.now().toDate(),
            updated_by: "api",
          },
        });

        return mapTenant(newTenant);
      }
    );

    subRouter.route("/contacts", contactRoutes);
    subRouter.route("/templates", templateRoutes);
    subRouter.route("/campaigns", campaignRoutes);
    subRouter.route("/lists", subscriberListRoutes);
    subRouter.route("/users", userRoutes);
  });
}
