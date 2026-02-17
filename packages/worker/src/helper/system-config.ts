import { PrismaType } from "@mailtura/database";
import { SystemConfig } from "@mailtura/rpcmodel/api/index.js";

export async function getSystemConfig(prisma: PrismaType): Promise<SystemConfig> {
  const systemConfigEntity = await prisma.system_configs.findUnique({
    where: {
      key: "system",
    },
  });

  const systemConfig = systemConfigEntity?.value ?? {};
  if (!systemConfig) {
    throw new Error("System config not found");
  }

  if (typeof systemConfig !== "object") {
    throw new Error("System config apiBase must be an object");
  }

  if (Array.isArray(systemConfig)) {
    throw new Error("System config apiBase must be an object");
  }

  return systemConfig as SystemConfig;
}
