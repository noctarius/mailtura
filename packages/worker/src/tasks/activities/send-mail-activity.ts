import type { SendMailArguments } from "@mailtura/rpcmodel/tasks/index.js";
import { log } from "@temporalio/activity";
import {
  MailSenderEntity,
  MailSendingEntity,
  MailSendingReceiverEntity,
  mapTemplate,
  newPrismaClient,
  newPrismaPg,
  PrismaType,
} from "@mailtura/database";
import { DirectMailRecipient, MailLogEntry, newMailTransport, TransportConfig, UrlProxy } from "@mailtura/mails";
import { type MailContent } from "@mailtura/rpcmodel/mails/index.js";
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { getSystemConfig } from "../../helper/system-config.js";
import { uuidv7 } from "@mailtura/rpcmodel/helpers/index.js";
import { TemplateResolver } from "@mailtura/contentcompiler";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

type MailSending = MailSendingEntity & {
  mail_receivers: MailSendingReceiverEntity[];
};

const buildTemplateResolver = (prisma: PrismaType, tenantId: string): TemplateResolver => {
  return async (templateId: string) => {
    const template = await prisma.templates.findUnique({
      where: {
        tenant_id: tenantId,
        id: templateId,
      },
    });
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
          email: entry.email,
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
    templateResolver: buildTemplateResolver(prisma, tenantId),
    urlRelocationStorage: buildUrlRelocationStorage(prisma, tenantId),
    mailLogStorage: buildMailLogStorage(prisma, tenantId),
  };

  const transport = newMailTransport(mailConfig, transportConfig);
  if (!transport) {
    throw new Error(`Mail transport not found for mail sending ${mailSendingId} on tenant ${tenantId}`);
  }

  const recipients = await getMailReceiverBatch(prisma, mailSending, mailSender, 0, batchSize);
  await transport.send({
    from,
    subject: mailSending.subject,
    content: mapContent(mailSending),
    recipients,
    features: {},
  });

  return 0;
}

const getMailReceiverBatch = async (
  prisma: PrismaType,
  mailSending: MailSending,
  mailSender: MailSenderEntity,
  offset: number,
  batchSize: number
): Promise<DirectMailRecipient[]> => {
  const mailSendingReceivers = await prisma.mail_sending_receivers.findMany({
    where: {
      mail_sending_id: mailSending.id,
    },
    skip: offset,
    take: batchSize,
    orderBy: {
      created_by: "asc",
    },
  });

  return mailSendingReceivers.map(receiver => ({
    to: { email: receiver.email, name: receiver.name },
    cc: receiver.cc.map(cc => ({ email: cc })),
    replyTo: { name: mailSender.name, email: mailSender.reply_to ?? mailSender.email },
    bcc: receiver.bcc.map(bcc => ({ email: bcc })),
    substitutions: receiver.substitutions as Record<string, string> | undefined,
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
