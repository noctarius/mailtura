export const subscriberListKeys = {
  lists: (tenant_id?: string, query?: string, cursor?: string, limit?: number) =>
    ["lists", tenant_id, query, cursor, limit] as const,
  subscribers: (tenant_id?: string, subscriber_list_id?: string) =>
    ["lists", tenant_id, "subscribers", subscriber_list_id] as const,
};
