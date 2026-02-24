import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import {
  type AccountEntity,
  type ApiKeyEntity,
  type BounceEntity,
  type CampaignEntity,
  type ContactEntity,
  type ContactImportEntity,
  type ContactsWithSubscriptionsEntity,
  type FileEntity,
  GLOBAL_UNSUBSCRIBE_LIST_ID,
  type MailConfigEntity,
  type RoleEntity,
  type SubscriberEntity,
  type SubscriberListEntity,
  type TemplateEntity,
  type TenantEntity,
  type UnsubscribeEntity,
  type UnsubscribeListEntity,
  type UserEntity,
} from "./index.js";
import type {
  Account,
  ApiKey,
  Bounce,
  Campaign,
  Contact,
  ContactImport,
  File,
  Role,
  Subscriber,
  SubscriberList,
  Template,
  Tenant,
  Unsubscribe,
  User,
} from "@mailtura/rpcmodel/api/index.js";
import type { template_properties } from "./generated/prisma/client.js";
import type { MailConfig } from "@mailtura/rpcmodel/mails/index.js";

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
    active: tenant.active,
    maxUsers: tenant.max_users,
    features: tenant.features,
    customDomain: tenant.custom_domain ?? undefined,
    createdAt: mapDateTime(tenant.created_at),
    createdBy: tenant.created_by,
    updatedAt: mapDateTime(tenant.updated_at),
    updatedBy: tenant.updated_by ?? undefined,
  };
}

type PotentiallyCountedContact = ContactEntity & {
  _count?: { unsubscribes?: number };
  subscribers?: any[];
};
type CountedContact = PotentiallyCountedContact & { _count: { unsubscribes: number } };
type SubscriberContact = PotentiallyCountedContact & { subscribers: any[] };
export function mapContact(contact: PotentiallyCountedContact): Contact {
  const hasCount = (contact: PotentiallyCountedContact): contact is CountedContact =>
    contact._count !== undefined && //
    contact._count.unsubscribes !== undefined;

  const hasSubscribers = (contact: PotentiallyCountedContact): contact is SubscriberContact =>
    contact.subscribers !== undefined;

  const status = hasCount(contact) ? (contact._count.unsubscribes > 0 ? "Unsubscribed" : "Subscribed") : "Unknown";
  return {
    id: contact.id,
    email: contact.email,
    firstName: contact.first_name ?? undefined,
    lastName: contact.last_name ?? undefined,
    subscriptions: hasSubscribers(contact) ? contact.subscribers.map(subscriber => subscriber.subscriber_list_id) : [],
    status: status,
    createdAt: mapDateTime(contact.created_at),
    createdBy: contact.created_by,
    updatedAt: mapDateTime(contact.updated_at),
    updatedBy: contact.updated_by ?? undefined,
  };
}

export function mapContactsWithSubscriptions(contact: ContactsWithSubscriptionsEntity): Contact {
  return {
    id: contact.id,
    email: contact.email,
    firstName: contact.first_name ?? undefined,
    lastName: contact.last_name ?? undefined,
    subscriptions: contact.subscriptions,
    status: contact.bounces > 0 || contact.unsubscribes > 0 ? "Unsubscribed" : "Subscribed",
    createdAt: mapDateTime(contact.created_at),
    createdBy: contact.created_by,
    updatedAt: mapDateTime(contact.updated_at),
    updatedBy: contact.updated_by ?? undefined,
  };
}

