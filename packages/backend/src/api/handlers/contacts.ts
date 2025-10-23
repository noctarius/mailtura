import { Type } from "typebox";
import { Contact } from "@mailtura/rpcmodel/lib/models";
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
import { mapContact } from "../mapper.js";
import { createError } from "../helpers.js";
import { CreateContact, UpdateContact } from "@mailtura/rpcmodel/lib/models/request-response.js";

export function contactRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.get<{ Params: { tenant_id: string }; Reply: Contact[] }>(
    "/",
    {
      schema: {
        response: {
          200: Type.Array(Type.Ref("Contact")),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async request => {
      const tenantId = request.params.tenant_id;

      const contacts = await prisma.contacts.findMany({
        where: {
          tenant_id: tenantId,
        },
      });
      return contacts.map(mapContact);
    }
  );

  router.post<{ Params: { tenant_id: string }; Body: CreateContact; Reply: Contact }>(
    "/",
    {
      schema: {
        body: CreateContact,
        response: {
          201: Type.Ref("Contact"),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const tenantId = request.params.tenant_id;

      await prisma.$transaction(async tx => {
        const newContact = await tx.contacts.create({
          data: {
            tenant_id: tenantId,
            email: request.body.email,
            first_name: request.body.firstName,
            last_name: request.body.lastName,
            created_at: UTC.now().toDate(),
            created_by: "api",
          },
        });

        for (const listId of request.body.listIds) {
          await tx.subscribers.create({
            data: {
              tenant_id: tenantId,
              contact_id: newContact.id,
              status: "Subscribed",
              subscriber_list_id: listId,
              subscribed_at: UTC.now().toDate(),
              created_at: UTC.now().toDate(),
              created_by: "api",
            },
          });
        }

        return reply.status(201).send(mapContact(newContact));
      });
    }
  );

  router.route("/:contact_id", subRouter => {
    subRouter.get<{ Params: { tenant_id: string; contact_id: string }; Reply: Contact }>(
      "/",
      {
        schema: {
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            contact_id: Type.String({ format: "uuid" }),
          }),
          response: {
            200: Type.Ref("Contact"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const contactId = request.params.contact_id;

        const contact = await prisma.contacts.findUnique({
          where: {
            id: contactId,
            tenant_id: tenantId,
          },
        });

        if (!contact) {
          throw createError(404, "Contact not found");
        }

        return mapContact(contact);
      }
    );

    subRouter.put<{ Params: { tenant_id: string; contact_id: string }; Body: UpdateContact; Reply: Contact }>(
      "/",
      {
        schema: {
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            contact_id: Type.String({ format: "uuid" }),
          }),
          body: UpdateContact,
          response: {
            200: Type.Ref("Contact"),
            400: Type.Ref("ErrorResponse"),
            401: Type.Ref("ErrorResponse"),
            404: Type.Ref("ErrorResponse"),
          },
        },
      },
      async request => {
        const tenantId = request.params.tenant_id;
        const contactId = request.params.contact_id;

        if (Object.keys(request.body).length === 0) {
          throw createError(400, "No data provided");
        }

        const oldContact = await prisma.contacts.findUnique({
          where: {
            id: contactId,
            tenant_id: tenantId,
          },
        });
        if (!oldContact) {
          throw createError(404, "Contact not found");
        }

        const oldMappedContact = mapContact(oldContact);
        const newListIds = request.body.listIds;
        const oldListIds = oldMappedContact.listIds;

        const listsToAdd = newListIds?.filter(listId => !oldListIds.includes(listId)) || [];
        const listsToRemove = oldListIds.filter(listId => newListIds && !newListIds.includes(listId));

        return prisma.$transaction(async tx => {
          if (listsToAdd.length > 0) {
            for (const listId of listsToAdd) {
              await tx.subscribers.create({
                data: {
                  tenant_id: tenantId,
                  contact_id: contactId,
                  status: "Subscribed",
                  subscriber_list_id: listId,
                  subscribed_at: UTC.now().toDate(),
                  created_at: UTC.now().toDate(),
                  created_by: "api",
                },
              });
            }
          }

          if (listsToRemove.length > 0) {
            await tx.subscribers.deleteMany({
              where: {
                contact_id: contactId,
                tenant_id: tenantId,
                AND: listsToRemove.map(listId => {
                  return {
                    subscriber_list_id: listId,
                  };
                }),
              },
            });
          }

          const newContact = await tx.contacts.update({
            where: { id: contactId, tenant_id: tenantId },
            data: {
              first_name: request.body.firstName,
              last_name: request.body.lastName,
              updated_at: UTC.now().toDate(),
              updated_by: "api",
            },
          });

          return mapContact(newContact);
        });
      }
    );

    subRouter.delete<{ Params: { tenant_id: string; contact_id: string } }>(
      "/",
      {
        schema: {
          params: Type.Object({
            tenant_id: Type.String({ format: "uuid" }),
            contact_id: Type.String({ format: "uuid" }),
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
        const contactId = request.params.contact_id;

        const found = prisma.contacts.findUnique({
          where: {
            id: contactId,
            tenant_id: tenantId,
          },
        });

        if (!found) {
          throw createError(404, "Contact not found");
        }

        await prisma.$transaction(async tx => {
          await tx.subscribers.deleteMany({
            where: {
              contact_id: contactId,
              tenant_id: tenantId,
            },
          });

          await tx.contacts.delete({
            where: {
              id: contactId,
              tenant_id: tenantId,
            },
          });

          return reply.status(204).send();
        });
      }
    );
  });
}
