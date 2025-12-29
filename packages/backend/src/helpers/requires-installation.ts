import { type PrismaType } from "@mailtura/database";

export async function requiresInstallation(prisma: PrismaType) {
  const tenantCount = await prisma.tenants.count();
  return tenantCount === 0;
}
