import { UTC } from "@mailtura/rpcmodel/lib/time/Timezone.js";
import type {
  ApiKeyEntity,
  CampaignEntity,
  ContactEntity,
  SubscriberListEntity,
  TemplateEntity,
  TenantEntity,
  UserEntity,
} from "../database/index.js";
import {
  type ApiKey,
  type Campaign,
  Contact,
  type SubscriberList,
  type Template,
  Tenant,
  type User,
} from "@mailtura/rpcmodel/lib/models";

export function mapDateTime<T extends Date, R extends string>(
  date: T | undefined | null
): T extends null | undefined ? R | undefined : R {
  if (!date) {
    return undefined as any;
  }
  return UTC.parse(date).formatIsoTime() as any;
}

export function fromDateTime<T extends string, R extends Date>(
  dataString: T | undefined | null
): T extends null ? null : T extends undefined ? R | undefined : R {
  if (!dataString) {
    return undefined as any;
  }
  return UTC.parse(dataString).toDate() as any;
}

export const unpackOptionalNullable = <TType, T extends TType | null, TOptional extends T | undefined>(
  value: TOptional,
  defaultValue: T
): T => {
  if (value === null) return null as T;
  if (value === undefined) return defaultValue;
  return value;
};

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

export function mapCampaign(campaign: CampaignEntity): Campaign {
  return {
    id: campaign.id,
    name: campaign.name,
    type: campaign.type,
    status: campaign.status,
    recipients: campaign.recipients,
    sent: campaign.sent,
    delivered: campaign.delivered,
    opened: 0, // TODO map opened
    clicked: 0, // TODO map clicked
    deliveryRate: 0, // TODO map deliveryRate
    openRate: 0, // TODO map openRate
    clickRate: 0, // TODO map clickRate
    createdAt: mapDateTime(campaign.created_at),
    createdBy: campaign.created_by,
    updatedAt: mapDateTime(campaign.updated_at),
    updatedBy: campaign.updated_by ?? undefined,
  };
}

export function mapSubscriberList(subscriberList: SubscriberListEntity): SubscriberList {
  return {
    id: subscriberList.id,
    name: subscriberList.name,
    description: subscriberList.description ?? undefined,
    createdAt: mapDateTime(subscriberList.created_at),
    createdBy: subscriberList.created_by,
    updatedAt: mapDateTime(subscriberList.updated_at),
    updatedBy: subscriberList.updated_by ?? undefined,
  };
}

export function mapUser(user: UserEntity): User {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    firstName: user.first_name ?? undefined,
    lastName: user.last_name ?? undefined,
    isActive: user.is_active,
    lastLoginAt: mapDateTime(user.last_login_at),
    permissions: user.permissions || [],
    createdAt: mapDateTime(user.created_at),
    createdBy: user.created_by,
    updatedAt: mapDateTime(user.updated_at),
    updatedBy: user.updated_by ?? undefined,
  };
}

export function mapApiKey(apiKey: ApiKeyEntity): ApiKey {
  return {
    id: apiKey.id,
    name: apiKey.name,
    key: apiKey.key,
    isActive: apiKey.is_active,
    lastUsedAt: mapDateTime(apiKey.last_used_at),
    expiresAt: mapDateTime(apiKey.expires_at),
    permissions: apiKey.permissions || [],
    createdAt: mapDateTime(apiKey.created_at),
    createdBy: apiKey.created_by,
    updatedAt: mapDateTime(apiKey.updated_at),
    updatedBy: apiKey.updated_by ?? undefined,
  };
}
