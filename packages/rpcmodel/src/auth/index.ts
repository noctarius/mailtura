const AVAILABLE_PERMISSIONS = [
  "view::campaigns",
  "manage::campaigns",
  "view::templates",
  "manage::templates",
  "view::contacts",
  "manage::contacts",
  "view::api-keys",
  "manage::api-keys",
  "view::tenants",
  "manage::tenants",
  "view::users",
  "manage::users",
  "view::suppressions",
  "manage::suppressions",
  "view::reports",
  "manage::reports",
  "view::settings",
  "manage::settings",
  "view::webhooks",
  "call::webhooks",
  "manage::webhooks",
  "view::integrations",
  "manage::integrations",
  "view::logs",
  "manage::logs",
  "send::emails",
] as const;

export const PERMISSIONS: Permission[] = [...AVAILABLE_PERMISSIONS];

export type Permission = (typeof AVAILABLE_PERMISSIONS)[number];
