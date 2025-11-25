import prisma from "@mailtura/database";

export async function requiresInstallation() {
  const tenantCount = await prisma.tenants.count()
  return tenantCount === 0
}