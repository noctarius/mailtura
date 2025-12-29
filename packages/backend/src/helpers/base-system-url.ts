import { getBaseConfig } from "../system/index.js";
import type { PrismaType } from "@mailtura/database";

export async function getBaseSystemUrl(prisma: PrismaType) {
  const baseConfig = await getBaseConfig(prisma);
  if (!baseConfig) throw new Error("Base config not found");

  const port = baseConfig.enableHttps ? baseConfig.httpsPort : baseConfig.httpPort;
  return `http${baseConfig.enableHttps ? "s" : ""}://${baseConfig.siteAddress}:${port}`;
}
