import type { Static } from "typebox";
import { Type } from "typebox";

export const ErrorResponse = //
  Type.Object(
    {
      message: Type.String(),
    },
    {
      $id: "ErrorResponse",
      description: "An error response",
      additionalProperties: false,
      required: ["message"],
    }
  );

export type ErrorResponse = Static<typeof ErrorResponse>;

export const Tenant = //
  Type.Object(
    {
      id: Type.String({ format: "uuid" }),
      name: Type.String(),
      createdAt: Type.String({ format: "date-time" }),
      createdBy: Type.String(),
      updatedAt: Type.Optional(Type.String({ format: "date-time" })),
      updatedBy: Type.Optional(Type.String()),
    },
    {
      $id: "Tenant",
      description: "A tenant in the system",
      additionalProperties: false,
      required: ["id", "name", "createdAt", "createdBy"],
    }
  );

export type Tenant = Static<typeof Tenant>;

export const Contact = //
  Type.Object(
    {
      id: Type.String({ format: "uuid" }),
      email: Type.String(),
      firstName: Type.Optional(Type.String()),
      lastName: Type.Optional(Type.String()),
      lastActivity: Type.Optional(Type.String({ format: "date-time" })),
      listIds: Type.Array(Type.String({ format: "uuid" })),
      status: Type.String(),
      createdAt: Type.String({ format: "date-time" }),
      createdBy: Type.String(),
      updatedAt: Type.Optional(Type.String({ format: "date-time" })),
      updatedBy: Type.Optional(Type.String()),
    },
    {
      $id: "Contact",
      description: "A contact in the system",
      additionalProperties: false,
      required: ["id", "email", "listIds", "status", "createdAt", "createdBy"],
    }
  );

export type Contact = Static<typeof Contact>;

export const CampaignStatus = //
  Type.Union(
    [
      Type.Literal("Active"),
      Type.Literal("Scheduled"),
      Type.Literal("Completed"),
      Type.Literal("Draft"),
      Type.Literal("Paused"),
      Type.Literal("Cancelled"),
    ],
    {
      $id: "CampaignStatus",
      description: "The status of a campaign",
      default: "Draft",
    }
  );

export type CampaignStatus = Static<typeof CampaignStatus>;

export const CampaignType = //
  Type.Union([Type.Literal("OneTime"), Type.Literal("Automated")], {
    $id: "CampaignType",
    description: "The type of a campaign",
    default: "OneTime",
  });

export type CampaignType = Static<typeof CampaignType>;

export const Campaign = //
  Type.Object(
    {
      id: Type.String({ format: "uuid" }),
      name: Type.String(),
      status: CampaignStatus,
      type: CampaignType,
      recipients: Type.Integer({ minimum: 0 }),
      sent: Type.Integer({ minimum: 0 }),
      delivered: Type.Integer({ minimum: 0 }),
      opened: Type.Integer({ minimum: 0 }),
      clicked: Type.Integer({ minimum: 0 }),
      deliveryRate: Type.Number({ minimum: 0, maximum: 1 }),
      openRate: Type.Number({ minimum: 0, maximum: 1 }),
      clickRate: Type.Number({ minimum: 0, maximum: 1 }),
      createdAt: Type.String({ format: "date-time" }),
      createdBy: Type.String(),
      updatedAt: Type.Optional(Type.String({ format: "date-time" })),
      updatedBy: Type.Optional(Type.String()),
    },
    {
      $id: "Campaign",
      description: "A campaign in the system",
      additionalProperties: false,
      required: [
        "id",
        "name",
        "status",
        "type",
        "recipients",
        "sent",
        "delivered",
        "opened",
        "clicked",
        "deliveryRate",
        "openRate",
        "clickRate",
        "createdAt",
        "createdBy",
      ],
    }
  );

export type Campaign = Static<typeof Campaign>;

export const ActivityStatus = //
  Type.Union(
    [
      Type.Literal("Delivered"),
      Type.Literal("Opened"),
      Type.Literal("Clicked"),
      Type.Literal("Pending"),
      Type.Literal("Scheduled"),
      Type.Literal("Bounced"),
      Type.Literal("Failed"),
    ],
    {
      $id: "ActivityStatus",
      description: "The status of an activity",
      default: "Pending",
    }
  );

export type ActivityStatus = Static<typeof ActivityStatus>;

export const EventType = //
  Type.Union(
    [
      Type.Literal("Queued"),
      Type.Literal("Delivered"),
      Type.Literal("Clicked"),
      Type.Literal("Opened"),
      Type.Literal("Failed"),
      Type.Literal("Bounced"),
    ],
    {
      $id: "EventType",
      description: "The type of an event",
      default: "Queued",
    }
  );

export type EventType = Static<typeof EventType>;

