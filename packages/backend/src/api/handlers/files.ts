import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils.js";
import type { FastifyTypeProvider, FastifyTypeProviderDefault } from "fastify/types/type-provider.js";
import type { FastifyBaseLogger } from "fastify/types/logger.js";
import type { Router } from "../../router/index.js";
import { File } from "@mailtura/rpcmodel/api/index.js";
import { Type } from "typebox";
import { mapFile } from "@mailtura/database";
import { createError } from "@mailtura/rpcmodel/api/errors.js";

export function fileRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  const prisma = router.context().prisma;
  router.get<{ Params: { tenant_id: string }; Reply: File[] }>(
    "/",
    {
      schema: {
        tags: ["files"],
        response: {
          200: Type.Array(Type.Ref("File")),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async request => {
      const tenantId = request.params.tenant_id;

      const files = await prisma.files.findMany({
        where: {
          tenant_id: tenantId,
        },
      });

      return files.map(mapFile);
    }
  );

  router.route("/:file_id", subRouter => {
    subRouter.get<{ Params: { tenant_id: string; file_id: string }; Reply: File }>(
      "/",
      {
        schema: {
          tags: ["files"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            file_id: Type.String({ format: "uuid" }),
          }),
          response: {
            200: Type.Ref("File"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const fileId = request.params.file_id;

        const file = await prisma.files.findUnique({
          where: {
            id: fileId,
            tenant_id: tenantId,
          },
        });

        if (!file) {
          throw createError(404, "File not found");
        }

        return mapFile(file);
      }
    );

    subRouter.get<{ Params: { tenant_id: string; file_id: string }; Reply: Uint8Array }>(
      "/content/",
      {
        schema: {
          tags: ["files"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            file_id: Type.String({ format: "uuid" }),
          }),
          produces: ["application/octet-stream"],
          response: {
            200: Type.Any(),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const fileId = request.params.file_id;

        const file = await prisma.files.findUnique({
          where: {
            id: fileId,
            tenant_id: tenantId,
          },
        });

        if (!file) {
          throw createError(404, "File not found");
        }

        return file.data;
      }
    );

    subRouter.delete<{ Params: { tenant_id: string; file_id: string } }>(
      "/",
      {
        schema: {
          tags: ["files"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            file_id: Type.String({ format: "uuid" }),
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
        const fileId = request.params.file_id;

        const found = await prisma.files.findUnique({
          where: {
            id: fileId,
            tenant_id: tenantId,
          },
        });

        if (!found) {
          throw createError(404, "File not found");
        }

        await prisma.files.delete({
          where: {
            id: fileId,
            tenant_id: tenantId,
          },
        });

        return reply.status(204).send();
      }
    );
  });
}
