import { Tenant, User } from "@mailtura/rpcmodel/lib/api/index.js";
import type { Permission } from "@mailtura/rpcmodel/lib/auth/index.js";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | undefined;
  tenant: Tenant | undefined;
  loading: boolean;
}

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  super_admin: [
    "manage::tenants",
    "manage::users",
    "manage::campaigns",
    "manage::templates",
    "manage::contacts",
    "manage::reports",
    "manage::settings",
    "manage::suppressions",
    "manage::api-keys",
    "manage::integrations",
    "manage::logs",
    "manage::webhooks",
  ],
  tenant_admin: [
    "manage::users",
    "manage::campaigns",
    "manage::templates",
    "manage::contacts",
    "manage::reports",
    "manage::settings",
    "manage::suppressions",
    "manage::api-keys",
    "manage::integrations",
    "manage::logs",
    "manage::webhooks",
  ],
  user: [
    "manage::campaigns",
    "manage::templates",
    "manage::contacts",
    "view::reports",
    "view::suppressions",
    "view::logs",
  ],
  viewer: ["view::reports", "view::suppressions", "view::logs"],
};
