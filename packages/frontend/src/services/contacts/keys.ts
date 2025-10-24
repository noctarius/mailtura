export const contactsKeys = {
  contacts: (tenantId?: string) => ["contacts", tenantId] as const,
  contact: (tenantId?: string, contactId?: string) => ["contacts", tenantId, contactId] as const,
};
