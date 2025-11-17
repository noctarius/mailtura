import prisma from "../database/index.js";

export async function requiresInstallation() {
  const tenantCount = await prisma.tenants.count()
  return tenantCount === 0
}