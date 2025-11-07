import { type Static, type TSchema, Type } from "typebox";
import {
  ApiKey,
  Bounce,
  Campaign,
  Contact,
  ContactImport,
  SubscriberList,
  Template,
  Tenant,
  UnsubscribeSource,
  User,
} from "./index.js";

type Nullable<T extends TSchema> = ReturnType<
  typeof Type.Optional<ReturnType<typeof Type.Union<[T, ReturnType<typeof Type.Null>]>>>
>;

const asNullable = <T extends TSchema>(schema: T): Nullable<T> => Type.Optional(Type.Union([schema, Type.Null()]));

export const CreateContact = //
  Type.Omit(Contact, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy", "status", "tenantId", "lastActivity"]);

export type CreateContact = Static<typeof CreateContact>;

export const UpdateContact = //
  Type.Partial(Type.Pick(Contact, ["firstName", "lastName", "listIds"]));

export type UpdateContact = Static<typeof UpdateContact>;

export const CreateContactBatch = //
  Type.Object({
    contacts: Type.Array(CreateContact),
    upsert: Type.Boolean(),
  });

export type CreateContactBatch = Static<typeof CreateContactBatch>;

export const CreateContactBatchResponse = Type.Object({
  items: Type.Integer(),
  added: Type.Array(Contact),
  updated: Type.Array(Contact),
  skipped: Type.Array(Contact),
});

export type CreateContactBatchResponse = Static<typeof CreateContactBatchResponse>;

export const CreateRole = //
  Type.Object({
    name: Type.String(),
    description: Type.Optional(Type.String()),
    permissions: Type.Array(Type.String()),
  });

export type CreateRole = Static<typeof CreateRole>;

export const UpdateRole = Type.Partial(CreateRole);

export type UpdateRole = Static<typeof UpdateRole>;

export const CreateTemplate = //
  Type.Intersect([
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
  ]);

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
  Type.Partial(Type.Omit(Tenant, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy"]));

export type UpdateTenant = Static<typeof UpdateTenant>;

export const CreateCampaign = //
  Type.Omit(Campaign, [
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
  ]);

export type CreateCampaign = Static<typeof CreateCampaign>;

export const UpdateCampaign = //
  Type.Intersect([
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
  ]);

export type UpdateCampaign = Static<typeof UpdateCampaign>;

export const CreateSubscriberList = //
  Type.Omit(SubscriberList, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy", "contactCount"]);

export type CreateSubscriberList = Static<typeof CreateSubscriberList>;

export const UpdateSubscriberList = //
  Type.Intersect([
    Type.Partial(Type.Omit(SubscriberList, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy", "description"])),
    Type.Object({
      description: asNullable(Type.String()),
    }),
  ]);

export type UpdateSubscriberList = Static<typeof UpdateSubscriberList>;

export const CreateUser = //
  Type.Intersect([
    Type.Omit(User, [
      "id",
      "tenantId",
      "isEmailVerified",
      "image",
      "isTwoFactorEnabled",
      "createdAt",
      "createdBy",
      "updatedAt",
      "updatedBy",
      "lastLoginAt",
    ]),
    Type.Object({
      sendInvitationEmail: Type.Boolean(),
    }),
  ]);

export type CreateUser = Static<typeof CreateUser>;

export const UpdateUser = //
  Type.Partial(
    Type.Omit(User, [
      "id",
      "tenantId",
      "isEmailVerified",
      "isTwoFactorEnabled",
      "createdAt",
      "createdBy",
      "updatedAt",
      "updatedBy",
      "lastLoginAt",
    ])
  );

export type UpdateUser = Static<typeof UpdateUser>;

export const CreateApiKey = //
  Type.Omit(ApiKey, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy", "isActive", "lastUsedAt"], {
    $id: "CreateApiKey",
    description: "A create API key request",
    additionalProperties: false,
  });

export type CreateApiKey = Static<typeof CreateApiKey>;

export const UpdateApiKey = //
  Type.Intersect([
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
  ]);

export type UpdateApiKey = Static<typeof UpdateApiKey>;

export const ImportContacts = //
  Type.Object({
    mapping: Type.Record(Type.String(), Type.String()),
    listIds: Type.Array(Type.String({ format: "uuid" }), { minItems: 0, uniqueItems: true }),
  });

export type ImportContacts = Static<typeof ImportContacts>;

export const UpdateContactImport = //
  Type.Partial(
    Type.Omit(ContactImport, [
      "id",
      "name",
      "filename",
      "parameters",
      "createdAt",
      "createdBy",
      "updatedAt",
      "updatedBy",
    ])
  );

export type UpdateContactImport = Static<typeof UpdateContactImport>;

export const CreateUnsubscribe = Type.Object({
  contactId: Type.String({ format: "uuid" }),
  source: UnsubscribeSource,
  global: Type.Boolean(),
  listIds: Type.Array(Type.String({ format: "uuid" }), { minItems: 0, uniqueItems: true }),
});

export type CreateUnsubscribe = Static<typeof CreateUnsubscribe>;

export const UpdateUnsubscribe = Type.Object({
  listIds: Type.Array(Type.String({ format: "uuid" }), { minItems: 0, uniqueItems: true }),
});

export type UpdateUnsubscribe = Static<typeof UpdateUnsubscribe>;

export const CreateBounce = //
  Type.Omit(Bounce, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy"]);

export type CreateBounce = Static<typeof CreateBounce>;
