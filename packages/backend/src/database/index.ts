import {
  type activities,
  type activity_status,
  type api_keys,
  type bounce_type,
  type bounces,
  type campaign_status,
  type campaign_type,
  type campaigns,
  type contacts,
  type event_type,
  PrismaClient,
  type subscriber_lists,
  type subscriber_status,
  type subscribers,
  type template_properties,
  type templates,
  type tenants,
  type unsubscribe_source,
  type unsubscribes,
  type users,
} from "../../generated/prisma";

const prisma = new PrismaClient().$extends({
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

export default prisma;
