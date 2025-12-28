import { Client, Connection } from "@temporalio/client";

const temporalAddress = process.env.TEMPORAL_ADDRESS;
const temporalTaskQueue = process.env.TEMPORAL_TASK_QUEUE;

const createClient = async (connection: Connection) => {
  return new Client({ connection });
};

export interface TaskManager {
  shutdown: () => Promise<void>;
  createImportContactsJob: (tenantId: string, contactImportId: string) => Promise<any>;
  getImportContactsJobStatus: (contactImportId: string) => Promise<any>;
  createSendMailJob: (tenantId: string, mailSendingId: string) => Promise<any>;
}

export const createTemporalTaskManager = async (): Promise<TaskManager> => {
  if (!temporalAddress) throw new Error("TEMPORAL_ADDRESS is not set");
  if (!temporalTaskQueue) throw new Error("TEMPORAL_TASK_QUEUE is not set");
  const connection = await Connection.connect({
    address: temporalAddress,
  });

  const client = await createClient(connection);

  return {
    shutdown: async () => {
      await connection.close();
      await client.connection.close();
    },
    createImportContactsJob: async (tenantId: string, contactImportId: string) => {
      return client.workflow.start("importContactsWorkflow", {
        taskQueue: temporalTaskQueue,
        workflowId: `import-contacts-${contactImportId}`,
        startDelay: 1,
        workflowTaskTimeout: "5min",
        args: [tenantId, contactImportId],
      });
    },
    getImportContactsJobStatus: async (contactImportId: string) => {
      const handle = client.workflow.getHandle(`import-contacts-${contactImportId}`);
      const description = await handle.describe();
      return description.status;
    },
    createSendMailJob: async (tenantId: string, mailSendingId: string) => {
      return client.workflow.start("sendMailWorkflow", {
        taskQueue: temporalTaskQueue,
        workflowId: `send-mail-${mailSendingId}`,
        startDelay: 1,
        workflowTaskTimeout: "1min",
        args: [tenantId, mailSendingId],
      });
    },
  };
};

export function createLazyTemporalTaskManager(): TaskManager {
  let inner: Promise<TaskManager> | undefined;
  const ensure = async () => {
    if (!inner) {
      inner = createTemporalTaskManager();
      console.log("Task manager (Temporal) starting lazily...");
    }
    return inner;
  };
  return {
    shutdown: async () => {
      const mgr = await ensure();
      await mgr.shutdown();
    },
    createImportContactsJob: async (tenantId: string, contactImportId: string) => {
      const mgr = await ensure();
      return mgr.createImportContactsJob(tenantId, contactImportId);
    },
    getImportContactsJobStatus: async (contactImportId: string) => {
      const mgr = await ensure();
      return mgr.getImportContactsJobStatus(contactImportId);
    },
    createSendMailJob: async (tenantId: string, mailSendingId: string) => {
      const mgr = await ensure();
      return mgr.createSendMailJob(tenantId, mailSendingId);
    },
  };
}
