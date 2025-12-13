import { Client, Connection } from "@temporalio/client";

const temporalAddress = process.env.TEMPORAL_ADDRESS;
const temporalTaskQueue = process.env.TEMPORAL_TASK_QUEUE;

if (!temporalAddress) throw new Error("TEMPORAL_ADDRESS is not set");
if (!temporalTaskQueue) throw new Error("TEMPORAL_TASK_QUEUE is not set");

const createClient = async (connection: Connection) => {
  return new Client({ connection });
};

const createTaskManager = async () => {
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

const taskManager = await createTaskManager();
console.log("Task manager started");

export function getTaskManager() {
  return taskManager;
}
