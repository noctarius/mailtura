export const contactsKeys = {
  contactsCount: (tenantId?: string) => ["contacts", tenantId, "count"] as const,
  contacts: (tenantId?: string, query?: string, cursor?: string, limit?: number) =>
    ["contacts", tenantId, query, cursor, limit] as const,
  contact: (tenantId?: string, contactId?: string) => ["contacts", tenantId, contactId] as const,
};
