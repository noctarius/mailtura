import { getBaseConfig } from "../system/index.js";

export async function getBaseSystemUrl() {
  const baseConfig = await getBaseConfig();
  if (!baseConfig) throw new Error("Base config not found");

  const port = baseConfig.enableHttps ? baseConfig.httpsPort : baseConfig.httpPort;
  return `http${baseConfig.enableHttps ? "s" : ""}://${baseConfig.siteAddress}:${port}`;
}
