import type { TaskManager } from "../tasks/index.js";
import type prisma from "@mailtura/database";

export interface ServerContext {
  readonly taskManager: TaskManager;
  readonly prisma: prisma;
}
