import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils.js";
import type { FastifyTypeProvider, FastifyTypeProviderDefault } from "fastify/types/type-provider.js";
import type { FastifyBaseLogger } from "fastify/types/logger.js";
import type { Router } from "../../../router/index.js";
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { GLOBAL_UNSUBSCRIBE_LIST_ID, type PrismaTransaction } from "@mailtura/database";
import { uuidv7 } from "@mailtura/rpcmodel/helpers/index.js";

type SnsEnvelope = {
  Type?: "Notification" | "SubscriptionConfirmation" | "UnsubscribeConfirmation" | string;
  Message?: string;
  SubscribeURL?: string;
};

type SesBounceType = "Permanent" | "Transient" | "Undetermined" | string;

type SesNotification = {
  notificationType?: "Bounce" | "Complaint" | "Delivery" | string;
  eventType?: "Bounce" | "Complaint" | "Delivery" | string;
  mail?: {
    messageId?: string;
    timestamp?: string;
  };
  bounce?: {
    timestamp?: string;
    bounceType?: SesBounceType;
    bounceSubType?: string;
    bouncedRecipients?: Array<{
      emailAddress?: string;
      status?: string;
      diagnosticCode?: string;
    }>;
  };
  complaint?: {
    timestamp?: string;
    complaintFeedbackType?: string;
    complainedRecipients?: Array<{
      emailAddress?: string;
    }>;
  };
};

const parseJson = <T>(value: Buffer | string): T | undefined => {
  const text = typeof value === "string" ? value : value.toString("utf-8");
  if (!text || text.trim().length === 0) return undefined;
  return JSON.parse(text) as T;
};

