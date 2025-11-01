import papaparse, {
  type ParseConfig,
  type ParseMeta,
  type Parser,
  type ParseResult,
  type ParseStepResult,
} from "papaparse";
import type { ContactImportArguments, ContactImportParameters } from "@mailtura/rpcmodel/lib/tasks/index.js";
import type { CreateContact } from "@mailtura/rpcmodel/lib/models/request-response.js";
import { getRpcManager } from "../../rpc/index.js";
import { log } from "@temporalio/activity";

const { parse } = papaparse;

const EMAIL_PATTERN =
  /^[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const rpcManager = getRpcManager();

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

export async function importContactsBatch(args: ContactImportArguments): Promise<number> {
  const contactImportId = args.import_id;
  const tenantId = args.tenant_id;
  const batchSize = args.batch_size;
  log.info(`Importing contacts batch for import ${contactImportId} on tenant ${tenantId} with batch size ${batchSize}`);

  const contactImport = await rpcManager.readContactImport(tenantId, contactImportId);
  if (!contactImport) {
    throw new Error(`Contact import not found: ${contactImportId}`);
  }

  const parameters = contactImport.parameters as unknown as ContactImportParameters;
  log.info(
    `Importing contacts batch for import ${contactImportId} on tenant ${tenantId} with params ${JSON.stringify(parameters)}`
  );

  const fileContent = await rpcManager.readFileContent(tenantId, parameters.file_id);
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

  const response = await rpcManager.createContacts(tenantId, {
    contacts,
    upsert: true,
  });

  log.debug(JSON.stringify(response, null, 2));

  await rpcManager.updateContactImport(tenantId, contactImportId, {
    records: contactImport.records + contacts.length,
    finished: contacts.length < batchSize,
  });

  return contacts.length;
}
