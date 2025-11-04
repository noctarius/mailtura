export const userKeys = {
  users: (tenantId?: string) => ["users", tenantId] as const,
  user: (tenantId?: string, userId?: string) => ["users", tenantId, userId] as const,
};
