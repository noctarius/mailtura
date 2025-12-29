import Fastify from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { createRouter } from "../../src/router/index.js";
import registerModelSchema, { registerRoutes } from "../../src/api/index.js";
import type { prisma } from "@mailtura/database";
import type { TaskManager } from "../../src/tasks/index.js";

export type TestApp = {
  app: ReturnType<typeof Fastify>;
  close: () => Promise<void>;
};

export function createMockTaskManager(): TaskManager {
  return {
    shutdown: async () => {},
    createImportContactsJob: async () => ({ id: "mock-import" }),
    getImportContactsJobStatus: async () => "COMPLETED" as any,
    createSendMailJob: async () => ({ id: "mock-send" }),
  };
}

export async function createTestApp(prisma: prisma): Promise<TestApp> {
  const app = Fastify().withTypeProvider<TypeBoxTypeProvider>();

  // Register common schemas
  registerModelSchema(app);

  // Build a router with auth disabled for tests
  const router = createRouter(app as any, { prisma, taskManager: createMockTaskManager() } as any, false);

  router.route("/api/v1", registerRoutes, false);

  await app.ready();
  return {
    app,
    close: () => app.close(),
  };
}
