export const apiKeyKeys = {
  apiKeys: (tenantId?: string) => ["api-keys", tenantId] as const,
  apiKey: (tenantId?: string, apiKeyId?: string) => ["api-keys", tenantId, apiKeyId] as const,
};
