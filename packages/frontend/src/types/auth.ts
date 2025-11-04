import { Tenant, User } from "@mailtura/rpcmodel/lib/models/index.js";
import { type ApiPermission, type RolePermission } from "@mailtura/rpcmodel/lib/auth/index.js";

export type UserRole = "super_admin" | "tenant_admin" | "user" | "viewer";

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  tenantId: string;
  permissions: ApiPermission[];
  isActive: boolean;
  lastUsedAt?: string;
  expiresAt?: string;
  createdAt: string;
  createdBy: string;
}

export const API_PERMISSION_DESCRIPTIONS: Record<ApiPermission, string> = {
  send_emails: "Send transactional and campaign emails",
  manage_campaigns_api: "Create, update, and manage email campaigns",
  manage_contacts_api: "Add, update, and manage contact lists",
  manage_templates_api: "Create and manage email templates",
  view_analytics_api: "Access email analytics and reports",
  manage_users_api: "Manage tenant users and permissions",
  manage_suppressions_api: "Manage unsubscribes and bounce lists",
  webhook_access: "Receive webhook notifications",
};

export interface AuthState {
  isAuthenticated: boolean;
  user: User | undefined;
  tenant: Tenant | undefined;
  loading: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermission[]> = {
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
