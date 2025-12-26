export const roleKeys = {
  roles: (tenantId?: string, query?: string, cursor?: string, limit?: number) =>
    ["roles", tenantId, query, cursor, limit] as const,
  role: (tenantId?: string, roleId?: string) => ["roles", tenantId, roleId] as const,
};
