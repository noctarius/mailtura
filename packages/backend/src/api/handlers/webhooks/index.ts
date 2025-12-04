import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils.js";
import type { FastifyTypeProvider, FastifyTypeProviderDefault } from "fastify/types/type-provider.js";
import type { FastifyBaseLogger } from "fastify/types/logger.js";
import type { Router } from "../../../router/index.js";
import { EventWebhook } from "@sendgrid/eventwebhook";
import type { SendgridConfig } from "@mailtura/rpcmodel/mails/index.js";
import { Cacheable } from "cacheable";
import { ResponseError } from "@mailtura/frontend/src/services/adapters/types.js";
import prisma from "@mailtura/database";

/**
 * Thanks to https://gist.github.com/rndD/bbcde87f397e85b5c95b3e3c7b95cd4a 🙏
 */
type BaseSendgridEvent = {
  "email": string;
  "timestamp": number;
  "smtp-id": string;
  "category": string | string[];
  "sg_event_id": string;
  "sg_message_id": string;
} & Partial<Record<string, string>>; // custom args. @see https://docs.sendgrid.com/for-developers/sending-email/unique-arguments

type SendgridProcessedEvent = BaseSendgridEvent & {
  event: "processed";
};

type SendgridDeliveredEvent = BaseSendgridEvent & {
  event: "delivered";
  ip: string;
  response: string;
};

type SendgridDeferredEvent = BaseSendgridEvent & {
  event: "deferred";
  ip: string;
  response: string;
  attempt: string;
};

type SendgridBounceEvent = BaseSendgridEvent & {
  event: "bounce";
  ip: string;
  bounce_classification: string;
  reason: string;
  status: string;
};

type SendgridDroppedEvent = BaseSendgridEvent & {
  event: "dropped";
  reason: string;
  status: string;
};

type SendgridSpamReportEvent = BaseSendgridEvent & {
  event: "spamreport";
};

export type SendgridEvent =
  | SendgridProcessedEvent
  | SendgridDeliveredEvent
  | SendgridDeferredEvent
  | SendgridBounceEvent
  | SendgridDroppedEvent
  | SendgridSpamReportEvent;

const verifier = new EventWebhook();
const configCache = new Cacheable();

const getMailConfig = configCache.wrap(
  async (mailConfigId: string) => {
    const mailConfig = await prisma.mail_configs.findUnique({
      where: {
        id: mailConfigId,
      },
    });

    if (!mailConfig) {
      throw new ResponseError(`Mail config for webhook ${mailConfigId} not found`, 404);
    }

    if (mailConfig.type !== "sendgrid") {
      throw new ResponseError(`Mail config for webhook ${mailConfigId} is not a Sendgrid mail config`, 400);
    }
    return mailConfig.config as SendgridConfig;
  },
  { ttl: 5 * 60 }
);

export function webhookRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.post<{ Params: { webhook_id: string } }>(
    "/sendgrid/:webhook_id",
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

      if (webhook.provider_id !== "sendgrid") {
        console.error(`Webhook ${webhookId} is not a Sendgrid webhook`);
        return reply.status(400).send();
      }

      const config = await getMailConfig(webhook.mail_config_id);

      const payload = request.body as Buffer;
      const signature = request.headers["X-Twilio-Email-Event-Webhook-Signature"] as string;
      const timestamp = request.headers["X-Twilio-Email-Event-Webhook-Timestamp"] as string;
      const publicKey = verifier.convertPublicKeyToECDSA(config.verificationKey);
      if (!verifier.verifySignature(publicKey, payload, signature, timestamp)) {
        return reply.status(401).send("Invalid signature");
      }

      const event = JSON.parse(payload.toString("utf-8")) as SendgridEvent;
      switch (event.event) {
        case "bounce":

      }

      console.log("Sendgrid webhook payload:", payload);
      return reply.status(200).send();
    }
  );
}
