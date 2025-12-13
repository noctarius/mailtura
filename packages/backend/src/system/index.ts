import prisma from "@mailtura/database";

export interface BaseConfiguration {
  siteAddress: string;
  httpPort: number;
  httpsPort: number;
  enableHttps: boolean;
  systemTenantId: string;
}

export async function getBaseConfig() {
  const config = await prisma.system_configs.findFirst({
    where: {
      key: "base-config",
    },
  });

  if (!config) return undefined;

  return config.value as unknown as BaseConfiguration;
}

export async function setBaseConfig(config: Partial<BaseConfiguration>) {
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
