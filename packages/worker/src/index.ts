import { NativeConnection, Worker } from "@temporalio/worker";
import { importContactsBatch } from "./tasks/activities/import-contacts-activity.js";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { resolve } from "./helper/resolver.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const temporalAddress = process.env.TEMPORAL_ADDRESS;
const temporalNamespace = process.env.TEMPORAL_NAMESPACE;
const temporalTaskQueue = process.env.TEMPORAL_TASK_QUEUE;

if (!temporalAddress) throw new Error("TEMPORAL_ADDRESS is not set");
if (!temporalNamespace) throw new Error("TEMPORAL_NAMESPACE is not set");
if (!temporalTaskQueue) throw new Error("TEMPORAL_TASK_QUEUE is not set");

const createWorker = async (connection: NativeConnection) => {
  return Worker.create({
    connection: connection,
    namespace: temporalNamespace,
    taskQueue: temporalTaskQueue,
    debugMode: true,
    reuseV8Context: true,
    workflowsPath: resolve("./tasks/workflows/index"),
    activities: {
      importContactsBatch: importContactsBatch,
    },
    bundlerOptions: {
      webpackConfigHook: config => {
        config.externals = ['@prisma/client', '.prisma/client'];
        return config;
      }
    }
  });
};

const createTaskManager = async () => {
  const connection = await NativeConnection.connect({
    address: temporalAddress,
  });

  const worker = await createWorker(connection);
  try {
    await worker.run();
    console.log("Task manager stopped");
  } finally {
    await connection.close();
  }
};

console.log("Task manager starting...");

createTaskManager().catch(err => {
  console.error(err);
  process.exit(1);
});