type PotentiallyPropertiesTemplate = TemplateEntity & {
  template_properties?: template_properties[];
};
export function mapTemplate(template: PotentiallyPropertiesTemplate): Template {
  return {
    id: template.id,
    name: template.name,
    content: template.content,
    properties:
      template.template_properties?.map(property => {
        return {
          id: property.id,
          name: property.name,
          type: property.type,
          default_value: property.default_value,
        };
      }) ?? [],
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

type PotentiallyCountedSubscriberList = SubscriberListEntity & { _count?: { subscribers?: number } };
type CountedSubscriberList = PotentiallyCountedSubscriberList & { _count: { subscribers: number } };
export function mapSubscriberList(subscriberList: PotentiallyCountedSubscriberList): SubscriberList {
  const hasCount = (subscriberList: PotentiallyCountedSubscriberList): subscriberList is CountedSubscriberList =>
    subscriberList._count !== undefined && //
    subscriberList._count.subscribers !== undefined;

  return {
    id: subscriberList.id,
    name: subscriberList.name,
    description: subscriberList.description ?? undefined,
    contactCount: hasCount(subscriberList) ? subscriberList._count.subscribers : 0,
    createdAt: mapDateTime(subscriberList.created_at),
    createdBy: subscriberList.created_by,
    updatedAt: mapDateTime(subscriberList.updated_at),
    updatedBy: subscriberList.updated_by ?? undefined,
  };
}

type PotentiallyCountedUnsubscribeList = UnsubscribeListEntity & { _count?: { unsubscribes?: number } };
type CountedUnsubscribeList = PotentiallyCountedUnsubscribeList & { _count: { unsubscribes: number } };
export function mapUnsubscribeList(unsubscribeList: PotentiallyCountedUnsubscribeList): SubscriberList {
  const hasCount = (unsubscribeList: PotentiallyCountedUnsubscribeList): unsubscribeList is CountedUnsubscribeList =>
    unsubscribeList._count !== undefined && //
    unsubscribeList._count.unsubscribes !== undefined;

  return {
    id: unsubscribeList.id,
    name: unsubscribeList.name,
    description: unsubscribeList.description ?? undefined,
    contactCount: hasCount(unsubscribeList) ? unsubscribeList._count.unsubscribes : 0,
    createdAt: mapDateTime(unsubscribeList.created_at),
    createdBy: unsubscribeList.created_by,
    updatedAt: mapDateTime(unsubscribeList.updated_at),
    updatedBy: unsubscribeList.updated_by ?? undefined,
  };
}

export function mapSubscriber(subscriber: SubscriberEntity): Subscriber {
  return {
    id: subscriber.id,
    contactId: subscriber.contact_id,
    subscriberListId: subscriber.subscriber_list_id,
    status: subscriber.status,
    subscribedAt: mapDateTime(subscriber.subscribed_at),
    createdAt: mapDateTime(subscriber.created_at),
    createdBy: subscriber.created_by,
    updatedAt: mapDateTime(subscriber.updated_at),
    updatedBy: subscriber.updated_by ?? undefined,
  };
}

export function mapUser(user: UserEntity): User {
  return {
    id: user.id,
    tenantId: user.tenant_id,
    email: user.email,
    roleId: user.role_id,
    firstName: user.first_name ?? undefined,
    lastName: user.last_name ?? undefined,
    active: user.active,
    emailVerified: user.email_verified,
    twoFactorEnabled: user.two_factor_enabled ?? false,
    image: user.image ?? undefined,
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
    active: apiKey.active,
    lastUsedAt: mapDateTime(apiKey.last_used_at),
    expiresAt: mapDateTime(apiKey.expires_at),
    permissions: apiKey.permissions || [],
    createdAt: mapDateTime(apiKey.created_at),
    createdBy: apiKey.created_by,
    updatedAt: mapDateTime(apiKey.updated_at),
    updatedBy: apiKey.updated_by ?? undefined,
  };
}

export function mapContactImport(contactImport: ContactImportEntity): ContactImport {
  return {
    id: contactImport.id,
    name: contactImport.name ?? undefined,
    filename: contactImport.filename,
    status: contactImport.status,
    records: contactImport.records,
    finished: contactImport.finished,
    parameters: contactImport.parameters,
    createdAt: mapDateTime(contactImport.created_at),
    createdBy: contactImport.created_by,
    updatedAt: mapDateTime(contactImport.updated_at),
    updatedBy: contactImport.updated_by ?? undefined,
  };
}

export function mapFile(file: FileEntity): File {
  return {
    id: file.id,
    name: file.name,
    createdAt: mapDateTime(file.created_at),
    createdBy: file.created_by,
    updatedAt: mapDateTime(file.updated_at),
    updatedBy: file.updated_by ?? undefined,
  };
}

export function mapRole(role: RoleEntity): Role {
  return {
    id: role.id,
    name: role.name,
    description: role.description ?? undefined,
    permissions: role.permissions,
    createdAt: mapDateTime(role.created_at),
    createdBy: role.created_by,
    updatedAt: mapDateTime(role.updated_at),
    updatedBy: role.updated_by ?? undefined,
  };
}

export function mapUnsubscribe(unsubscribe: UnsubscribeEntity): Unsubscribe {
  const isGlobal = unsubscribe.unsubscribe_list_id === GLOBAL_UNSUBSCRIBE_LIST_ID;
  return {
    id: unsubscribe.id,
    email: unsubscribe.email,
    source: unsubscribe.source ?? undefined,
    global: isGlobal,
    unsubscribeListId: !isGlobal ? unsubscribe.unsubscribe_list_id : undefined,
    unsubscribedAt: mapDateTime(unsubscribe.unsubscribed_at),
    createdAt: mapDateTime(unsubscribe.created_at),
    createdBy: unsubscribe.created_by,
    updatedAt: mapDateTime(unsubscribe.updated_at),
    updatedBy: unsubscribe.updated_by ?? undefined,
  };
}

export function mapBounce(bounce: BounceEntity): Bounce {
  return {
    id: bounce.id,
    reason: bounce.reason,
    email: bounce.email,
    bouncedAt: mapDateTime(bounce.bounced_at),
    bounceType: bounce.bounce_type,
    createdAt: mapDateTime(bounce.created_at),
    createdBy: bounce.created_by,
    updatedAt: mapDateTime(bounce.updated_at),
    updatedBy: bounce.updated_by ?? undefined,
  };
}

export function mapAccount(account: AccountEntity): Account {
  return {
    id: account.id,
    userId: account.user_id,
    accountId: account.account_id,
    providerId: account.provider_id ?? undefined,
    scope: account.scope ?? undefined,
    createdAt: mapDateTime(account.created_at),
    createdBy: account.created_by,
    updatedAt: mapDateTime(account.updated_at),
    updatedBy: account.updated_by ?? undefined,
  };
}

export function mapMailConfig(mailConfig: MailConfigEntity): MailConfig {
  return {
    id: mailConfig.id,
    tenant_id: mailConfig.tenant_id,
    name: mailConfig.name,
    type: mailConfig.type as any,
    host: (mailConfig.config as any).host,
    port: (mailConfig.config as any).port,
    secure: (mailConfig.config as any).secure,
    maxConnections: (mailConfig.config as any).maxConnections,
    maxMessages: (mailConfig.config as any).maxMessages,
    auth: (mailConfig.config as any).auth,
    apiKey: (mailConfig.config as any).apiKey,
    region: (mailConfig.config as any).region,
    username: (mailConfig.config as any).username,
    subuser: (mailConfig.config as any).subuser,
    verificationKey: (mailConfig.config as any).verificationKey,
    domain: (mailConfig.config as any).domain,
    apiSecret: (mailConfig.config as any).apiSecret,
    createdAt: mapDateTime(mailConfig.created_at),
    createdBy: mailConfig.created_by,
    updatedAt: mapDateTime(mailConfig.updated_at),
    updatedBy: mailConfig.updated_by ?? undefined,
  };
}
