import {
  type ContactEntity,
  type JsonValue,
  type MailSendingReceiverEntity,
  type PrismaType,
} from "@mailtura/database";
import type { MailContact, MailRecipient, ReferenceMailContact } from "@mailtura/rpcmodel/mails/index.js";
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { uuidv7 } from "@mailtura/rpcmodel/helpers/index.js";
import { resolveSubscribedContacts, type SubscriptionResolver, type UnsubscribeResolver } from "./resolver.js";

type Email = {
  email: string;
  name: string;
};

export interface MailReceivers {
  recipients?: MailRecipient[];
  subscriberListIds?: string[];
}

export type RecipientsResolver = (
  mailSendingId: string,
  unsubscribeListId: string,
  receivers: MailReceivers
) => Promise<MailSendingReceiverEntity[]>;

const resolveContacts = async (
  prisma: PrismaType,
  tenantId: string,
  contacts: ReferenceMailContact[]
): Promise<Omit<ContactEntity, "_count">[]> => {
  return prisma.contacts.findMany({
    where: {
      tenant_id: tenantId,
      id: {
        in: contacts.map(contact => contact.contactId),
      },
    },
  });
};

const isReferenceMailContact = (contact: MailContact): contact is ReferenceMailContact => {
  return "contactId" in contact;
};

const normalizeMailContacts = (contacts: MailContact | MailContact[] | undefined): MailContact[] => {
  if (!contacts) return [];
  return Array.isArray(contacts) ? contacts : [contacts];
};

const resolveEmail = (contact: MailContact, resolvedContacts: Omit<ContactEntity, "_count">[]): Email => {
  if (isReferenceMailContact(contact)) {
    const resolvedContact = resolvedContacts.find(c => c.id === contact.contactId);
    if (!resolvedContact) throw new Error(`Contact with ID ${contact.contactId} not found`);
    const name = `${resolvedContact.first_name} ${resolvedContact.last_name}`;
    return { email: resolvedContact.email, name: name.trim() || resolvedContact.email };
  }
  return { email: contact.email, name: contact.name ?? contact.email };
};

const resolveMailContacts = (
  contacts: MailContact | MailContact[] | undefined,
  resolvedContacts: Omit<ContactEntity, "_count">[]
): Email[] => {
  if (!contacts) return [];
  const normalizedMailContacts = normalizeMailContacts(contacts);
  return normalizedMailContacts.map(contact => resolveEmail(contact, resolvedContacts));
};

const mapRecipients = async (
  prisma: PrismaType,
  tenantId: string,
  mailSendingId: string,
  recipients: MailRecipient[]
): Promise<MailSendingReceiverEntity[]> => {
  const resolvableContacts = recipients.flatMap(recipient => {
    return [
      ...(isReferenceMailContact(recipient.to) ? [recipient.to] : []),
      ...normalizeMailContacts(recipient.cc).filter(isReferenceMailContact),
      ...normalizeMailContacts(recipient.bcc).filter(isReferenceMailContact),
    ];
  });

  const resolvedContacts = await resolveContacts(prisma, tenantId, resolvableContacts);
  return recipients.map(recipient => {
    const to = resolveEmail(recipient.to, resolvedContacts);
    const cc = resolveMailContacts(recipient.cc, resolvedContacts);
    const bcc = resolveMailContacts(recipient.bcc, resolvedContacts);

    return {
      id: uuidv7(),
      tenant_id: tenantId,
      mail_sending_id: mailSendingId,
      email: to.email,
      name: to.name,
      substitutions: recipient.substitutions ?? {},
      cc: cc.map(c => c.email),
      bcc: bcc.map(c => c.email),
      created_at: UTC.now().toDate(),
      created_by: "api",
    };
  });
};

const buildSubscriptionResolver = (prisma: PrismaType, tenantId: string): SubscriptionResolver => {
  return async (subscriberListIds: string[]) => {
    return prisma.contacts.findMany({
      distinct: ["id"],
      include: {
        subscribers: {
          include: {
            subscriber_lists: true,
          },
        },
      },
      where: {
        tenant_id: tenantId,
        subscribers: {
          some: {
            subscriber_list_id: {
              in: subscriberListIds,
            },
            status: "Subscribed",
          },
        },
      },
    });
  };
};

const buildUnsubscribeResolver = (prisma: PrismaType, tenantId: string): UnsubscribeResolver => {
  return async (unsubscribeListId: string) => {
    return prisma.unsubscribes.findMany({
      where: {
        tenant_id: tenantId,
        unsubscribe_list_id: unsubscribeListId,
      },
    });
  };
};

const mapSubscriberLists = async (
  prisma: PrismaType,
  tenantId: string,
  mailSendingId: string,
  unsubscribeListId: string,
  subscriberListIds: string[]
): Promise<MailSendingReceiverEntity[]> => {
  const contacts = await resolveSubscribedContacts(
    {
      subscriptionResolver: buildSubscriptionResolver(prisma, tenantId),
      unsubscribeResolver: buildUnsubscribeResolver(prisma, tenantId),
    },
    unsubscribeListId,
    subscriberListIds
  );

  return contacts.map(contact => ({
    id: uuidv7(),
    tenant_id: tenantId,
    mail_sending_id: mailSendingId,
    email: contact.email,
    name: contact.first_name ?? contact.email,
    cc: [],
    bcc: [],
    substitutions: {
      email: contact.email,
      firstName: contact.first_name,
      lastName: contact.last_name,
      fullName: contact.first_name + " " + contact.last_name,
      subscriptions: contact.subscribers.map(subscriber => ({
        listName: subscriber.subscriber_lists.name,
        listDescription: subscriber.subscriber_lists.description,
        subscribedAt: UTC.parse(subscriber.subscribed_at).toTimestamp(),
        subscriberListId: subscriber.subscriber_list_id,
      })),
    },
    created_at: UTC.now().toDate(),
    created_by: "api",
  }));
};

export async function resolveRecipients(
  prisma: PrismaType,
  tenantId: string,
  mailSendingId: string,
  receivers: MailReceivers,
  unsubscribeListId?: string
): Promise<MailSendingReceiverEntity[]> {
  const hasCustomRecipients = (receivers.recipients ?? []).length > 0;
  const hasSubscriberLists = (receivers.subscriberListIds ?? []).length > 0;

  if (!hasCustomRecipients && !hasSubscriberLists) return [];
  if (hasCustomRecipients && hasSubscriberLists) throw new Error("Cannot mix custom and subscriber list recipients");

  if (hasCustomRecipients) return mapRecipients(prisma, tenantId, mailSendingId, receivers.recipients ?? []);

  if (!unsubscribeListId) throw new Error("Unsubscribe list ID is required when using subscriber lists");
  return mapSubscriberLists(prisma, tenantId, mailSendingId, unsubscribeListId, receivers.subscriberListIds ?? []);
}
