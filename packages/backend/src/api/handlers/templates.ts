import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils.js";
import type { FastifyTypeProvider, FastifyTypeProviderDefault } from "fastify/types/type-provider.js";
import { CreateTemplate, PreviewTemplate, UpdateTemplate } from "@mailtura/rpcmodel/lib/models/request-response.js";
import type { FastifyBaseLogger } from "fastify/types/logger.js";
import type { Router } from "../../router/index.js";
import { Template } from "@mailtura/rpcmodel/lib/models";
import { Type } from "typebox";
import prisma from "../../database/index.js";
import { mapTemplate } from "../mapper.js";
import { UTC } from "@mailtura/rpcmodel/lib/time/Timezone.js";
import { createError } from "../helpers.js";
import mjml2html from "mjml";
import Mustache from "mustache";
import sanitizeHtml from "sanitize-html";

export function templateRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.get<{ Params: { tenant_id: string }; Reply: Template[] }>(
    "/",
    {
      schema: {
        response: {
          200: Type.Array(Type.Ref("Template")),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async request => {
      const tenantId = request.params.tenant_id;
      const templates = await prisma.templates.findMany({
        where: {
          tenant_id: tenantId,
        },
        include: {
          properties: true,
        },
      });

      return templates.map(mapTemplate);
    }
  );

  router.post<{ Params: { tenant_id: string }; Body: CreateTemplate; Reply: Template }>(
    "/",
    {
      schema: {
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
          properties: {
            create: request.body.properties.map(property => {
              return {
                tenant_id: tenantId,
                name: property.name,
                type: property.type,
                default_value: property.default_value,
              };
            }),
          },
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

    subRouter.post<{ Params: { tenant_id: string; template_id: string }; Body: PreviewTemplate; Reply: string }>(
      "/preview",
      {
        schema: {
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            template_id: Type.String({ format: "uuid" }),
          }),
          body: PreviewTemplate,
          response: {
            200: Type.String(),
            401: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        try {
          const content = request.body.content;
          const template = Mustache.render(content, request.body.data);
          const renderResult = mjml2html(template, {});
          return renderResult.html;
          return sanitizeHtml(renderResult.html, {
            enforceHtmlBoundary: true,
            parser: {
              lowerCaseTags: true,
            },
            allowedTags: sanitizeHtml.defaults.allowedTags.concat([
              "img",
              "html",
              "head",
              "body",
              "style",
              "meta",
              "title",
              "link",
              "thead",
            ]),
            allowedAttributes: {
              "*": ["*"],
            },
          });
          return renderResult.html;
        } catch (error) {
          console.error("Error rendering template:", error);
          throw createError(500, "Error rendering template");
        }
      }
    );
  });
}
