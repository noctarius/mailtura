import type { PrismaType } from "../../index.js";
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { randomUUID } from "node:crypto";

export interface UnsubscribeContactInput {
  tenantId: string;
  contactId: string;
  listIds: string[];
  global: boolean;
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
  const listNameById = new Map(subscriberLists.map(list => [list.id, list.name]));

  return {
    tenantId: contact.tenant_id,
    contactId: contact.id,
    email: contact.email,
    subscriptions: contact.subscribers
      .map(subscriber => ({
        id: subscriber.subscriber_list_id,
        name: listNameById.get(subscriber.subscriber_list_id),
      }))
      .filter((subscription): subscription is { id: string; name: string } => {
        return typeof subscription.name === "string" && subscription.name.length > 0;
      }),
    unsubscribeLists: (listIds: string[], actor?: string) =>
      unsubscribeContact(prisma, { tenantId: contact.tenant_id, contactId, listIds, global: false, actor }),
    unsubscribeGlobal: (actor?: string) =>
      unsubscribeContact(prisma, { tenantId: contact.tenant_id, contactId, listIds: [], global: true, actor }),
  };
}

export async function unsubscribeContact(prisma: PrismaType, input: UnsubscribeContactInput): Promise<void> {
  const actor = input.actor ?? "api";
  await prisma.$transaction(async tx => {
    if (input.listIds.length > 0) {
      await tx.subscribers.updateMany({
        where: {
          tenant_id: input.tenantId,
          contact_id: input.contactId,
          subscriber_list_id: {
            in: input.listIds,
          },
        },
        data: {
          status: "Unsubscribed",
          updated_at: UTC.now().toDate(),
          updated_by: actor,
        },
      });
    }

    const existingUnsubscribe = await tx.unsubscribes.findFirst({
      where: {
        tenant_id: input.tenantId,
        contact_id: input.contactId,
      },
    });

    const mergedListIds = distinctSubscriptionIds(existingUnsubscribe?.list_ids ?? [], ...input.listIds);
    await tx.unsubscribes.upsert({
      where: {
        tenant_id_contact_id: {
          tenant_id: input.tenantId,
          contact_id: input.contactId,
        },
      },
      create: {
        id: randomUUID(),
        tenant_id: input.tenantId,
        contact_id: input.contactId,
        source: "UnsubscribeLink",
        global: input.global,
        list_ids: mergedListIds,
        unsubscribed_at: UTC.now().toDate(),
        created_at: UTC.now().toDate(),
        created_by: actor,
      },
      update: {
        global: input.global ?? existingUnsubscribe?.global ?? false,
        list_ids: mergedListIds,
        unsubscribed_at: UTC.now().toDate(),
        updated_at: UTC.now().toDate(),
        updated_by: actor,
      },
    });
  });
}
