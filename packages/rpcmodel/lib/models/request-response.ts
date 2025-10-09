import { type Static, Type } from "typebox";
import { Contact, omitDefaultProperties, Template, Tenant } from "./index.js";

export const CreateContact = Type.Omit(Contact, [
  "id",
  "status",
  "createdAt",
  "createdBy",
  "updatedAt",
  "updatedBy",
  "tenantId",
]);

export type CreateContact = Static<typeof CreateContact>;

export const UpdateContact = Type.Partial(Type.Pick(Contact, ["firstName", "lastName"]));

export type UpdateContact = Static<typeof UpdateContact>;

export const CreateTemplate = Type.Intersect([
  omitDefaultProperties(Template, ["properties"]),
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

export const UpdateTemplate = Type.Partial(omitDefaultProperties(Template, []));

export type UpdateTemplate = Static<typeof UpdateTemplate>;

export const PreviewTemplate = Type.Object({
  content: Type.String(),
  data: Type.Record(Type.String(), Type.String()),
});

export type PreviewTemplate = Static<typeof PreviewTemplate>;

export const CreateTenant = Type.Pick(Tenant, ["name"]);

export type CreateTenant = Static<typeof CreateTenant>;

export const UpdateTenant = Type.Partial(Type.Pick(Tenant, ["name"]));

export type UpdateTenant = Static<typeof UpdateTenant>;
