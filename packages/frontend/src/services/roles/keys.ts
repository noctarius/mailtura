export const roleKeys = {
  roles: (tenantId?: string) => ["roles", tenantId] as const,
  role: (tenantId?: string, roleId?: string) => ["roles", tenantId, roleId] as const,
};
