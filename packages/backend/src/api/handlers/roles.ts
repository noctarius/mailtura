import { Type } from "typebox";
import { Role } from "@mailtura/rpcmodel/lib/models";
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
import { mapRole } from "../mapper.js";
import { createError } from "../helpers.js";
import { CreateRole, UpdateRole } from "@mailtura/rpcmodel/lib/models/request-response.js";

export function rolesRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.get<{ Params: { tenant_id: string }; Reply: Role[] }>(
    "/",
    {
      schema: {
        tags: ["roles"],
        response: {
          200: Type.Array(Type.Ref("Role")),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async request => {
      const tenantId = request.params.tenant_id;

      const roles = await prisma.roles.findMany({
        where: {
          tenant_id: tenantId,
        },
      });

      return roles.map(mapRole);
    }
  );

  router.post<{ Params: { tenant_id: string }; Body: CreateRole; Reply: Role }>(
    "/",
    {
      schema: {
        tags: ["roles"],
        body: CreateRole,
        response: {
          201: Type.Ref("Role"),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const tenantId = request.params.tenant_id;

      const newRole = await prisma.roles.create({
        data: {
          tenant_id: tenantId,
          name: request.body.name,
          description: request.body.description,
          permissions: request.body.permissions,
          created_at: UTC.now().toDate(),
          created_by: "api",
        },
      });

      return reply.status(201).send(mapRole(newRole));
    }
  );

  router.route("/:role_id", subRouter => {
    subRouter.get<{ Params: { tenant_id: string; role_id: string }; Reply: Role }>(
      "/",
      {
        schema: {
          tags: ["roles"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            role_id: Type.String({ format: "uuid" }),
          }),
          response: {
            200: Type.Ref("Role"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const roleId = request.params.role_id;

        const role = await prisma.roles.findUnique({
          where: {
            id: roleId,
            tenant_id: tenantId,
          },
        });

        if (!role) {
          throw createError(404, "Role not found");
        }

        return mapRole(role);
      }
    );

    subRouter.put<{ Params: { tenant_id: string; role_id: string }; Body: UpdateRole; Reply: Role }>(
      "/",
      {
        schema: {
          tags: ["roles"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            role_id: Type.String({ format: "uuid" }),
          }),
          body: UpdateRole,
          response: {
            200: Type.Ref("Role"),
            400: Type.Ref("ErrorResponse"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const roleId = request.params.role_id;

        if (Object.keys(request.body).length === 0) {
          throw createError(400, "No data provided");
        }

        const oldRole = await prisma.roles.findUnique({
          where: {
            id: roleId,
            tenant_id: tenantId,
          },
        });
        if (!oldRole) {
          throw createError(404, "Role not found");
        }

        const newRole = await prisma.roles.update({
          where: { id: roleId, tenant_id: tenantId },
          data: {
            name: request.body.name,
            description: request.body.description,
            permissions: request.body.permissions,
            updated_at: UTC.now().toDate(),
            updated_by: "api",
          },
        });

        return mapRole(newRole);
      }
    );

    subRouter.delete<{ Params: { tenant_id: string; role_id: string } }>(
      "/",
      {
        schema: {
          tags: ["roles"],
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            role_id: Type.String({ format: "uuid" }),
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
        const roleId = request.params.role_id;

        const found = prisma.roles.findUnique({
          where: {
            id: roleId,
            tenant_id: tenantId,
          },
        });

        if (!found) {
          throw createError(404, "Role not found");
        }

        await prisma.roles.delete({
          where: {
            id: roleId,
            tenant_id: tenantId,
          },
        });

        return reply.status(204).send();
      }
    );
  });
}
