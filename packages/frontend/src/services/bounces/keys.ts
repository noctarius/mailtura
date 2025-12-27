export const bouncesKeys = {
  bounces: (tenantId?: string, query?: string, cursor?: string, limit?: number) =>
    ["bounces", tenantId, query, cursor, limit] as const,
  bounce: (tenantId?: string, bounceId?: string) => ["bounces", tenantId, bounceId] as const,
};
