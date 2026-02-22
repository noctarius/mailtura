export const unsubscribesKeys = {
  unsubscribes: (tenantId?: string) => ["unsubscribes", tenantId] as const,
  pagedUnsubscribes: (tenantId?: string, query?: string, cursor?: string, limit?: number) =>
    ["unsubscribes", tenantId, { query, cursor, limit }] as const,
  unsubscribe: (tenantId?: string, unsubscribeId?: string) => ["unsubscribes", tenantId, unsubscribeId] as const,
};
