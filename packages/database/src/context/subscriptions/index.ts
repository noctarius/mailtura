import type { PrismaType } from "../../index.js";
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { randomUUID } from "node:crypto";

export const GLOBAL_UNSUBSCRIBE_LIST_ID = "00000000-0000-0000-0000-000000000000";

export interface UnsubscribeContactInput {
  tenantId: string;
  email: string;
  unsubscribeListIds: string[];
  actor?: string;
}

export interface SubscriptionContext {
  tenantId: string;
  contactId: string;
  email: string;
  subscriptions: Array<{ id: string; name: string }>;
  unsubscribeLists(listIds: string[], actor?: string): Promise<void>;
  unsubscribeGlobal(actor?: string): Promise<void>;
}

const distinctSubscriptionIds = (subscriberListIds: string[], ...additionalItems: string[]) => {
  return Array.from(new Set([...subscriberListIds, ...additionalItems]));
};

const readSubscriberLists = async (prisma: PrismaType, tenantId: string, subscriberListIds: string[]) => {
  if (subscriberListIds.length === 0) return [];
  return prisma.subscriber_lists.findMany({
    where: {
      tenant_id: tenantId,
      id: {
        in: subscriberListIds,
      },
    },
  });
};

export async function buildSubscriptionContext(
  prisma: PrismaType,
  contactId: string
): Promise<SubscriptionContext | undefined> {
  const contact = await prisma.contacts.findUnique({
    where: {
      id: contactId,
    },
    include: {
      subscribers: {
        where: {
          status: "Subscribed",
        },
      },
    },
  });

  if (!contact) return undefined;

  const subscriberListIds = distinctSubscriptionIds(
    contact.subscribers.map(subscriber => subscriber.subscriber_list_id)
  );
  const subscriberLists = await readSubscriberLists(prisma, contact.tenant_id, subscriberListIds);
  const mapListIdToName = new Map(subscriberLists.map(list => [list.id, list.name]));

  return {
    tenantId: contact.tenant_id,
    contactId: contact.id,
    email: contact.email,
    subscriptions: contact.subscribers
      .map(subscriber => ({
        id: subscriber.subscriber_list_id,
        name: mapListIdToName.get(subscriber.subscriber_list_id),
      }))
      .filter((subscription): subscription is { id: string; name: string } => {
        return typeof subscription.name === "string" && subscription.name.length > 0;
      }),
    unsubscribeLists: (unsubscribeListIds: string[], actor?: string) =>
      unsubscribeContact(prisma, {
        tenantId: contact.tenant_id,
        email: contact.email,
        unsubscribeListIds,
        actor,
      }),
    unsubscribeGlobal: (actor?: string) =>
      unsubscribeContact(prisma, {
        tenantId: contact.tenant_id,
        email: contact.email,
        unsubscribeListIds: [GLOBAL_UNSUBSCRIBE_LIST_ID],
        actor,
      }),
  };
}

export async function unsubscribeContact(prisma: PrismaType, input: UnsubscribeContactInput): Promise<void> {
  const actor = input.actor ?? "api";
  const unsubscribeListIds = distinctSubscriptionIds(input.unsubscribeListIds);
  await prisma.$transaction(async tx => {
    await tx.subscribers.updateMany({
      where: {
        tenant_id: input.tenantId,
        contacts: {
          email: input.email,
        },
        // If unsubscribeListIds is empty or includes global unsubscribe, unsubscribe from all lists
        ...(unsubscribeListIds.length > 0 && !unsubscribeListIds.includes(GLOBAL_UNSUBSCRIBE_LIST_ID)
          ? {
              subscriber_list_id: {
                in: unsubscribeListIds,
              },
            }
          : {}),
      },
      data: {
        status: "Unsubscribed",
        updated_at: UTC.now().toDate(),
        updated_by: actor,
      },
    });

    await Promise.all(
      unsubscribeListIds.map(unsubscribeListId =>
        tx.unsubscribes.upsert({
          where: {
            tenant_id_email_unsubscribe_list_id: {
              tenant_id: input.tenantId,
              email: input.email,
              unsubscribe_list_id: unsubscribeListId,
            },
          },
          create: {
            id: randomUUID(),
            tenant_id: input.tenantId,
            email: input.email,
            source: "UnsubscribeLink",
            unsubscribe_list_id: unsubscribeListId,
            unsubscribed_at: UTC.now().toDate(),
            created_at: UTC.now().toDate(),
            created_by: actor,
          },
          update: {
            unsubscribed_at: UTC.now().toDate(),
            updated_at: UTC.now().toDate(),
            updated_by: actor,
          },
        })
      )
    );
  });
}
