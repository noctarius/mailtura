import type { ContactImport, File, Template } from "@mailtura/rpcmodel/lib/api/index.js";
import type {
  CreateContactBatch,
  CreateContactBatchResponse,
  UpdateContactImport,
} from "@mailtura/rpcmodel/lib/api/request-response.js";
import { ApplicationFailure } from "@temporalio/client";

const handleError = async (response: Response, type: string) => {
  const contentType = response.headers.get("content-type");
  const body = await (contentType === "application/json" ? response.json() : response.text());
  throw ApplicationFailure.create({
    type,
    message: body as any,
  });
};

export interface RpcManager {
  readContactImport(tenantId: string, contactImportId: string): Promise<ContactImport>;
  updateContactImport(tenantId: string, contactImportId: string, update: UpdateContactImport): Promise<ContactImport>;
  readFile(tenantId: string, fileId: string): Promise<File>;
  readFileContent(tenantId: string, fileId: string): Promise<Buffer>;
  createContacts(tenantId: string, contacts: CreateContactBatch): Promise<CreateContactBatchResponse>;
  readTemplate(tenantId: string, templateId: string): Promise<Template>;
}

const createRpcManager = (): RpcManager => {
  const baseUrl = process.env.API_BASE_URL || "http://localhost:3000/api/v1";
  return {
    async readContactImport(tenantId: string, contactImportId: string): Promise<ContactImport> {
      const response = await fetch(`${baseUrl}/tenants/${tenantId}/contacts/imports/${contactImportId}/`);
      if (!response.ok) {
        throw ApplicationFailure.create({
          type: "read-error",
          message: `Could not read contact import: ${response.statusText}`,
        });
      }
      return (await response.json()) as ContactImport;
    },

    async updateContactImport(
      tenantId: string,
      contactImportId: string,
      update: UpdateContactImport
    ): Promise<ContactImport> {
      const response = await fetch(`${baseUrl}/tenants/${tenantId}/contacts/imports/${contactImportId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      });
      if (!response.ok) {
        throw ApplicationFailure.create({
          type: "read-error",
          message: `Could not read contact import: ${response.statusText}`,
        });
      }
      return (await response.json()) as ContactImport;
    },

    async readFile(tenantId: string, fileId: string): Promise<File> {
      const response = await fetch(`${baseUrl}/tenants/${tenantId}/files/${fileId}/`);
      if (!response.ok) {
        throw ApplicationFailure.create({
          type: "read-error",
          message: `Could not read file: ${response.statusText}`,
        });
      }
      return (await response.json()) as File;
    },

    async readFileContent(tenantId: string, fileId: string): Promise<Buffer> {
      const response = await fetch(`${baseUrl}/tenants/${tenantId}/files/${fileId}/content/`);
      if (!response.ok) {
        throw ApplicationFailure.create({
          type: "read-error",
          message: `Could not read file: ${response.statusText}`,
        });
      }
      return Buffer.from(await response.bytes());
    },

    async createContacts(tenantId: string, contacts: CreateContactBatch): Promise<CreateContactBatchResponse> {
      const response = await fetch(`${baseUrl}/tenants/${tenantId}/contacts/bulk/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contacts),
      });

      if (!response.ok) {
        await handleError(response, "bulk-error");
      }
      return (await response.json()) as CreateContactBatchResponse;
    },

    async readTemplate(tenantId: string, templateId: string): Promise<Template> {
      const response = await fetch(`${baseUrl}/tenants/${tenantId}/templates/${templateId}/`);
      if (!response.ok) {
        throw ApplicationFailure.create({
          type: "read-error",
          message: `Could not read file: ${response.statusText}`,
        });
      }
      return (await response.json()) as Template;
    },
  };
};

const rpcManager = createRpcManager();

export function getRpcManager() {
  return rpcManager;
}
