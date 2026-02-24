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
import { buildSubscriptionContext } from "@mailtura/database";

interface UnsubscribeQuery {
  contact: string;
  list?: string;
  global?: string;
}

interface HtmlReply {
  status: (code: number) => {
    type: (contentType: string) => {
      send: (payload: string) => unknown;
    };
  };
}

export function publicUnsubscribeRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  const { prisma } = router.context();

  const querySchema = Type.Object({
    contact: Type.String({ format: "uuid" }),
    list: Type.Optional(Type.String({ format: "uuid" })),
    global: Type.Optional(Type.String()),
  });

  router.get<{ Querystring: UnsubscribeQuery }>(
    "/",
    {
      schema: {
        tags: ["public"],
        querystring: querySchema,
      },
    },
    async (request, reply) => {
      const context = await buildSubscriptionContext(prisma, request.query.contact);
      if (!context) {
        return renderErrorPage(reply, 404, "Unknown contact.");
      }

      const selectedListId = request.query.list;
      if (selectedListId) {
        const selectedList = context.subscriptions.find(list => list.id === selectedListId);
        if (!selectedList) {
          return renderMessagePage(
            reply,
            "Already unsubscribed",
            "This contact is not subscribed to that list anymore."
          );
        }

        return renderSingleListPage(reply, context.email, request.query.contact, selectedList);
      }

      return renderPreferencesPage(reply, context.email, request.query.contact, context.subscriptions);
    }
  );

  router.post<{ Querystring: UnsubscribeQuery }>(
    "/",
    {
      schema: {
        tags: ["public"],
        querystring: querySchema,
      },
    },
    async (request, reply) => {
      const selectedListId = request.query.list;
      const globalUnsubscribe = request.query.global?.toLowerCase() === "true";

      const context = await buildSubscriptionContext(prisma, request.query.contact);
      if (!context) {
        return renderErrorPage(reply, 404, "Unknown contact.");
      }

      const selectedListIds = (
        selectedListId ? context.subscriptions.filter(list => list.id === selectedListId) : context.subscriptions
      ).map(list => list.id);

      if (selectedListId && selectedListIds.length === 0) {
        return renderMessagePage(reply, "Already unsubscribed", "This contact is not subscribed to that list anymore.");
      }

      if (selectedListId) {
        const selectedList = context.subscriptions.find(list => list.id === selectedListId);
        if (!selectedList) {
          return renderMessagePage(
            reply,
            "Already unsubscribed",
            "This contact is not subscribed to that list anymore."
          );
        }

        await context.unsubscribeLists(selectedListIds, "public-unsubscribe");
        return renderMessagePage(reply, "Unsubscribed", `You have been unsubscribed from "${selectedList.name}".`);
      }

      if (globalUnsubscribe) {
        await context.unsubscribeGlobal("public-unsubscribe");
        return renderMessagePage(
          reply,
          "Preferences updated",
          "You have been unsubscribed from all subscription lists."
        );
      }

      return reply.redirect("/unsubscribe?contact=" + encodeURIComponent(request.query.contact), 303);
    }
  );
}

const renderSingleListPage = (
  reply: HtmlReply,
  email: string,
  contactId: string,
  list: { id: string; name: string }
) => {
  return reply
    .status(200)
    .type("text/html")
    .send(
      renderPage(
        "Unsubscribe",
        `<p>You are unsubscribing <strong>${escapeHtml(email)}</strong> from <strong>${escapeHtml(list.name)}</strong>.</p>${renderUnsubscribeButton(list.id, contactId, "Unsubscribe from this list")}`
      )
    );
};

const renderPreferencesPage = (
  reply: HtmlReply,
  email: string,
  contactId: string,
  lists: Array<{ id: string; name: string }>
) => {
  const listMarkup = (lists ?? []).map(
    list =>
      `<li><span>${escapeHtml(list.name)}</span>${renderUnsubscribeButton(list.id, contactId, "Unsubscribe")}</li>`
  );

  const markup =
    listMarkup.length === 0
      ? "<p>You are currently not subscribed to any list.</p>"
      : `<ul>${listMarkup.join("")}</ul>`;

  return reply
    .status(200)
    .type("text/html")
    .send(
      renderPage(
        "Subscription preferences",
        `<p>Manage subscriptions for <strong>${escapeHtml(email)}</strong>.</p>
        ${markup}
        ${renderUnsubscribeButton(true, contactId, "Unsubscribe from all")}`
      )
    );
};

const renderUnsubscribeButton = (subscriberlistIdOrGlobal: string | true, contactId: string, title: string) => {
  const encodedContactId = encodeURIComponent(contactId);
  const encodedSubscriberListId = encodeURIComponent(subscriberlistIdOrGlobal === true ? "" : subscriberlistIdOrGlobal);
  const isGlobal = subscriberlistIdOrGlobal === true;

  return `
<form method="POST" enctype="multipart/form-data" action="/unsubscribe?contact=${encodedContactId}&${isGlobal ? "global=true" : "list=" + encodedSubscriberListId}">
<button type="submit">${title}</button>
</form>`;
};

const renderMessagePage = (reply: HtmlReply, title: string, message: string) => {
  return reply
    .status(200)
    .type("text/html")
    .send(renderPage(title, `<p>${escapeHtml(message)}</p>`));
};

const renderErrorPage = (reply: HtmlReply, status: number, message: string) => {
  return reply
    .status(status)
    .type("text/html")
    .send(renderPage("Unsubscribe", `<p>${escapeHtml(message)}</p>`));
};

const renderPage = (title: string, body: string) => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 0; background: #f3f4f6; color: #111827; }
      .container { max-width: 720px; margin: 48px auto; padding: 24px; }
      .card { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
      h1 { margin-top: 0; font-size: 1.5rem; }
      ul { list-style: none; padding: 0; margin: 16px 0; }
      li { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
      form { margin: 12px 0 0; }
      button { border: none; background: #2563eb; color: white; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; }
      button:hover { background: #1d4ed8; }
    </style>
  </head>
  <body>
    <main class="container">
      <section class="card">
        <h1>${escapeHtml(title)}</h1>
        ${body}
      </section>
    </main>
  </body>
</html>`;
};

const escapeHtml = (value: string) => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
};
