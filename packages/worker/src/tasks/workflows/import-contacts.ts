import { proxyActivities } from "@temporalio/workflow";
import * as contactImports from "../activities/import-contacts.js";
import type { ContactImportArguments } from "@mailtura/rpcmodel/lib/tasks/index.js";

const { importContactsBatch } = proxyActivities<typeof contactImports>({
  startToCloseTimeout: "5min",
});

export async function importContacts(tenantId: string, contactImportId: string): Promise<void> {
  console.log(`Starting import of contacts for tenant ${tenantId} with import id ${contactImportId}`);
  const config: ContactImportArguments = {
    import_id: contactImportId,
    tenant_id: tenantId,
    batch_size: 100,
  };

  while (true) {
    const processedRecords = await importContactsBatch(config);
    if (processedRecords < 100) {
      console.log(`Import of contacts for tenant ${tenantId} with import id ${contactImportId} completed`);
      break;
    }
  }
}
