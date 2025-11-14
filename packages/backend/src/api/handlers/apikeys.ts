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
import { fromDateTime, mapApiKey, unpackOptionalNullable } from "../mapper.js";
import { createError } from "../helpers.js";
import { CreateApiKey, UpdateApiKey } from "@mailtura/rpcmodel/lib/api/request-response.js";
import { generateNewKey } from "../../auth/apiKey.js";
import type { ApiKey } from "@mailtura/rpcmodel/lib/api/index.js";

export function apiKeyRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.get<{ Params: { tenant_id: string }; Reply: ApiKey[] }>(
    "/",
    {
      schema: {
        tags: ["api-keys"],
        response: {
          200: Type.Array(Type.Ref("ApiKey")),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async request => {
      const tenantId = request.params.tenant_id;

      const apiKeys = await prisma.api_keys.findMany({
        where: {
          tenant_id: tenantId,
        },
      });

      return apiKeys.map(mapApiKey);
    }
  );

  router.post<{ Params: { tenant_id: string }; Body: CreateApiKey; Reply: ApiKey }>(
    "/",
    {
      schema: {
        tags: ["api-keys"],
        body: CreateApiKey,
        response: {
          201: Type.Ref("ApiKey"),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const tenantId = request.params.tenant_id;

      const now = UTC.now();
      const newApiKey = await prisma.api_keys.create({
        data: {
          tenant_id: tenantId,
          name: request.body.name,
          key: generateNewKey(now),
          active: true,
          expires_at: request.body.expiresAt,
          permissions: request.body.permissions,
          created_at: now.toDate(),
          created_by: "api",
        },
      });

      return reply.status(201).send(mapApiKey(newApiKey));
    }
  );

  router.route("/:api_key_id", subRouter => {
    subRouter.get<{ Params: { tenant_id: string; api_key_id: string }; Reply: ApiKey }>(
      "/",
      {
        schema: {
          tags: ["api-keys"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            api_key_id: Type.String({ format: "uuid" }),
          }),
          response: {
            200: Type.Ref("ApiKey"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const apiKeyId = request.params.api_key_id;

        const apiKey = await prisma.api_keys.findUnique({
          where: {
            id: apiKeyId,
            tenant_id: tenantId,
          },
        });

        if (!apiKey) {
          throw createError(404, "ApiKey not found");
        }

        return mapApiKey(apiKey);
      }
    );

    subRouter.put<{ Params: { tenant_id: string; api_key_id: string }; Body: UpdateApiKey; Reply: ApiKey }>(
      "/",
      {
        schema: {
          tags: ["api-keys"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            api_key_id: Type.String({ format: "uuid" }),
          }),
          body: UpdateApiKey,
          response: {
            200: Type.Ref("ApiKey"),
            400: Type.Ref("ErrorResponse"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const apiKeyId = request.params.api_key_id;

        if (Object.keys(request.body).length === 0) {
          throw createError(400, "No data provided");
        }

        const oldApiKey = await prisma.api_keys.findUnique({
          where: {
            id: apiKeyId,
            tenant_id: tenantId,
          },
        });
        if (!oldApiKey) {
          throw createError(404, "ApiKey not found");
        }

        const newApiKey = await prisma.api_keys.update({
          where: { id: apiKeyId, tenant_id: tenantId },
          data: {
            name: request.body.name,
            permissions: request.body.permissions,
            expires_at: unpackOptionalNullable(fromDateTime(request.body.expiresAt), oldApiKey.expires_at),
            updated_at: UTC.now().toDate(),
            updated_by: "api",
          },
        });

        return mapApiKey(newApiKey);
      }
    );

    subRouter.delete<{ Params: { tenant_id: string; api_key_id: string } }>(
      "/",
      {
        schema: {
          tags: ["api-keys"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            api_key_id: Type.String({ format: "uuid" }),
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
        const apiKeyId = request.params.api_key_id;

        const found = await prisma.api_keys.findUnique({
          where: {
            id: apiKeyId,
            tenant_id: tenantId,
          },
        });

        if (!found) {
          throw createError(404, "ApiKey not found");
        }

        await prisma.api_keys.delete({
          where: {
            id: apiKeyId,
            tenant_id: tenantId,
          },
        });

        return reply.status(204).send();
      }
    );
  });
}
