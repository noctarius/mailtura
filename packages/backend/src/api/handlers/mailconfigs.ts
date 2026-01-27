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
import { CreateMailConfig, UpdateMailConfig } from "@mailtura/rpcmodel/api/request-response.js";
import type { MailConfig } from "@mailtura/rpcmodel/mails/index.js";
import { mapMailConfig, withPagination } from "@mailtura/database";
import { createError } from "@mailtura/rpcmodel/api/errors.js";
import { PaginationMetadata, PaginationQueryParameters } from "@mailtura/rpcmodel/pagination/index.js";

export function mailConfigRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  const { prisma } = router.context();

  router.get<{
    Params: { tenant_id: string };
    Reply: { data: MailConfig[]; metadata: PaginationMetadata };
    Querystring: PaginationQueryParameters;
  }>(
    "/",
    {
      schema: {
        tags: ["mail-configs"],
        querystring: PaginationQueryParameters,
        response: {
          200: Type.Object({
            data: Type.Array(Type.Ref("MailConfig")),
            metadata: Type.Ref("PaginationMetadata"),
          }),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async request => {
      const tenantId = request.params.tenant_id;

      const page = await withPagination(
        prisma.mail_configs,
        {
          where: {
            tenant_id: tenantId,
          },
        },
        request.query
      );

      return {
        data: page.data.map(mapMailConfig),
        metadata: page.metadata,
      };
    }
  );

  router.post<{ Params: { tenant_id: string }; Body: CreateMailConfig; Reply: MailConfig }>(
    "/",
    {
      schema: {
        tags: ["mail-configs"],
        body: CreateMailConfig,
        response: {
          201: Type.Ref("MailConfig"),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const tenantId = request.params.tenant_id;

      const newMailConfig = await prisma.mail_configs.create({
        data: {
          tenant_id: tenantId,
          name: request.body.name,
          type: request.body.type,
          config: (request.body as any).config,
          created_at: UTC.now().toDate(),
          created_by: "api",
        },
      });

      return reply.status(201).send(mapMailConfig(newMailConfig));
    }
  );

  router.route("/:mail_config_id", subRouter => {
    subRouter.get<{ Params: { tenant_id: string; mail_config_id: string }; Reply: MailConfig }>(
      "/",
      {
        schema: {
          tags: ["mail-configs"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            mail_config_id: Type.String({ format: "uuid" }),
          }),
          response: {
            200: Type.Ref("MailConfig"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const mailConfigId = request.params.mail_config_id;

        const mailConfig = await prisma.mail_configs.findUnique({
          where: {
            id: mailConfigId,
            tenant_id: tenantId,
          },
        });

        if (!mailConfig) {
          throw createError(404, "Mail configuration not found");
        }

        return mapMailConfig(mailConfig);
      }
    );

    subRouter.put<{ Params: { tenant_id: string; mail_config_id: string }; Body: UpdateMailConfig; Reply: MailConfig }>(
      "/",
      {
        schema: {
          tags: ["mail-configs"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            mail_config_id: Type.String({ format: "uuid" }),
          }),
          body: UpdateMailConfig,
          response: {
            200: Type.Ref("MailConfig"),
            400: Type.Ref("ErrorResponse"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const mailConfigId = request.params.mail_config_id;

        const updatedMailConfig = await prisma.mail_configs.update({
          where: {
            id: mailConfigId,
            tenant_id: tenantId,
          },
          data: {
            name: request.body.name,
            type: (request.body as any).type,
            config: (request.body as any).config,
            updated_at: UTC.now().toDate(),
            updated_by: "api",
          },
        });

        return mapMailConfig(updatedMailConfig);
      }
    );

    subRouter.delete<{ Params: { tenant_id: string; mail_config_id: string } }>(
      "/",
      {
        schema: {
          tags: ["mail-configs"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            mail_config_id: Type.String({ format: "uuid" }),
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
        const mailConfigId = request.params.mail_config_id;

        await prisma.mail_configs.delete({
          where: {
            id: mailConfigId,
            tenant_id: tenantId,
          },
        });

        return reply.status(204).send();
      }
    );
  });
}
