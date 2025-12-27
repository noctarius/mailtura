export const unsubscribesKeys = {
  unsubscribes: (tenantId?: string, query?: string, cursor?: string, limit?: number) =>
    ["unsubscribes", tenantId, query, cursor, limit] as const,
  unsubscribe: (tenantId?: string, unsubscribeId?: string) => ["unsubscribes", tenantId, unsubscribeId] as const,
};
