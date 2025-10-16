export const subscriberListKey = {
  lists: (tenant_id?: string) => ["lists", tenant_id] as const,
  subscribers: (tenant_id?: string, subscriber_list_id?: string) =>
    ["lists", tenant_id, subscriber_list_id, "subscribers"] as const,
};
