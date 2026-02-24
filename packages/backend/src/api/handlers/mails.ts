import { Type } from "typebox";
import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils.js";
import type { FastifyTypeProvider, FastifyTypeProviderDefault } from "fastify/types/type-provider.js";
import type { FastifyBaseLogger } from "fastify/types/logger.js";
import type { Router } from "../../router/index.js";
import { Prisma } from "@mailtura/database";
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { CreateSingleSend, CreateSingleSendResponse } from "@mailtura/rpcmodel/api/request-response.js";
import { isDirectContent, isTemplatedContent } from "@mailtura/rpcmodel/mails/index.js";
import { createError } from "@mailtura/rpcmodel/api/errors.js";
import { uuidv7 } from "@mailtura/rpcmodel/helpers/index.js";
import { resolveRecipients } from "@mailtura/mails/lib/subscriptions/index.js";

export function mailRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  const { prisma, taskManager } = router.context();
  router.post<{
    Params: { tenant_id: string };
    Body: CreateSingleSend;
    Reply: CreateSingleSendResponse;
  }>(
    "/single-send",
    {
      schema: {
        tags: ["mails"],
        body: CreateSingleSend,
        response: {
          201: CreateSingleSendResponse,
          400: Type.Ref("ErrorResponse"),
          401: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const tenantId = request.params.tenant_id;
      const {
        mailConfigId,
        mailSenderId,
        subject,
        content,
        recipients,
        subscriberListIds,
        substitutions,
        unsubscribeListId,
      } = request.body;

      if ((!recipients || recipients.length === 0) && (!subscriberListIds || subscriberListIds.length === 0)) {
        throw createError(400, "Either recipients or subscriberListIds must be provided");
      }
      if (recipients && subscriberListIds && recipients.length > 0 && subscriberListIds.length > 0) {
        throw createError(400, "Provide either recipients or subscriberListIds, not both");
      }

      // Validate existence of mail config and sender and that they belong to the tenant
      const [mailConfig, mailSender] = await Promise.all([
        prisma.mail_configs.findFirst({ where: { id: mailConfigId, tenant_id: tenantId } }),
        prisma.mail_senders.findFirst({ where: { id: mailSenderId, tenant_id: tenantId } }),
      ]);
      if (!mailConfig) throw createError(400, "Invalid mailConfigId");
      if (!mailSender) throw createError(400, "Invalid mailSenderId");

      // Prepare mail_sendings create payload
      const data: Prisma.mail_sendingsCreateInput = {
        id: uuidv7(),
        tenant_id: tenantId,
        mail_config: {
          connect: {
            id: mailConfigId,
          },
        },
        mail_sender: {
          connect: {
            id: mailSenderId,
          },
        },
        subject,
        content_type: content.type,
        is_template: isDirectContent(content) ? (content.isTemplate ?? false) : false,
        substitutions: substitutions ?? {},
        created_at: UTC.now().toDate(),
        created_by: "api",
      };

      if (isDirectContent(content)) {
        data.content = content.content;
        data.text_content = content.textContent ?? null;
      } else if (isTemplatedContent(content)) {
        data.template_id = content.templateId;
      } else {
        throw createError(400, "Unsupported content type");
      }

      return prisma.$transaction(async tx => {
        const mailSending = await tx.mail_sendings.create({
          data,
        });

        const resolvedRecipients = await resolveRecipients(
          prisma,
          tenantId,
          mailSending.id,
          {
            recipients: recipients,
            subscriberListIds,
          },
          unsubscribeListId
        );

        await tx.mail_sending_receivers.createMany({
          data: resolvedRecipients.map(recipient => ({
            ...recipient,
            substitutions: recipient.substitutions ?? {},
          })),
        });

        await taskManager.createSendMailJob(tenantId, mailSending.id);

        const response: CreateSingleSendResponse = { id: mailSending.id };
        return reply.status(201).send(response);
      });
    }
  );
}
