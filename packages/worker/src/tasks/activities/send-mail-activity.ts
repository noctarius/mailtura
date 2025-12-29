import type { SendMailArguments } from "@mailtura/rpcmodel/tasks/index.js";
import { log } from "@temporalio/activity";
import { MailSendingEntity, MailSendingReceiverEntity, newPrismaClient, PrismaType } from "@mailtura/database";
import { newMailTransport } from "../../mails/index.js";
import { type MailContent, type MailRecipient } from "@mailtura/rpcmodel/mails/index.js";
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

type MailSending = MailSendingEntity & {
  mail_receivers: MailSendingReceiverEntity[];
  subscriber_lists: { subscriber_list_id: string }[];
};

export async function sendMailBatch(args: SendMailArguments): Promise<number> {
  const prisma = newPrismaClient(new PrismaPg({ connectionString }));

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

  const transport = newMailTransport(mailConfig);
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
    return receivers.map(receiver => ({
      to: {
        name: receiver.name,
        email: receiver.email,
      },
      substitutions: (receiver.substitutions as Record<string, string> | undefined) ?? undefined,
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
