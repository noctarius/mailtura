export const userKeys = {
  users: (tenantId?: string, query?: string, cursor?: string, limit?: number) =>
    ["users", tenantId, query, cursor, limit] as const,
  user: (tenantId?: string, userId?: string) => ["users", tenantId, userId] as const,
  userCount: (tenantId?: string, query?: string) => ["users", tenantId, "count", query] as const,
};
