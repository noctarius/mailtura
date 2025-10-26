import { type Static, type TSchema, Type } from "typebox";
import { ApiKey, Campaign, Contact, SubscriberList, Template, Tenant, User } from "./index.js";

type Nullable<T extends TSchema> = ReturnType<
  typeof Type.Optional<ReturnType<typeof Type.Union<[T, ReturnType<typeof Type.Null>]>>>
>;

const asNullable = <T extends TSchema>(schema: T): Nullable<T> => Type.Optional(Type.Union([schema, Type.Null()]));

export const CreateContact = //
  Type.Omit(Contact, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy", "status", "tenantId", "lastActivity"], {
    $id: "CreateContact",
    description: "A create contact request",
    additionalProperties: false,
  });

export type CreateContact = Static<typeof CreateContact>;

export const UpdateContact = //
  Type.Partial(Type.Pick(Contact, ["firstName", "lastName", "listIds"]), {
    $id: "UpdateContact",
    description: "An update contact request",
    additionalProperties: false,
  });

export type UpdateContact = Static<typeof UpdateContact>;

export const CreateTemplate = //
  Type.Intersect(
    [
      Type.Omit(Template, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy", "properties"]),
      Type.Object({
        properties: Type.Array(
          Type.Object({
            name: Type.String(),
            type: Type.String(),
            default_value: Type.Any(),
          })
        ),
      }),
    ],
    {
      $id: "CreateTemplate",
      description: "A create template request",
    }
  );

export type CreateTemplate = Static<typeof CreateTemplate>;

export const UpdateTemplate = //
  Type.Partial(Type.Omit(Template, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy"]), {
    $id: "UpdateTemplate",
    description: "An update template request",
    additionalProperties: false,
  });

export type UpdateTemplate = Static<typeof UpdateTemplate>;

export const PreviewTemplate = //
  Type.Object(
    {
      content: Type.String(),
      data: Type.Record(Type.String(), Type.String()),
    },
    {
      $id: "PreviewTemplate",
      description: "A preview template request",
      additionalProperties: false,
    }
  );

export type PreviewTemplate = Static<typeof PreviewTemplate>;

export const CreateTenant = //
  Type.Omit(Tenant, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy"], {
    $id: "CreateTenant",
    description: "A create tenant request",
    additionalProperties: false,
  });

export type CreateTenant = Static<typeof CreateTenant>;

export const UpdateTenant = //
  Type.Partial(Type.Omit(Tenant, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy"]), {
    $id: "UpdateTenant",
    description: "An update tenant request",
    additionalProperties: false,
  });

export type UpdateTenant = Static<typeof UpdateTenant>;

export const CreateCampaign = //
  Type.Omit(
    Campaign,
    [
      "id",
      "createdAt",
      "createdBy",
      "updatedAt",
      "updatedBy",
      "status",
      "recipients",
      "sent",
      "delivered",
      "opened",
      "clicked",
      "deliveryRate",
      "openRate",
      "clickRate",
    ],
    {
      $id: "CreateCampaign",
      description: "A create campaign request",
      additionalProperties: false,
    }
  );

export type CreateCampaign = Static<typeof CreateCampaign>;

export const UpdateCampaign = //
  Type.Intersect(
    [
      Type.Partial(
        Type.Omit(Campaign, [
          "id",
          "createdAt",
          "createdBy",
          "updatedAt",
          "updatedBy",
          "type",
          "status",
          "recipients",
          "sent",
          "delivered",
          "opened",
          "clicked",
          "deliveryRate",
          "openRate",
          "clickRate",
          "scheduledFor",
        ])
      ),
      Type.Object({
        scheduledFor: asNullable(Type.String({ format: "date-time" })),
      }),
    ],
    {
      $id: "UpdateCampaign",
      description: "An update campaign request",
    }
  );

export type UpdateCampaign = Static<typeof UpdateCampaign>;

export const CreateSubscriberList = //
  Type.Omit(SubscriberList, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy", "contactCount"], {
    $id: "CreateSubscriberList",
    description: "A create subscriber list request",
    additionalProperties: false,
  });

export type CreateSubscriberList = Static<typeof CreateSubscriberList>;

export const UpdateSubscriberList = //
  Type.Intersect(
    [
      Type.Partial(
        Type.Omit(SubscriberList, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy", "description"])
      ),
      Type.Object({
        description: asNullable(Type.String()),
      }),
    ],
    {
      $id: "UpdateSubscriberList",
      description: "An update subscriber list request",
    }
  );

export type UpdateSubscriberList = Static<typeof UpdateSubscriberList>;

export const CreateUser = //
  Type.Omit(User, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy", "isActive", "lastLoginAt"], {
    $id: "CreateUser",
    description: "A create user request",
    additionalProperties: false,
  });

export type CreateUser = Static<typeof CreateUser>;

export const UpdateUser = //
  Type.Partial(Type.Omit(User, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy", "lastLoginAt"]), {
    $id: "UpdateUser",
    description: "An update user request",
    additionalProperties: false,
  });

export type UpdateUser = Static<typeof UpdateUser>;

export const CreateApiKey = //
  Type.Omit(ApiKey, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy", "isActive", "lastUsedAt"], {
    $id: "CreateApiKey",
    description: "A create API key request",
    additionalProperties: false,
  });

export type CreateApiKey = Static<typeof CreateApiKey>;

export const UpdateApiKey = //
  Type.Intersect(
    [
      Type.Partial(
        Type.Omit(ApiKey, [
          "id",
          "createdAt",
          "createdBy",
          "updatedAt",
          "updatedBy",
          "isActive",
          "lastUsedAt",
          "expiresAt",
        ])
      ),
      Type.Object({
        expiresAt: asNullable(Type.String({ format: "date-time" })),
      }),
    ],
    {
      $id: "UpdateApiKey",
      description: "An update API key request",
    }
  );

export type UpdateApiKey = Static<typeof UpdateApiKey>;

export const ImportContacts = //
  Type.Object(
    {
      mapping: Type.Array(
        Type.Object({
          source: Type.String(),
          target: Type.String(),
        })
      ),
      skipFirstRow: Type.Boolean(),
      listIds: Type.Array(Type.String({ format: "uuid" }), { minItems: 0, uniqueItems: true }),
    },
    {
      $id: "ImportContacts",
      description: "An import contacts request",
      additionalProperties: false,
    }
  );

export type ImportContacts = Static<typeof ImportContacts>;
