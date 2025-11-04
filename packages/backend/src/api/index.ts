import type { FastifyInstance } from "fastify";
import {
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
  Subscriber,
  SubscriberList,
  SubscriberStatus,
  Template,
  Tenant,
  Unsubscribe,
  UnsubscribeSource,
  User,
} from "@mailtura/rpcmodel/lib/models";
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
import {
  AuthSession,
  AuthUser,
  GetSessionResponse,
  PasswordResetResponse,
  SignInEmail,
  SignInEmailResponse,
  SignInSocial,
  SignInSocialResponse,
  SignUpEmail,
  SignUpEmailResponse,
  VerifyEmailResponse,
} from "@mailtura/rpcmodel/lib/auth/index.js";
import { profileRoutes } from "./handlers/profile.js";

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

  app.addSchema(SignInEmail);
  app.addSchema(SignInEmailResponse);
  app.addSchema(GetSessionResponse);
  app.addSchema(VerifyEmailResponse);
  app.addSchema(PasswordResetResponse);
  app.addSchema(SignInSocial);
  app.addSchema(SignInSocialResponse);
  app.addSchema(SignUpEmail);
  app.addSchema(SignUpEmailResponse);
  app.addSchema(AuthUser);
  app.addSchema(AuthSession);
}

export function registerRoutes<
  RawServer extends RawServerBase = RawServerDefault,
  RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger,
>(router: Router<RawServer, RawRequest, RawReply, TypeProvider, Logger>) {
  router.route("/tenants", tenantRoutes);
  router.route("/", profileRoutes);
}
