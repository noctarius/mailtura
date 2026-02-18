import type { PrismaType } from "@mailtura/database";
import uuidv7 from "../helpers/uuidv7.js";

export interface BaseConfiguration {
  siteAddress: string;
  httpPort: number;
  httpsPort: number;
  enableHttps: boolean;
  systemTenantId: string;
}

export async function getBaseConfig(prisma: PrismaType) {
  const config = await prisma.system_configs.findFirst({
    where: {
      key: "base-config",
    },
  });

  if (!config) return undefined;

  return config.value as unknown as BaseConfiguration;
}

export async function setBaseConfig(prisma: PrismaType, config: Partial<BaseConfiguration>) {
  await prisma.system_configs.upsert({
    where: {
      key: "base-config",
    },
    update: {
      value: config,
    },
    create: {
      key: "base-config",
      value: config,
    },
  });
}
