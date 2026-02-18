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
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { createError } from "@mailtura/rpcmodel/api/errors.js";

export function trackingRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  const { prisma } = router.context();

  router.get<{ Params: { tracking_id: string } }>(
    "/:tracking_id",
    {
      schema: {
        hide: true,
        params: Type.Object({
          tracking_id: Type.String({ format: "uuid" }),
        }),
        response: {
          301: Type.Null(),
          404: Type.Ref("ErrorResponse"),
        },
      },
    },
    async (request, reply) => {
      const trackingId = request.params.tracking_id;
      const proxy = await prisma.mail_url_proxies.findUnique({
        where: { id: trackingId },
      });

      if (!proxy) {
        throw createError(404, "Tracking URL not found");
      }

      // Log the tracking open on existing mail tracking counters.
      if (proxy.contact_id) {
        const now = UTC.now().toDate();
        await prisma.$transaction([
          prisma.mail_logs.updateMany({
            where: {
              tenant_id: proxy.tenant_id,
              contact_id: proxy.contact_id,
            },
            data: {
              opens: {
                increment: 1,
              },
              updated_at: now,
              updated_by: "tracking",
            },
          }),
          prisma.activities.updateMany({
            where: {
              tenant_id: proxy.tenant_id,
              contact_id: proxy.contact_id,
            },
            data: {
              status: "Opened",
              last_event_type: "Opened",
              last_event_received_at: now,
              opens: {
                increment: 1,
              },
              updated_at: now,
              updated_by: "tracking",
            },
          }),
        ]);
      }

      return reply.code(301).header("Location", proxy.from).send();
    }
  );
}
