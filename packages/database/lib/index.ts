import {
  type accounts,
  type activities,
  type activity_status,
  type api_keys,
  type bounce_type,
  type bounces,
  type campaign_status,
  type campaign_type,
  type campaigns,
  type contact_imports,
  type contacts,
  type event_type,
  type files,
  type mail_sendings,
  type mail_url_proxies,
  Prisma,
  PrismaClient,
  type roles,
  type subscriber_lists,
  type subscriber_status,
  type subscribers,
  type template_properties,
  type templates,
  type tenants,
  type unsubscribe_source,
  type unsubscribes,
  type users,
} from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { createError } from "@mailtura/rpcmodel/lib/api/errors.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter }).$extends({
  query: {
    contacts: {
      async $allOperations({ operation, args, query }) {
        if (
          operation !== "findUnique" &&
          operation !== "findMany" &&
          operation !== "findFirst" &&
          operation !== "findFirstOrThrow" &&
          operation !== "findUniqueOrThrow"
        ) {
          return query(args);
        }

        args.include = {
          ...args.include,
          _count: {
            ...(typeof args.include?._count === "object" ? args.include?._count : {}),
            select: {
              ...(typeof args.include?._count === "object" && typeof args.include?._count?.select === "object"
                ? args.include?._count.select
                : {}),
              bounces: true,
              unsubscribes: true,
            },
          },
          subscribers: {
            select: {
              subscriber_list_id: true,
            },
            where: {
              status: "Subscribed",
            },
          },
        };
        return query(args);
      },
    },
    subscriber_lists: {
      async $allOperations({ operation, args, query }) {
        if (
          operation !== "findUnique" &&
          operation !== "findMany" &&
          operation !== "findFirst" &&
          operation !== "findFirstOrThrow" &&
          operation !== "findUniqueOrThrow"
        ) {
          return query(args);
        }

        args.include = {
          ...args.include,
          _count: {
            ...(typeof args.include?._count === "object" ? args.include?._count : {}),
            select: {
              ...(typeof args.include?._count === "object" && typeof args.include?._count?.select === "object"
                ? args.include?._count.select
                : {}),
              subscribers: true,
            },
          },
        };
        return query(args);
      },
    },
  },
});

export function handlePrismaError(err: unknown) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        throw createError(409, `Conflict: ${err.meta?.target} already exists`);
      case "P2003":
        throw createError(400, "Foreign key constraint failed");
      case "P2011":
        throw createError(400, `Null constraint violation for ${err.meta?.target}`);
      case "P2020":
        throw createError(400, `Value out of range for ${err.meta?.target}`);
      case "P2025":
        throw createError(404, "Not found");
    }
  }
}

export type TenantEntity = tenants;
export type ContactEntity = contacts & { _count?: { bounces?: number; unsubscribes?: number } };
export type CampaignStatusEnum = campaign_status;
export type CampaignTypeEnum = campaign_type;
export type CampaignEntity = campaigns;
export type ActivityStatusEnum = activity_status;
export type EventTypeEnum = event_type;
export type ActivityEntity = activities;
export type BounceTypeEnum = bounce_type;
export type BounceEntity = bounces;
export type SubscriberStatusEnum = subscriber_status;
export type SubscriberEntity = subscribers;
export type SubscriberListEntity = subscriber_lists & { _count?: { subscribers?: number } };
export type UnsubscribeSourceEnum = unsubscribe_source;
export type UnsubscribeEntity = unsubscribes;
export type UserEntity = users;
export type ApiKeyEntity = api_keys;
export type TemplateEntity = templates & { properties: template_properties[] };
export type ContactImportEntity = contact_imports;
export type FileEntity = files;
export type RoleEntity = roles;
export type AccountEntity = accounts;
export type MailSendingEntity = mail_sendings;
export type MailUrlProxyEntity = mail_url_proxies;

export default prisma;
