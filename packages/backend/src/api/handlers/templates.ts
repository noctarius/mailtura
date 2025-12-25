import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils.js";
import type { FastifyTypeProvider, FastifyTypeProviderDefault } from "fastify/types/type-provider.js";
import { CreateTemplate, PreviewTemplate, UpdateTemplate } from "@mailtura/rpcmodel/api/request-response.js";
import type { FastifyBaseLogger } from "fastify/types/logger.js";
import type { Router } from "../../router/index.js";
import { Type } from "typebox";
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import type { Template } from "@mailtura/rpcmodel/api/index.js";
import { createTemplateCompiler, isTemplateError } from "@mailtura/contentcompiler";
import prisma, { mapTemplate, withPagination } from "@mailtura/database";
import { createError } from "@mailtura/rpcmodel/api/errors.js";
import { PaginationMetadata, PaginationQueryParameters } from "@mailtura/rpcmodel/pagination/index.js";

export function templateRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.get<{
    Params: { tenant_id: string };
    Reply: { data: Template[]; metadata: PaginationMetadata };
    Querystring: PaginationQueryParameters;
  }>(
    "/",
    {
      schema: {
        tags: ["templates"],
        querystring: PaginationQueryParameters,
        response: {
          200: Type.Object({
            data: Type.Array(Type.Ref("Template")),
            metadata: Type.Ref("PaginationMetadata"),
          }),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async request => {
      const tenantId = request.params.tenant_id;
      const page = await withPagination(
        prisma.templates,
        {
          where: {
            tenant_id: tenantId,
          },
        },
        request.query
      );

      return {
        data: page.data.map(mapTemplate),
        metadata: page.metadata,
      };
    }
  );

  router.post<{ Params: { tenant_id: string }; Body: CreateTemplate; Reply: Template }>(
    "/",
    {
      schema: {
        tags: ["templates"],
        body: CreateTemplate,
        response: {
          201: Type.Ref("Template"),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const tenantId = request.params.tenant_id;
      const newTemplate = await prisma.templates.create({
        data: {
          tenant_id: tenantId,
          name: request.body.name,
          description: request.body.description,
          content: request.body.content,
          // Only create properties when they are provided; the field is optional in the request model
          properties: request.body.properties
            ? {
                create: request.body.properties.map(property => {
                  return {
                    tenant_id: tenantId,
                    name: property.name,
                    type: property.type,
                    default_value: property.default_value,
                  };
                }),
              }
            : undefined,
          created_at: UTC.now().toDate(),
          created_by: "api",
        },
        include: {
          properties: true,
        },
      });

      return reply.status(201).send(mapTemplate(newTemplate));
    }
  );

  router.route("/:template_id", subRouter => {
    subRouter.get<{ Params: { tenant_id: string; template_id: string }; Reply: Template }>(
      "/",
      {
        schema: {
          tags: ["templates"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            template_id: Type.String({ format: "uuid" }),
          }),
          response: {
            200: Type.Ref("Template"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const templateId = request.params.template_id;

        const template = await prisma.templates.findUnique({
          where: {
            id: templateId,
            tenant_id: tenantId,
          },
          include: {
            properties: true,
          },
        });

        if (!template) {
          throw createError(404, "Template not found");
        }

        return mapTemplate(template);
      }
    );

    subRouter.put<{ Params: { tenant_id: string; template_id: string }; Body: UpdateTemplate; Reply: Template }>(
      "/",
      {
        schema: {
          tags: ["templates"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            template_id: Type.String({ format: "uuid" }),
          }),
          body: UpdateTemplate,
          response: {
            200: Type.Ref("Template"),
            400: Type.Ref("ErrorResponse"),
            401: Type.Ref("ErrorResponse"),
          },
        },
      },
      async (request, reply) => {
        const tenantId = request.params.tenant_id;
        const templateId = request.params.template_id;

        if (Object.keys(request.body).length === 0) {
          throw createError(400, "No data provided");
        }

        const oldTemplate = await prisma.templates.findUnique({
          where: {
            id: templateId,
            tenant_id: tenantId,
          },
          include: {
            properties: true,
          },
        });

        if (!oldTemplate) {
          throw createError(404, "Template not found");
        }

        const newTemplate = await prisma.templates.update({
          where: {
            id: templateId,
            tenant_id: tenantId,
          },
          data: {
            name: request.body.name ?? oldTemplate.name,
            content: request.body.content ?? oldTemplate.content,
            description: request.body.description ?? oldTemplate.description,
            updated_at: UTC.now().toDate(),
            updated_by: "api",
          },
          include: {
            properties: true,
          },
        });

        return mapTemplate(newTemplate);
      }
    );

    subRouter.delete<{ Params: { tenant_id: string; template_id: string } }>(
      "/",
      {
        schema: {
          tags: ["templates"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            template_id: Type.String({ format: "uuid" }),
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
        const templateId = request.params.template_id;

        const found = prisma.templates.findUnique({
          where: {
            id: templateId,
            tenant_id: tenantId,
          },
        });

        if (!found) {
          throw createError(404, "Template not found");
        }

        await prisma.templates.delete({
          where: {
            id: templateId,
            tenant_id: tenantId,
          },
        });

        return reply.status(204).send();
      }
    );

    subRouter.post<{
      Params: { tenant_id: string; template_id: string };
      Body: PreviewTemplate;
      Reply: { html: string; text: string };
    }>(
      "/preview/",
      {
        schema: {
          tags: ["templates"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            template_id: Type.String({ format: "uuid" }),
          }),
          body: PreviewTemplate,
          response: {
            200: Type.Object({ html: Type.String(), text: Type.String() }),
            401: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const templateCompiler = createTemplateCompiler(async () => undefined, "");
        const resolvedTemplate = await templateCompiler.resolveTemplate(
          { type: "direct", isTemplate: true, content: request.body.content },
          request.body.data
        );

        if (isTemplateError(resolvedTemplate)) {
          throw createError(400, "Failed to compile template", resolvedTemplate.errors);
        }

        const html = resolvedTemplate.html;
        const text = resolvedTemplate.text;
        const errors = resolvedTemplate.errors;

        if (errors) {
          console.error("Error rendering template:", errors);
          throw createError(500, "Error rendering template");
        }

        return { html, text };
      }
    );
  });
}
