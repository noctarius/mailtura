import { Type } from "typebox";
import { User } from "@mailtura/rpcmodel/lib/models";
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
import { mapUser } from "../mapper.js";
import { createError } from "../helpers.js";
import { CreateUser, UpdateUser } from "@mailtura/rpcmodel/lib/models/request-response.js";

export function userRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.get<{ Params: { tenant_id: string }; Reply: User[] }>(
    "/",
    {
      schema: {
        response: {
          200: Type.Array(Type.Ref("User")),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async request => {
      const tenantId = request.params.tenant_id;

      const users = await prisma.users.findMany({
        where: {
          tenant_id: tenantId,
        },
      });

      return users.map(mapUser);
    }
  );

  router.post<{ Params: { tenant_id: string }; Body: CreateUser; Reply: User }>(
    "/",
    {
      schema: {
        body: CreateUser,
        response: {
          201: Type.Ref("User"),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const tenantId = request.params.tenant_id;

      const newUser = await prisma.users.create({
        data: {
          tenant_id: tenantId,
          email: request.body.email,
          first_name: request.body.firstName,
          last_name: request.body.lastName,
          role: request.body.role,
          is_active: true,
          permissions: request.body.permissions,
          created_at: UTC.now().toDate(),
          created_by: "api",
        },
      });

      return reply.status(201).send(mapUser(newUser));
    }
  );

  router.route("/:user_id", subRouter => {
    subRouter.get<{ Params: { tenant_id: string; user_id: string }; Reply: User }>(
      "/",
      {
        schema: {
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            user_id: Type.String({ format: "uuid" }),
          }),
          response: {
            200: Type.Ref("User"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const userId = request.params.user_id;

        const user = await prisma.users.findUnique({
          where: {
            id: userId,
            tenant_id: tenantId,
          },
        });

        if (!user) {
          throw createError(404, "User not found");
        }

        return mapUser(user);
      }
    );

    subRouter.put<{ Params: { tenant_id: string; user_id: string }; Body: UpdateUser; Reply: User }>(
      "/",
      {
        schema: {
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            user_id: Type.String({ format: "uuid" }),
          }),
          body: UpdateUser,
          response: {
            200: Type.Ref("User"),
            400: Type.Ref("ErrorResponse"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const userId = request.params.user_id;

        if (Object.keys(request.body).length === 0) {
          throw createError(400, "No data provided");
        }

        const oldUser = await prisma.contacts.findUnique({
          where: {
            id: userId,
            tenant_id: tenantId,
          },
        });
        if (!oldUser) {
          throw createError(404, "User not found");
        }

        const newUser = await prisma.users.update({
          where: { id: userId, tenant_id: tenantId },
          data: {
            email: request.body.email,
            first_name: request.body.firstName,
            last_name: request.body.lastName,
            role: request.body.role,
            is_active: request.body.isActive,
            permissions: request.body.permissions,
            updated_at: UTC.now().toDate(),
            updated_by: "api",
          },
        });

        return mapUser(newUser);
      }
    );
  });
}
