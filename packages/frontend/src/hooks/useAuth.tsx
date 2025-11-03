import { AuthState, Permissions, ROLE_PERMISSIONS } from "../types/auth.js";
import { createContext, createEffect, createMemo, createSignal, ParentComponent, useContext } from "solid-js";
import { useTenantQuery } from "../services/tenants/use-tenant-query.js";
import { Tenant, User } from "@mailtura/rpcmodel/lib/models/index.js";
import { createAuthClient } from "better-auth/solid";
import { API_URL } from "../constants.js";
import { magicLinkClient, passkeyClient, twoFactorClient } from "better-auth/client/plugins";
import { useApi } from "./useApi.js";

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  hasPermission: (permission: Permissions) => boolean;
  hasAnyPermission: (permissions: Permissions[]) => boolean;
  hasAllPermissions: (permissions: Permissions[]) => boolean;
  switchTenant: (tenantId: string) => Promise<void>;
  isAuthenticated: () => boolean;
  user: () => User | null;
  tenant: () => Tenant | null;
  isLoading: () => boolean;
}

const authClient = createAuthClient({
  baseURL: API_URL,
  basePath: "/api/v1/auth",
  plugins: [twoFactorClient(), passkeyClient(), magicLinkClient()],
});

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: ParentComponent = props => {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>;
};

export const useAuthProvider = () => {
  const api = useApi();

  const [authState, setAuthState] = createSignal<AuthState>({
    isAuthenticated: false,
    user: null,
    tenant: null,
    loading: true,
  });

  const [currentUser, setCurrentUser] = createSignal<User | null>(null);
  const [tenantId, setTenantId] = createSignal<string | null>(null);
  const tenantQuery = useTenantQuery({ tenantId });

  createEffect(() => {
    if (tenantQuery.isLoading || tenantQuery.isError || !tenantQuery.data) return;
    const tenant = tenantQuery.data;
    const authData = { user: currentUser(), tenant };
    localStorage.setItem("emailflow_auth", JSON.stringify(authData));

    setAuthState({
      isAuthenticated: true,
      user: currentUser(),
      tenant: tenant,
      loading: false,
    });
  });

  createEffect(() => {
    // Check for existing session
    const savedAuth = localStorage.getItem("emailflow_auth");
    if (savedAuth) {
      try {
        const { user, tenant } = JSON.parse(savedAuth);
        setTenantId(tenant?.id);
        setCurrentUser(user);
        setAuthState({
          isAuthenticated: true,
          user,
          tenant,
          loading: false,
        });
      } catch (error: any) {
        console.error("Error parsing auth data:", error.message);
        localStorage.removeItem("emailflow_auth");
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  });

  const getUserProfile = async (): Promise<User> => {
    const response = await api.GET("/api/v1/profile");
    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data;
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    const response = await authClient.signIn.email({ email, password });
    if (response.error) {
      throw new Error(response.error.message);
    }
    console.log(response.data.user);

    const user = await getUserProfile();

    setTenantId(user.tenantId);
    setCurrentUser(user);
  };

  const signUp = async (firstName: string, lastName: string, email: string, _password: string): Promise<void> => {
    // Mock signup - in real app this would be an API call
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      firstName,
      lastName,
      role: "user",
      tenantId: "tenant-1", // Default tenant for demo
      permissions: ROLE_PERMISSIONS.user,
      isActive: true,
      createdAt: new Date().toISOString(),
      createdBy: "mock",
    };

    const authData = { user: newUser, tenant: null };
    localStorage.setItem("emailflow_auth", JSON.stringify(authData));

    setAuthState({
      isAuthenticated: true,
      user: newUser,
      tenant: null,
      loading: false,
    });
  };

  const signOut = (): void => {
    localStorage.removeItem("emailflow_auth");
    setAuthState({
      isAuthenticated: false,
      user: null,
      tenant: null,
      loading: false,
    });
  };

  const hasPermission = (permission: Permissions): boolean => {
    const [action, resource] = permission.split("::");

    const permissions = authState().user?.permissions ?? [];
    if (action === "view" && permissions.includes(`manage::${resource}` as Permissions)) {
      return true;
    }
    return permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: Permissions[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permissions[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  const switchTenant = async (tenantId: string): Promise<void> => {
    // In real app, this would validate user access to tenant
    setTenantId(tenantId);
  };

  const isAuthenticated = createMemo(() => authState().isAuthenticated || false);
  const user = createMemo(() => authState().user);
  const tenant = createMemo(() => authState().tenant);
  const isLoading = createMemo(() => authState().loading || false);
  return {
    isAuthenticated,
    user,
    tenant,
    isLoading,
    signIn,
    signUp,
    signOut,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    switchTenant,
  };
};
