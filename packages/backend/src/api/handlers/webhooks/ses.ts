import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils.js";
import type { FastifyTypeProvider, FastifyTypeProviderDefault } from "fastify/types/type-provider.js";
import type { FastifyBaseLogger } from "fastify/types/logger.js";
import type { Router } from "../../../router/index.js";
import uuidv7 from "../../../helpers/uuidv7.js";
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { GLOBAL_UNSUBSCRIBE_LIST_ID } from "@mailtura/database";

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

      if (!mailLog?.contact_id) {
        return reply.status(200).send();
      }

      const tenantId = webhook.tenant_id;
      const contactId = mailLog.contact_id;

      if (eventType === "Bounce") {
        const bouncedAt = parseEventDate(notification.bounce?.timestamp, notification.mail?.timestamp);
        const reason = resolveSesBounceReason(notification);
        const bounceType = mapSesBounceType(notification.bounce?.bounceType);

        await prisma.$transaction(async tx => {
          await tx.bounces.upsert({
            where: {
              tenant_id_contact_id: {
                tenant_id: tenantId,
                contact_id: contactId,
              },
            },
            create: {
              id: uuidv7(),
              tenant_id: tenantId,
              contact_id: contactId,
              bounced_at: bouncedAt,
              reason,
              bounce_type: bounceType,
              created_at: UTC.now().toDate(),
              created_by: "webhook:ses",
            },
            update: {
              bounced_at: bouncedAt,
              reason,
              bounce_type: bounceType,
              updated_at: UTC.now().toDate(),
              updated_by: "webhook:ses",
            },
          });

          await tx.subscribers.updateMany({
            where: {
              tenant_id: tenantId,
              contact_id: contactId,
            },
            data: {
              status: "Bounced",
              updated_at: UTC.now().toDate(),
              updated_by: "webhook:ses",
            },
          });

          await tx.unsubscribes.upsert({
            where: {
              tenant_id_contact_id_subscriber_list_id: {
                tenant_id: tenantId,
                contact_id: contactId,
                subscriber_list_id: GLOBAL_UNSUBSCRIBE_LIST_ID,
              },
            },
            create: {
              id: uuidv7(),
              tenant_id: tenantId,
              contact_id: contactId,
              source: "Bounce",
              subscriber_list_id: GLOBAL_UNSUBSCRIBE_LIST_ID,
              unsubscribed_at: bouncedAt,
              created_at: UTC.now().toDate(),
              created_by: "webhook:ses",
            },
            update: {
              unsubscribed_at: bouncedAt,
              updated_at: UTC.now().toDate(),
              updated_by: "webhook:ses",
            },
          });
        });
      }

      if (eventType === "Complaint") {
        const complainedAt = parseEventDate(notification.complaint?.timestamp, notification.mail?.timestamp);
        const reason = resolveSesComplaintReason(notification);

        await prisma.$transaction(async tx => {
          await tx.subscribers.updateMany({
            where: {
              tenant_id: tenantId,
              contact_id: contactId,
            },
            data: {
              status: "Complaint",
              updated_at: UTC.now().toDate(),
              updated_by: "webhook:ses",
            },
          });

          await tx.unsubscribes.upsert({
            where: {
              tenant_id_contact_id_subscriber_list_id: {
                tenant_id: tenantId,
                contact_id: contactId,
                subscriber_list_id: GLOBAL_UNSUBSCRIBE_LIST_ID,
              },
            },
            create: {
              id: uuidv7(),
              tenant_id: tenantId,
              contact_id: contactId,
              source: "Other",
              subscriber_list_id: GLOBAL_UNSUBSCRIBE_LIST_ID,
              unsubscribed_at: complainedAt,
              created_at: UTC.now().toDate(),
              created_by: "webhook:ses",
            },
            update: {
              unsubscribed_at: complainedAt,
              updated_at: UTC.now().toDate(),
              updated_by: "webhook:ses",
            },
          });

          await tx.bounces.upsert({
            where: {
              tenant_id_contact_id: {
                tenant_id: tenantId,
                contact_id: contactId,
              },
            },
            create: {
              id: uuidv7(),
              tenant_id: tenantId,
              contact_id: contactId,
              bounced_at: complainedAt,
              reason,
              bounce_type: "Soft",
              created_at: UTC.now().toDate(),
              created_by: "webhook:ses",
            },
            update: {
              bounced_at: complainedAt,
              reason,
              bounce_type: "Soft",
              updated_at: UTC.now().toDate(),
              updated_by: "webhook:ses",
            },
          });
        });
      }

      return reply.status(200).send();
    }
  );
}