export const Activity = //
  Type.Object(
    {
      id: Type.String({ format: "uuid" }),
      contact: Contact,
      campaign: Type.Optional(Campaign),
      sendName: Type.String(),
      subject: Type.String(),
      status: ActivityStatus,
      sendAt: Type.String({ format: "date-time" }),
      lastEventReceivedAt: Type.String({ format: "date-time" }),
      lastEventType: EventType,
      opens: Type.Integer({ minimum: 0 }),
      clicks: Type.Integer({ minimum: 0 }),
      createdAt: Type.String({ format: "date-time" }),
      createdBy: Type.String(),
      updatedAt: Type.Optional(Type.String({ format: "date-time" })),
      updatedBy: Type.Optional(Type.String()),
    },
    {
      $id: "Activity",
      description: "An activity in the system",
      additionalProperties: false,
      required: [
        "id",
        "contact",
        "sendName",
        "subject",
        "status",
        "sendAt",
        "lastEventReceivedAt",
        "lastEventType",
        "opens",
        "clicks",
        "createdAt",
        "createdBy",
      ],
    }
  );

export type Activity = Static<typeof Activity>;

export const BounceType = //
  Type.Union([Type.Literal("Hard"), Type.Literal("Soft")], {
    $id: "BounceType",
    description: "The type of a bounce",
    default: "Hard",
  });

export type BounceType = Static<typeof BounceType>;

export const Bounce = //
  Type.Object(
    {
      id: Type.String({ format: "uuid" }),
      contact: Contact,
      bouncedAt: Type.String({ format: "date-time" }),
      reason: Type.String(),
      bounceType: BounceType,
      createdAt: Type.String({ format: "date-time" }),
      createdBy: Type.String(),
      updatedAt: Type.Optional(Type.String({ format: "date-time" })),
      updatedBy: Type.Optional(Type.String()),
    },
    {
      $id: "Bounce",
      description: "A bounce in the system",
      additionalProperties: false,
      required: ["id", "contact", "bouncedAt", "reason", "bounceType", "createdAt", "createdBy"],
    }
  );

export type Bounce = Static<typeof Bounce>;

export const SubscriberStatus = //
  Type.Union(
    [Type.Literal("Subscribed"), Type.Literal("Unsubscribed"), Type.Literal("Bounced"), Type.Literal("Complaint")],
    {
      $id: "SubscriberStatus",
      description: "The status of a subscriber",
      default: "Subscribed",
    }
  );

export type SubscriberStatus = Static<typeof SubscriberStatus>;

export const Subscriber = //
  Type.Object(
    {
      id: Type.String({ format: "uuid" }),
      contact: Contact,
      status: SubscriberStatus,
      subscribedAt: Type.String({ format: "date-time" }),
      createdAt: Type.String({ format: "date-time" }),
      createdBy: Type.String(),
      updatedAt: Type.Optional(Type.String({ format: "date-time" })),
      updatedBy: Type.Optional(Type.String()),
    },
    {
      $id: "Subscriber",
      description: "A subscriber in the system",
      additionalProperties: false,
      required: ["id", "contact", "status", "subscribedAt", "createdAt", "createdBy"],
    }
  );

export type Subscriber = Static<typeof Subscriber>;

export const SubscriberList = //
  Type.Object(
    {
      id: Type.String({ format: "uuid" }),
      name: Type.String(),
      description: Type.Optional(Type.String()),
      createdAt: Type.String({ format: "date-time" }),
      createdBy: Type.String(),
      updatedAt: Type.Optional(Type.String({ format: "date-time" })),
      updatedBy: Type.Optional(Type.String()),
    },
    {
      $id: "SubscriberList",
      description: "A list of subscribers in the system",
      additionalProperties: false,
      required: ["id", "name", "createdAt", "createdBy"],
    }
  );

export type SubscriberList = Static<typeof SubscriberList>;

export const UnsubscribeSource = //
  Type.Union(
    [
      Type.Literal("UnsubscribeLink"),
      Type.Literal("ManualAddition"),
      Type.Literal("Bounce"),
      Type.Literal("Api"),
      Type.Literal("Other"),
    ],
    {
      $id: "UnsubscribeSource",
      description: "The source of an unsubscribe",
      default: "Email",
    }
  );

export type UnsubscribeSource = Static<typeof UnsubscribeSource>;

export const Unsubscribe = //
  Type.Object(
    {
      id: Type.String({ format: "uuid" }),
      contact: Contact,
      source: UnsubscribeSource,
      unsubscribedAt: Type.String({ format: "date-time" }),
      global: Type.Boolean(),
      listIds: Type.Array(Type.String({ format: "uuid" })),
      createdAt: Type.String({ format: "date-time" }),
      createdBy: Type.String(),
      updatedAt: Type.Optional(Type.String({ format: "date-time" })),
      updatedBy: Type.Optional(Type.String()),
    },
    {
      $id: "Unsubscribe",
      description: "An unsubscribe in the system",
      additionalProperties: false,
      required: ["id", "contact", "source", "unsubscribedAt", "global", "listIds", "createdAt", "createdBy"],
    }
  );

