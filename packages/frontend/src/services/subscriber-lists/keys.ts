export const subscriberListKeys = {
  lists: (tenant_id?: string) => ["lists", tenant_id] as const,
  subscribers: (tenant_id?: string, subscriber_list_id?: string) =>
    ["lists", tenant_id, "subscribers", subscriber_list_id] as const,
};
