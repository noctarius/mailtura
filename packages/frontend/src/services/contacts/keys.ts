export const contactsKeys = {
  contacts: (tenantId?: string, query?: string) => ["contacts", tenantId, query] as const,
  contact: (tenantId?: string, contactId?: string) => ["contacts", tenantId, contactId] as const,
};