const parseEventDate = (...value: Array<string | undefined>): Date => {
  for (const item of value) {
    if (!item) continue;
    const parsed = new Date(item);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return UTC.now().toDate();
};

const mapSesBounceType = (bounceType?: SesBounceType): "Hard" | "Soft" => {
  return bounceType === "Permanent" ? "Hard" : "Soft";
};

const resolveSesBounceReason = (notification: SesNotification): string => {
  const recipient = notification.bounce?.bouncedRecipients?.[0];
  return (
    recipient?.diagnosticCode ??
    recipient?.status ??
    notification.bounce?.bounceSubType ??
    notification.notificationType ??
    "SES bounce"
  );
};

const resolveSesComplaintReason = (notification: SesNotification): string => {
  return notification.complaint?.complaintFeedbackType ?? notification.notificationType ?? "SES complaint";
};

const updateBounce = async (
  tx: PrismaTransaction,
  tenantId: string,
  email: string,
  bounceType: "Hard" | "Soft",
  bounceReason: string,
  eventTime: Date
) => {
  tx.bounces.upsert({
    where: {
      tenant_id_email: {
        tenant_id: tenantId,
        email,
      },
    },
    create: {
      id: uuidv7(),
      tenant_id: tenantId,
      email,
      bounced_at: eventTime,
      bounce_type: bounceType,
      reason: bounceReason,
      created_at: new Date(),
      created_by: "webhook:ses",
    },
    update: {
      bounced_at: eventTime,
      bounce_type: bounceType,
      reason: bounceReason,
      updated_at: new Date(),
      updated_by: "webhook:ses",
    },
  });
};

const updateSubscriberStatus = async (
  tx: PrismaTransaction,
  tenantId: string,
  email: string,
  status: "Bounced" | "Complaint"
) => {
  const contact = await tx.contacts.findUnique({
    where: {
      tenant_id_email: {
        tenant_id: tenantId,
        email,
      },
    },
  });

  if (contact) {
    await tx.subscribers.updateMany({
      where: {
        tenant_id: tenantId,
        contact_id: contact.id,
      },
      data: {
        status,
        updated_at: UTC.now().toDate(),
        updated_by: "webhook:ses",
      },
    });
  }
};

const updateUnsubscribes = async (
  tx: PrismaTransaction,
  tenantId: string,
  email: string,
  source: "Bounce" | "Complaint",
  eventTime: Date
) => {
  await tx.unsubscribes.upsert({
    where: {
      tenant_id_email_unsubscribe_list_id: {
        tenant_id: tenantId,
        email: email,
        unsubscribe_list_id: GLOBAL_UNSUBSCRIBE_LIST_ID,
      },
    },
    create: {
      id: uuidv7(),
      tenant_id: tenantId,
      email: email,
      source: source,
      unsubscribe_list_id: GLOBAL_UNSUBSCRIBE_LIST_ID,
      unsubscribed_at: eventTime,
      created_at: UTC.now().toDate(),
      created_by: "webhook:ses",
    },
    update: {
      unsubscribed_at: eventTime,
      updated_at: UTC.now().toDate(),
      updated_by: "webhook:ses",
    },
  });
};

export function sesRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  const prisma = router.context().prisma;

  router.post<{ Params: { webhook_id: string } }>(
    "/:webhook_id",
    {
      schema: {
        hide: true,
      },
    },
    async (request, reply) => {
      const webhookId = request.params.webhook_id;
      const webhook = await prisma.webhooks.findUnique({
        where: {
          id: webhookId,
        },
      });

      if (!webhook) {
        console.error(`Webhook ${webhookId} not found`);
        return reply.status(404).send();
      }

      if (webhook.provider_id !== "ses") {
        console.error(`Webhook ${webhookId} is not an SES webhook`);
        return reply.status(400).send();
      }

      const body = request.body as Buffer | string | Record<string, unknown>;
      const envelope =
        Buffer.isBuffer(body) || typeof body === "string"
          ? parseJson<SnsEnvelope>(body)
          : (body as SnsEnvelope | undefined);

      if (!envelope) {
        return reply.status(200).send();
      }

      const messageType = (request.headers["x-amz-sns-message-type"] as string | undefined) ?? envelope.Type;
      if (messageType === "SubscriptionConfirmation") {
        if (typeof envelope.SubscribeURL === "string" && envelope.SubscribeURL.length > 0) {
          try {
            await fetch(envelope.SubscribeURL, { method: "GET" });
          } catch (error) {
            console.error(`Failed to confirm SES SNS subscription for webhook ${webhookId}:`, error);
          }
        }
        return reply.status(200).send();
      }

      if (messageType !== "Notification") {
        return reply.status(200).send();
      }

      const notification = envelope.Message ? parseJson<SesNotification>(envelope.Message) : undefined;
      if (!notification) {
        return reply.status(200).send();
      }

      const eventType = notification.notificationType ?? notification.eventType;
      const providerMailId = notification.mail?.messageId;
      if (!providerMailId) {
        return reply.status(200).send();
      }

      const mailLog = await prisma.mail_logs.findUnique({
        where: {
          provider_id_provider_mail_id: {
            provider_id: "ses",
            provider_mail_id: providerMailId,
          },
        },
      });

      if (!mailLog) {
        return reply.status(200).send();
      }

      const tenantId = webhook.tenant_id;
      if (eventType === "Bounce") {
        const bouncedAt = parseEventDate(notification.bounce?.timestamp, notification.mail?.timestamp);
        const reason = resolveSesBounceReason(notification);
        const bounceType = mapSesBounceType(notification.bounce?.bounceType);

        await prisma.$transaction(async tx => {
          await updateSubscriberStatus(tx, tenantId, mailLog.email, "Bounced");
          await updateUnsubscribes(tx, tenantId, mailLog.email, "Bounce", bouncedAt);
          await updateBounce(tx, tenantId, mailLog.email, bounceType, reason, bouncedAt);
        });
      } else if (eventType === "Complaint") {
        const complainedAt = parseEventDate(notification.complaint?.timestamp, notification.mail?.timestamp);
        const reason = resolveSesComplaintReason(notification);

        await prisma.$transaction(async tx => {
          await updateSubscriberStatus(tx, tenantId, mailLog.email, "Complaint");
          await updateUnsubscribes(tx, tenantId, mailLog.email, "Complaint", complainedAt);
        });
      }

      return reply.status(200).send();
    }
  );
}
