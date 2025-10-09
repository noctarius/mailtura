import { UTC } from "@mailtura/rpcmodel/lib/time/Timezone.js";
import type { ContactEntity, TemplateEntity, TenantEntity } from "../database/index.js";
import { Contact, type Template, Tenant } from "@mailtura/rpcmodel/lib/models";

export function mapDateTime<T extends Date, R extends string>(
  date: T | undefined | null
): T extends null | undefined ? R | undefined : R {
  if (!date) {
    return undefined as any;
  }
  return UTC.parse(date).formatIsoTime() as any;
}

export function mapTenant(tenant: TenantEntity): Tenant {
  return {
    id: tenant.id,
    name: tenant.name,
    createdAt: mapDateTime(tenant.created_at),
    createdBy: tenant.created_by,
    updatedAt: mapDateTime(tenant.updated_at),
    updatedBy: tenant.updated_by ?? undefined,
  };
}

type PotentiallyCountedContact = ContactEntity & { _count?: { bounce?: number; unsubscribe?: number } };
type CountedContact = PotentiallyCountedContact & { _count: { bounce: number; unsubscribe: number } };
export function mapContact(contact: PotentiallyCountedContact): Contact {
  const hasCount = (contact: PotentiallyCountedContact): contact is CountedContact =>
    contact._count !== undefined && //
    contact._count.bounce !== undefined &&
    contact._count.unsubscribe !== undefined;

  const status = hasCount(contact)
    ? contact._count.bounce > 0 || contact._count.unsubscribe > 0
      ? "Unsubscribed"
      : "Subscribed"
    : "Unknown";

  return {
    id: contact.id,
    email: contact.email,
    firstName: contact.first_name ?? undefined,
    lastName: contact.last_name ?? undefined,
    lastActivity: mapDateTime(contact.last_activity_at),
    listIds: contact.list_ids || [],
    status: status,
    createdAt: mapDateTime(contact.created_at),
    createdBy: contact.created_by,
    updatedAt: mapDateTime(contact.updated_at),
    updatedBy: contact.updated_by ?? undefined,
  };
}

export function mapTemplate(template: TemplateEntity): Template {
  return {
    id: template.id,
    name: template.name,
    content: template.content,
    properties: template.properties.map(property => {
      return {
        id: property.id,
        name: property.name,
        type: property.type,
        default_value: property.default_value,
      };
    }),
    createdAt: mapDateTime(template.created_at),
    createdBy: template.created_by,
    updatedAt: mapDateTime(template.updated_at),
    updatedBy: template.updated_by ?? undefined,
  };
}
