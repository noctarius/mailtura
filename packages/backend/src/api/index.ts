import type { FastifyInstance } from "fastify";
import {
  Account,
  Activity,
  ActivityStatus,
  ApiKey,
  Bounce,
  BounceType,
  Campaign,
  CampaignStatus,
  CampaignType,
  Contact,
  ContactImport,
  EmailMetricsChartData,
  ErrorResponse,
  EventType,
  File,
  PerformanceMetricsChartData,
  Role,
  Subscriber,
  SubscriberList,
  SubscriberStatus,
  Template,
  Tenant,
  Unsubscribe,
  UnsubscribeSource,
  User,
} from "@mailtura/rpcmodel/api/index.js";
import { type Router } from "../router/index.js";
import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils.js";
import type { FastifyTypeProvider, FastifyTypeProviderDefault } from "fastify/types/type-provider.js";
import type { FastifyBaseLogger } from "fastify/types/logger.js";
import { tenantRoutes } from "./handlers/tenants.js";
import { profileRoutes } from "./handlers/profile.js";
import { webhookRoutes } from "./handlers/webhooks/index.js";
import { PaginationMetadata } from "@mailtura/rpcmodel/pagination/index.js";
import { Mail } from "@mailtura/rpcmodel/mails/index.js";

export default function registerModelSchema(app: FastifyInstance) {
  app.addSchema(ErrorResponse);
  app.addSchema(Tenant);
  app.addSchema(Contact);
  app.addSchema(CampaignStatus);
  app.addSchema(CampaignType);
  app.addSchema(Campaign);
  app.addSchema(ActivityStatus);
  app.addSchema(EventType);
  app.addSchema(Activity);
  app.addSchema(BounceType);
  app.addSchema(Bounce);
  app.addSchema(SubscriberStatus);
  app.addSchema(Subscriber);
  app.addSchema(SubscriberList);
  app.addSchema(UnsubscribeSource);
  app.addSchema(Unsubscribe);
  app.addSchema(Template);
  app.addSchema(EmailMetricsChartData);
  app.addSchema(PerformanceMetricsChartData);
  app.addSchema(User);
  app.addSchema(ApiKey);
  app.addSchema(ContactImport);
  app.addSchema(File);
  app.addSchema(Role);
  app.addSchema(Account);
  app.addSchema(PaginationMetadata);
  app.addSchema(Mail);
}

export function registerRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.route("/tenants", tenantRoutes);
  router.route("/profile", profileRoutes);
  router.route("/webhooks", webhookRoutes, false, true);
}
