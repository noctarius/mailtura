import type { ContactEntity, SubscriberEntity, SubscriberListEntity, UnsubscribeEntity } from "@mailtura/database";

type SubscriberWithSubscriberList = SubscriberEntity & { subscriber_lists: SubscriberListEntity };
type ContactWithSubscriptions = ContactEntity & { subscribers: SubscriberWithSubscriberList[] };

export type SubscriptionResolver = (subscriberListIds: string[]) => Promise<ContactWithSubscriptions[]>;

export type UnsubscribeResolver = (unsubscribeListId: string) => Promise<UnsubscribeEntity[]>;

interface ResolverConfig {
  subscriptionResolver: SubscriptionResolver;
  unsubscribeResolver: UnsubscribeResolver;
}

export async function resolveSubscribedContacts(
  config: ResolverConfig,
  unsubscribeListId: string,
  subscriberListIds: string[]
) {
  const contacts = await config.subscriptionResolver(subscriberListIds);
  if (!contacts || contacts.length === 0) return [];

  const unsubscribes = await config.unsubscribeResolver(unsubscribeListId);
  const unsubscribedEmails = unsubscribes.map(unsubscribe => unsubscribe.email);

  return contacts.filter(contact => !unsubscribedEmails.includes(contact.email));
}
