import type { TaskManager } from "../tasks/index.js";
import type { PrismaType } from "@mailtura/database";

export interface ServerContext {
  readonly taskManager: TaskManager;
  readonly prisma: PrismaType;
}
