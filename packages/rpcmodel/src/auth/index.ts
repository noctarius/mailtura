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

interface PermissionHolder {
  permissions: string[];
}

export const PERMISSIONS: Permission[] = [...AVAILABLE_PERMISSIONS];

export type Permission = (typeof AVAILABLE_PERMISSIONS)[number];

export function hasPermission(permission: Permission, holder: PermissionHolder): boolean {
  const [action, resource] = permission.split("::");

  const permissions = holder.permissions;
  if (action === "view" && permissions.includes(`manage::${resource}` as Permission)) {
    return true;
  }
  return permissions.includes(permission);
}

export function hasAnyPermission(permissions: Permission[], holder: PermissionHolder): boolean {
  return permissions.some(permission => hasPermission(permission, holder));
}

export function hasAllPermissions(permissions: Permission[], holder: PermissionHolder): boolean {
  return permissions.every(permission => hasPermission(permission, holder));
}
