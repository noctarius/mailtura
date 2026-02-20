import type { SendMailArguments } from "@mailtura/rpcmodel/tasks/index.js";
import { log } from "@temporalio/activity";
import {
  MailSendingEntity,
  MailSendingReceiverEntity,
  mapTemplate,
  newPrismaClient,
  newPrismaPg,
  PrismaType,
} from "@mailtura/database";
import { newMailTransport } from "../../mails/index.js";
import { type MailContent, type MailRecipient } from "@mailtura/rpcmodel/mails/index.js";
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { getSystemConfig } from "../../helper/system-config.js";
import { MailLogEntry, TransportConfig, UrlProxy } from "../../mails/transport.js";
import uuidv7 from "../../helper/uuidv7.js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

type MailSending = MailSendingEntity & {
  mail_receivers: MailSendingReceiverEntity[];
  subscriber_lists: { subscriber_list_id: string }[];
};

const buildTemplateResolver = (prisma: PrismaType) => {
  return async (templateId: string) => {
    const template = await prisma.templates.findUnique({ where: { id: templateId } });
    if (!template) return undefined;
    return mapTemplate(template);
  };
};

const buildUrlRelocationStorage = (prisma: PrismaType, tenantId: string) => {
  return async (urlRelocations: UrlProxy[]) => {
    await prisma.mail_url_proxies.createMany({
      data: urlRelocations.map(urlRelocation => ({
        tenant_id: tenantId,
        id: urlRelocation.id,
        from: urlRelocation.from,
        to: urlRelocation.to,
        contact_id: urlRelocation.contactId,
        position: urlRelocation.position,
      })),
    });
  };
};

const buildMailLogStorage = (prisma: PrismaType, tenantId: string) => {
  return async (entries: MailLogEntry[]) => {
    if (entries.length === 0) return;
    const now = UTC.now().toDate();
    await prisma.mail_logs.createMany({
      data: entries.map(entry => {
        const id = uuidv7();
        return {
          id,
          tenant_id: tenantId,
          contact_id: entry.contactId ?? null,
          provider_id: entry.providerId,
          provider_mail_id: entry.providerMailId ?? id,
          opens: 0,
          clicks: 0,
          status: "Delivered",
          created_at: now,
          created_by: "worker",
        };
      }),
    });
  };
};

export async function sendMailBatch(args: SendMailArguments): Promise<number> {
  const prisma = newPrismaClient(newPrismaPg(connectionString!));

  const mailSendingId = args.mail_sending_id;
  const tenantId = args.tenant_id;
  const batchSize = args.batch_size;
  log.info(`Sending mail batch for import ${mailSendingId} on tenant ${tenantId} with batch size ${batchSize}`);

  const mailSending = await prisma.mail_sendings.findUnique({
    where: {
      id: mailSendingId,
      tenant_id: tenantId,
    },
    include: {
      mail_sender: true,
      mail_config: true,
      mail_receivers: true,
      subscriber_lists: true,
    },
  });

  if (!mailSending) {
    throw new Error(`Mail sending ${mailSendingId} not found for tenant ${tenantId}`);
  }

  const mailSender = mailSending.mail_sender;
  if (!mailSender) {
    throw new Error(`Mail sender not found for mail sending ${mailSendingId} on tenant ${tenantId}`);
  }

  const mailConfig = mailSending.mail_config;
  if (!mailConfig) {
    throw new Error(`Mail config not found for mail sending ${mailSendingId} on tenant ${tenantId}`);
  }

  const from = {
    name: mailSender.name,
    email: mailSender.email,
  };

  const systemConfig = await getSystemConfig(prisma);
  const transportConfig: TransportConfig = {
    apiBase: systemConfig.apiBase,
    templateResolver: buildTemplateResolver(prisma),
    urlRelocationStorage: buildUrlRelocationStorage(prisma, tenantId),
    mailLogStorage: buildMailLogStorage(prisma, tenantId),
  };

  const transport = newMailTransport(mailConfig, transportConfig);
  if (!transport) {
    throw new Error(`Mail transport not found for mail sending ${mailSendingId} on tenant ${tenantId}`);
  }

  const recipients = await mapReceivers(prisma, mailSending, 0, batchSize);
  await transport.send({
    from,
    subject: mailSending.subject,
    content: mapContent(mailSending),
    recipients,
    features: {},
  });

  return 0;
}

const mapReceivers = async (
  prisma: PrismaType,
  mailSending: MailSending,
  offset: number,
  batchSize: number
): Promise<MailRecipient[]> => {
  const receivers = mailSending.mail_receivers;
  if (receivers && receivers.length > 0) {
    const contacts = await prisma.contacts.findMany({
      where: {
        tenant_id: mailSending.tenant_id,
        email: {
          in: receivers.map(receiver => receiver.email),
        },
      },
    });

    const contactIdByEmail = new Map(contacts.map(contact => [contact.email, contact.id]));
    return receivers.map(receiver => ({
      to: {
        name: receiver.name,
        email: receiver.email,
      },
      substitutions: {
        ...((receiver.substitutions as Record<string, string> | undefined) ?? {}),
        contactId: contactIdByEmail.get(receiver.email),
      },
    }));
  }

  const subscriberLists = mailSending.subscriber_lists;

  const contacts = await prisma.contacts.findMany({
    where: {
      subscribers: {
        some: {
          subscriber_list_id: {
            in: subscriberLists.map(list => list.subscriber_list_id),
          },
        },
      },
      unsubscribes: {
        none: {
          list_ids: {
            hasEvery: subscriberLists.map(list => list.subscriber_list_id),
          },
        },
      },
    },
    skip: offset,
    take: batchSize,
    orderBy: {
      id: "asc",
    },
  });

  return contacts.map(contact => ({
    to: {
      name: contact.first_name ?? undefined,
      email: contact.email,
    },
    substitutions: {
      firstName: (contact.first_name ?? undefined)!,
      lastName: (contact.last_name ?? undefined)!,
      email: contact.email,
      contactId: contact.id,
      createdAt: UTC.parse(contact.created_at).formatIsoTime(),
    },
  }));
};

const mapContent = (mailSending: MailSendingEntity): MailContent => {
  if (mailSending.content_type === "direct") {
    return {
      type: "direct",
      content: mailSending.content!,
      textContent: mailSending.text_content ?? undefined,
      isTemplate: mailSending.is_template,
      substitutions: (mailSending.substitutions as Record<string, string> | undefined) ?? undefined,
    };
  }
  return {
    type: "template",
    templateId: mailSending.template_id!,
  };
};
