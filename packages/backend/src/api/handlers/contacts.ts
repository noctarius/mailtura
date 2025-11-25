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
import { UTC } from "@mailtura/rpcmodel/lib/time/Timezone.js";
import { mapContact, mapContactImport } from "../mapper.js";
import {
  CreateContact,
  CreateContactBatch,
  CreateContactBatchResponse,
  ImportContacts,
  UpdateContact,
  UpdateContactImport,
} from "@mailtura/rpcmodel/lib/api/request-response.js";
import { getTaskManager } from "../../tasks/index.js";
import type { MultipartFile } from "@fastify/multipart";
import { parseMultipartFieldsToBody } from "../../helpers/extract-multipart-fields-to-body.js";
import type { ContactImportParameters } from "@mailtura/rpcmodel/lib/tasks/index.js";
import type { Contact, ContactImport } from "@mailtura/rpcmodel/lib/api/index.js";
import prisma from "@mailtura/database";
import { createError } from "@mailtura/rpcmodel/lib/api/errors.js";
import { Prisma } from "@mailtura/database/lib/generated/prisma/client.js";

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
        tags: ["contacts"],
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
        tags: ["contacts"],
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

  router.post<{ Params: { tenant_id: string }; Body: CreateContactBatch; Reply: CreateContactBatchResponse }>(
    "/bulk/",
    {
      schema: {
        tags: ["contacts"],
        body: CreateContactBatch,
        response: {
          201: CreateContactBatchResponse,
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const tenantId = request.params.tenant_id;

      const response = await prisma.$transaction(async tx => {
        const response: CreateContactBatchResponse = {
          items: request.body.contacts.length,
          added: [],
          updated: [],
          skipped: [],
        };

        for (const contact of request.body.contacts) {
          const oldContact = await tx.contacts.findUnique({
            where: {
              tenant_id_email: {
                email: contact.email,
                tenant_id: tenantId,
              },
            },
          });

          // If already existing and requested to not update, skip the contact
          if (oldContact && !request.body.upsert) {
            response.skipped.push(mapContact(oldContact));
            continue;
          }

          const newContact = await tx.contacts.upsert({
            where: {
              tenant_id_email: {
                email: contact.email,
                tenant_id: tenantId,
              },
            },
            create: {
              tenant_id: tenantId,
              email: contact.email,
              first_name: contact.firstName,
              last_name: contact.lastName,
              created_at: UTC.now().toDate(),
              created_by: "api",
            },
            update: {
              first_name: contact.firstName ?? oldContact?.first_name,
              last_name: contact.lastName ?? oldContact?.last_name,
              updated_at: UTC.now().toDate(),
              updated_by: "api",
            },
          });

          for (const listId of contact.listIds) {
            await tx.subscribers.upsert({
              where: {
                tenant_id_contact_id_subscriber_list_id: {
                  tenant_id: tenantId,
                  contact_id: newContact.id,
                  subscriber_list_id: listId,
                },
              },
              create: {
                tenant_id: tenantId,
                contact_id: newContact.id,
                status: "Subscribed",
                subscriber_list_id: listId,
                subscribed_at: UTC.now().toDate(),
                created_at: UTC.now().toDate(),
                created_by: "api",
              },
              update: {
                updated_at: UTC.now().toDate(),
                updated_by: "api",
              },
            });
          }

          if (oldContact) response.updated.push(mapContact(newContact));
          else response.added.push(mapContact(newContact));
        }
        return response;
      });
      return reply.status(201).send(response);
    }
  );

  router.route("/:contact_id", subRouter => {
    subRouter.get<{ Params: { tenant_id: string; contact_id: string }; Reply: Contact }>(
      "/",
      {
        schema: {
          tags: ["contacts"],
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
          tags: ["contacts"],
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
          tags: ["contacts"],
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

  router.route("/imports", contactImportRoutes);
}

export function contactImportRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.get<{ Params: { tenant_id: string }; Reply: ContactImport[]; Querystring: { all: boolean | unknown } }>(
    "/",
    {
      schema: {
        tags: ["contacts"],
        response: {
          200: Type.Array(Type.Ref("ContactImport")),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const tenantId = request.params.tenant_id;
      const all = request.query.all || false;

      const imports = await prisma.contact_imports.findMany({
        where: {
          tenant_id: tenantId,
          ...(all ? {} : { finished: true }),
        },
      });

      return reply.status(200).send(imports.map(mapContactImport));
    }
  );

  router.post<{
    Params: { tenant_id: string };
    Body: { file: MultipartFile; parameters: ImportContacts };
    Response: ContactImport;
  }>(
    "/",
    {
      validatorCompiler: () => () => true,
      schema: {
        tags: ["contacts"],
        consumes: ["multipart/form-data"],
        body: Type.Object({
          file: Type.String({ format: "binary" }),
          parameters: ImportContacts,
        }),
        response: {
          200: Type.Ref("ContactImport"),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const tenantId = request.params.tenant_id;

      // Extract the multipart properties into the request body
      parseMultipartFieldsToBody(request);

      console.log("Received body: ", request.body);
      const file = request.body.file;
      if (!file) {
        throw createError(400, "No file provided");
      }
      const data = await file.toBuffer();

      const mapping = Object.keys(request.body.parameters.mapping).map((key): [target: string, source: string] => {
        return [request.body.parameters.mapping[key]!, key];
      });

      return prisma.$transaction(async tx => {
        const newFile = await tx.files.create({
          data: {
            tenant_id: tenantId,
            name: file.filename,
            data: Uint8Array.from(data),
            created_at: UTC.now().toDate(),
            created_by: "api",
          },
        });

        const parameters: ContactImportParameters & { [key: string]: Prisma.InputJsonValue } = {
          file_id: newFile.id,
          list_ids: request.body.parameters.listIds,
          mapping,
        };

        const contactImport = await tx.contact_imports.create({
          data: {
            tenant_id: tenantId,
            status: 0,
            records: 0,
            finished: false,
            filename: newFile.name,
            parameters: parameters,
            created_at: UTC.now().toDate(),
            created_by: "api",
          },
        });

        const taskManager = getTaskManager();
        const handle = await taskManager.createImportContactsJob(tenantId, contactImport.id);
        console.log("Created import contacts job", handle);

        return reply.status(201).send(mapContactImport(contactImport));
      });
    }
  );

  router.get<{ Params: { tenant_id: string; import_id: string }; Response: ContactImport }>(
    "/:import_id/",
    {
      schema: {
        tags: ["contacts"],
        params: Type.Object({
          tenant_id: Type.String({ format: "uuid" }),
          import_id: Type.String({ format: "uuid" }),
        }),
        response: {
          200: Type.Ref("ContactImport"),
          401: Type.Ref("ErrorResponse"),
          404: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const tenantId = request.params.tenant_id;
      const importId = request.params.import_id;

      const contactImport = await prisma.contact_imports.findUnique({
        where: {
          id: importId,
          tenant_id: tenantId,
        },
      });

      if (!contactImport) {
        throw createError(404, "Contact import not found");
      }

      return reply.send(mapContactImport(contactImport));
    }
  );

  router.put<{
    Params: { tenant_id: string; import_id: string };
    Body: UpdateContactImport;
    Response: ContactImport;
  }>(
    "/:import_id/",
    {
      schema: {
        tags: ["contacts"],
        params: Type.Object({
          tenant_id: Type.String({ format: "uuid" }),
          import_id: Type.String({ format: "uuid" }),
        }),
        body: UpdateContactImport,
        response: {
          200: Type.Ref("ContactImport"),
          401: Type.Ref("ErrorResponse"),
          404: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const tenantId = request.params.tenant_id;
      const importId = request.params.import_id;

      const oldContactImport = await prisma.contact_imports.findUnique({
        where: {
          id: importId,
          tenant_id: tenantId,
        },
      });

      if (!oldContactImport) {
        throw createError(404, "Contact import not found");
      }

      const newContactImport = await prisma.contact_imports.update({
        where: {
          id: importId,
          tenant_id: tenantId,
        },
        data: {
          status: request.body.status,
          records: request.body.records,
          finished: request.body.finished,
        },
      });

      return reply.send(mapContactImport(newContactImport));
    }
  );
}
