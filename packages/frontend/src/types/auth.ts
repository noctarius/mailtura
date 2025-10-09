export type Permissions =
  | "view::campaigns"
  | "manage::campaigns"
  | "view::templates"
  | "manage::templates"
  | "view::contacts"
  | "manage::contacts"
  | "view::api-keys"
  | "manage::api-keys"
  | "view::tenants"
  | "manage::tenants"
  | "view::users"
  | "manage::users"
  | "view::suppressions"
  | "manage::suppressions"
  | "view::reports"
  | "manage::reports"
  | "view::settings"
  | "manage::settings"
  | "view::webhooks"
  | "manage::webhooks"
  | "view::integrations"
  | "manage::integrations"
  | "view::logs"
  | "manage::logs";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenantId: string;
  permissions: Permissions[];
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  isActive: boolean;
  createdAt: string;
  settings: TenantSettings;
  userCount: number;
}

export interface TenantSettings {
  maxUsers: number;
  features: string[];
  customBranding?: {
    logo?: string;
    primaryColor?: string;
    companyName?: string;
  };
}

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

export type ApiPermission =
  | "send_emails"
  | "manage_campaigns_api"
  | "manage_contacts_api"
  | "manage_templates_api"
  | "view_analytics_api"
  | "manage_users_api"
  | "manage_suppressions_api"
  | "webhook_access";

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
  user: User | null;
  tenant: Tenant | null;
  loading: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, Permissions[]> = {
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
