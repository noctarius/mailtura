import type { RolePermission } from "@mailtura/rpcmodel/lib/auth/index.js";
import type { User } from "@mailtura/rpcmodel/lib/models/index.js";

export function hasPermission(permission: RolePermission, user: User): boolean {
  const [action, resource] = permission.split("::");

  const permissions = user.permissions;
  if (action === "view" && permissions.includes(`manage::${resource}` as RolePermission)) {
    return true;
  }
  return permissions.includes(permission);
}

export function hasAnyPermission(permissions: RolePermission[], user: User): boolean {
  return permissions.some(permission => hasPermission(permission, user));
}

export function hasAllPermissions(permissions: RolePermission[], user: User): boolean {
  return permissions.every(permission => hasPermission(permission, user));
}
