export const tenantKeys = {
  tenants: () => ["tenants"] as const,
  tenant: (tenantId?: string) => ["tenants", tenantId] as const,
};
