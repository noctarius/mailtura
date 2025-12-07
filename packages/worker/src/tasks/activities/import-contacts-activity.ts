import papaparse, {
  type ParseConfig,
  type ParseMeta,
  type Parser,
  type ParseResult,
  type ParseStepResult,
} from "papaparse";
import type { ContactImportArguments, ContactImportParameters } from "@mailtura/rpcmodel/tasks/index.js";
import { CreateContact, CreateContactBatchResponse } from "@mailtura/rpcmodel/api/request-response.js";
import { log } from "@temporalio/activity";
import prisma, { ContactImportEntity, mapContact } from "@mailtura/database";
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";

const { parse } = papaparse;

const EMAIL_PATTERN =
  /^[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const parser = <T extends { email: string | undefined }>(
  data: string,
  start: number,
  batchSize: number,
  transformHeader?: (header: string, index: number) => string
): Promise<ParseResult<T>> => {
  return new Promise<ParseResult<T>>(resolve => {
    const results: ParseResult<T> = {
      data: [],
      errors: [],
      meta: undefined as unknown as ParseMeta,
    };
    let rows = 0;
    let iterations = 0;
    const config: ParseConfig<T> = {
      header: true,
      skipEmptyLines: true,
      transformHeader(header: string, index: number): string {
        if (transformHeader) {
          return transformHeader(header, index);
        }
        return header;
      },
      step(data: ParseStepResult<T>, parser: Parser) {
        // Update actual cound
        rows++;

        if (results.meta === undefined) results.meta = data.meta;
        if (iterations >= start) {
          if (!data.data.email || data.data.email.trim().length === 0 || !EMAIL_PATTERN.test(data.data.email)) {
            // Ensure we keep reading a full batch or produce the remaining items only
            iterations--;
            log.info("Skipped line with invalid email format: ", data.data);
            results.errors.push({
              type: "FieldMismatch",
              code: "TooFewFields",
              row: rows,
              index: data.meta.cursor,
              message: "Skipped line with invalid email format",
            });
          } else {
            results.data.push(data.data);
            results.errors.push(...data.errors);
          }
        }
        if (iterations >= batchSize + start) {
          console.log("Stopping parser after batch size reached");
          parser.abort();
        }
        iterations++;
      },
      complete() {
        log.debug(`Parser completed with ${results.data.length} parsed records`);
        resolve({ data: results.data, meta: results.meta, errors: results.errors });
      },
    };
    parse(data, config);
  });
};

const readContactImport = async (
  tenantId: string,
  contactImportId: string
): Promise<ContactImportEntity | undefined> => {
  const contactImport = await prisma.contact_imports.findFirst({
    where: {
      id: contactImportId.trim(),
      tenant_id: tenantId.trim(),
    },
  });
  console.log("Contact import", contactImport, tenantId, contactImportId);
  return contactImport ?? undefined;
};

const readFileContent = async (tenantId: string, fileId: string): Promise<Buffer | undefined> => {
  const file = await prisma.files.findUnique({
    where: {
      id: fileId,
      tenant_id: tenantId,
    },
  });
  return file ? Buffer.from(file.data) : undefined;
};

const createContacts = async (
  tenantId: string,
  contacts: CreateContact[],
  upsert: boolean = true
): Promise<CreateContactBatchResponse> => {
  return await prisma.$transaction(async tx => {
    const response: CreateContactBatchResponse = {
      items: contacts.length,
      added: [],
      updated: [],
      skipped: [],
    };

    for (const contact of contacts) {
      const oldContact = await tx.contacts.findUnique({
        where: {
          tenant_id_email: {
            email: contact.email,
            tenant_id: tenantId,
          },
        },
      });

      // If already existing and requested to not update, skip the contact
      if (oldContact && !upsert) {
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
};

const updateContactImport = async (tenantId: string, contactImportId: string, records: number, finished: boolean) => {
  return await prisma.contact_imports.update({
    where: {
      id: contactImportId,
      tenant_id: tenantId,
    },
    data: {
      records,
      finished,
    },
  });
};

export async function importContactsBatch(args: ContactImportArguments): Promise<number> {
  const contactImportId = args.import_id;
  const tenantId = args.tenant_id;
  const batchSize = args.batch_size;
  log.info(`Importing contacts batch for import ${contactImportId} on tenant ${tenantId} with batch size ${batchSize}`);

  const contactImport = await readContactImport(tenantId, contactImportId);
  if (!contactImport) {
    throw new Error(`Contact import not found: ${contactImportId}`);
  }

  const parameters = contactImport.parameters as unknown as ContactImportParameters;
  log.info(
    `Importing contacts batch for import ${contactImportId} on tenant ${tenantId} with params ${JSON.stringify(parameters)}`
  );

  const fileContent = await readFileContent(tenantId, parameters.file_id);
  if (!fileContent) {
    throw new Error(`File not found: ${parameters.file_id}`);
  }

  const data = fileContent.toString("utf-8");
  const rows = await parser<any>(data, contactImport.records, batchSize, header => {
    const mappedHeader = parameters.mapping.find(m => m[0] === header);
    return mappedHeader?.[1] || header;
  });
  log.debug(`Parsed ${rows.data.length} rows from file ${parameters.file_id}`);

  const contacts = rows.data.map((row: any): CreateContact => {
    return {
      email: row.email,
      firstName: row.first_name,
      lastName: row.last_name,
      listIds: parameters.list_ids,
    };
  });

  const result = await createContacts(tenantId, contacts);
  log.debug(JSON.stringify(result, null, 2));

  await updateContactImport(
    tenantId,
    contactImportId,
    contactImport.records + contacts.length,
    contacts.length < batchSize
  );

  return contacts.length;
}
