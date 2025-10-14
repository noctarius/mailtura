import { type Static, Type } from "typebox";
import { ApiKey, Campaign, Contact, SubscriberList, Template, Tenant, User } from "./index.js";

export const CreateContact = //
  Type.Omit(Contact, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy", "status", "tenantId"]);

export type CreateContact = Static<typeof CreateContact>;

export const UpdateContact = //
  Type.Partial(Type.Pick(Contact, ["firstName", "lastName"]));

export type UpdateContact = Static<typeof UpdateContact>;

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
  Type.Partial(Type.Omit(Template, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy"]));

export type UpdateTemplate = Static<typeof UpdateTemplate>;

export const PreviewTemplate = //
  Type.Object({
    content: Type.String(),
    data: Type.Record(Type.String(), Type.String()),
  });

export type PreviewTemplate = Static<typeof PreviewTemplate>;

export const CreateTenant = //
  Type.Omit(Tenant, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy"]);

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
    ])
  );

export type UpdateCampaign = Static<typeof UpdateCampaign>;

export const CreateSubscriberList = //
  Type.Omit(SubscriberList, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy"]);

export type CreateSubscriberList = Static<typeof CreateSubscriberList>;

export const UpdateSubscriberList = //
  Type.Partial(Type.Omit(SubscriberList, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy"]));

export const CreateUser = //
  Type.Omit(User, ["id", "createdAt", "createdBy", "updatedAt", "updatedBy", "isActive", "lastLoginAt", "permissions"]);

export type CreateUser = Static<typeof CreateUser>;

export const UpdateUser = //
  Type.Partial(
    Type.Omit(User, [
      "id",
      "createdAt",
      "createdBy",
      "updatedAt",
      "updatedBy",
      "isActive",
      "lastLoginAt",
      "permissions",
    ])
  );

export const CreateApiKey = //
  Type.Omit(ApiKey, [
    "id",
    "createdAt",
    "createdBy",
    "updatedAt",
    "updatedBy",
    "isActive",
    "lastUsedAt",
    "permissions",
  ]);

export type CreateApiKey = Static<typeof CreateApiKey>;

export const UpdateApiKey = //
  Type.Partial(
    Type.Omit(ApiKey, [
      "id",
      "createdAt",
      "createdBy",
      "updatedAt",
      "updatedBy",
      "isActive",
      "lastUsedAt",
      "permissions",
    ])
  );

export type UpdateApiKey = Static<typeof UpdateApiKey>;
