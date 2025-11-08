import type { Permission } from "@mailtura/rpcmodel/lib/auth/index.js";

interface PermissionHolder {
  permissions: string[];
}

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