export type Unsubscribe = Static<typeof Unsubscribe>;

export const User = //
  Type.Object(
    {
      id: Type.String({ format: "uuid" }),
      email: Type.String(),
      firstName: Type.Optional(Type.String()),
      lastName: Type.Optional(Type.String()),
      role: Type.String(),
      isActive: Type.Boolean(),
      lastLoginAt: Type.Optional(Type.String({ format: "date-time" })),
      permissions: Type.Array(Type.String()),
      createdAt: Type.String({ format: "date-time" }),
      createdBy: Type.String(),
      updatedAt: Type.Optional(Type.String({ format: "date-time" })),
      updatedBy: Type.Optional(Type.String()),
    },
    {
      $id: "User",
      description: "A user in the system",
      additionalProperties: false,
      required: ["id", "email", "role", "isActive", "permissions", "createdAt", "createdBy"],
    }
  );

export type User = Static<typeof User>;

export const ApiKey = //
  Type.Object(
    {
      id: Type.String({ format: "uuid" }),
      name: Type.String(),
      key: Type.String(),
      isActive: Type.Boolean(),
      lastUsedAt: Type.Optional(Type.String({ format: "date-time" })),
      expiresAt: Type.Optional(Type.String({ format: "date-time" })),
      permissions: Type.Array(Type.String()),
      createdAt: Type.String({ format: "date-time" }),
      createdBy: Type.String(),
      updatedAt: Type.Optional(Type.String({ format: "date-time" })),
      updatedBy: Type.Optional(Type.String()),
    },
    {
      $id: "ApiKey",
      description: "An API key in the system",
      additionalProperties: false,
      required: ["id", "name", "key", "isActive", "permissions", "createdAt", "createdBy"],
    }
  );

export type ApiKey = Static<typeof ApiKey>;

export const Template = //
  Type.Object(
    {
      id: Type.String({ format: "uuid" }),
      name: Type.String(),
      description: Type.Optional(Type.String()),
      content: Type.String(),
      properties: Type.Array(
        Type.Object({
          id: Type.String({ format: "uuid" }),
          name: Type.String(),
          type: Type.String(),
          default_value: Type.Any(),
        })
      ),
      createdAt: Type.String({ format: "date-time" }),
      createdBy: Type.String(),
      updatedAt: Type.Optional(Type.String({ format: "date-time" })),
      updatedBy: Type.Optional(Type.String()),
    },
    {
      $id: "Template",
      description: "A template in the system",
      additionalProperties: false,
      required: ["id", "name", "content", "properties", "createdAt", "createdBy"],
    }
  );

export type Template = Static<typeof Template>;

export const EmailMetricsChartData = //
  Type.Object(
    {
      name: Type.String(),
      sent: Type.Integer({ minimum: 0 }),
      delivered: Type.Integer({ minimum: 0 }),
      opened: Type.Integer({ minimum: 0 }),
      clicked: Type.Integer({ minimum: 0 }),
      bounced: Type.Integer({ minimum: 0 }),
      failed: Type.Integer({ minimum: 0 }),
      complaint: Type.Integer({ minimum: 0 }),
      pending: Type.Integer({ minimum: 0 }),
      scheduled: Type.Integer({ minimum: 0 }),
    },
    {
      $id: "EmailMetricsChartData",
      description: "Email metrics chart data",
      additionalProperties: false,
      required: [
        "name",
        "sent",
        "delivered",
        "opened",
        "clicked",
        "bounced",
        "failed",
        "complaint",
        "pending",
        "scheduled",
      ],
    }
  );

export type EmailMetricsChartData = Static<typeof EmailMetricsChartData>;

export const PerformanceMetricsChartData = //
  Type.Object(
    {
      name: Type.String(),
      deliveryRate: Type.Number({ minimum: 0, maximum: 1 }),
      openRate: Type.Number({ minimum: 0, maximum: 1 }),
      clickRate: Type.Number({ minimum: 0, maximum: 1 }),
      bounceRate: Type.Number({ minimum: 0, maximum: 1 }),
      failedRate: Type.Number({ minimum: 0, maximum: 1 }),
    },
    {
      $id: "PerformanceMetricsChartData",
      description: "Performance metrics chart data",
      additionalProperties: false,
      required: ["name", "deliveryRate", "openRate", "clickRate", "bounceRate", "failedRate"],
    }
  );

export type PerformanceMetricsChartData = Static<typeof PerformanceMetricsChartData>;
