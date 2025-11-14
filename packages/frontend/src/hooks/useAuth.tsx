import { AuthState } from "../types/auth.js";
import { createContext, createEffect, createMemo, createSignal, ParentComponent, useContext } from "solid-js";
import { useTenantQuery } from "../services/tenants/use-tenant-query.js";
import { Tenant, User } from "@mailtura/rpcmodel/lib/api/index.js";
import { API_URL } from "../constants.js";
import { useApi } from "./useApi.js";
import { useUserQuery } from "../services/users/use-user-query.js";
import type { Permission } from "@mailtura/rpcmodel/lib/auth/index.js";
import { CustomAuthClient } from "../helpers/custom-auth-client.js";

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  switchTenant: (tenantId: string) => Promise<void>;
  isAuthenticated: () => boolean;
  user: () => User | undefined;
  tenant: () => Tenant | undefined;
  isLoading: () => boolean;
}

const authClient = new CustomAuthClient(API_URL, "/api/v1");

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

  const getUserProfile = async (): Promise<User> => {
    const response = await api.GET("/api/v1/profile");
    if (response.error) {
      throw new Error(response.error.message);
    }
    return response.data;
  };

  const loadSessionData = async () => {
    setAuthState({
      isAuthenticated: false,
      user: undefined,
      tenant: undefined,
      loading: true,
    });

    // FIXME: remove after figuring out how to extend auth user sent from backend
    const user = await getUserProfile();
    setUserId(user.id);
    setTenantId(user.tenantId);
  };

  const hasSession = hasSessionCookie();

  const [authState, setAuthState] = createSignal<AuthState>({
    isAuthenticated: false,
    user: undefined,
    tenant: undefined,
    loading: false,
  });

  const [tenantId, setTenantId] = createSignal<string | undefined>(undefined);
  const [userId, setUserId] = createSignal<string | undefined>(undefined);

  const tenantQuery = useTenantQuery({ tenantId });
  const userQuery = useUserQuery({ tenantId, userId });

  createEffect(() => {
    if (
      tenantQuery.isLoading ||
      tenantQuery.isError ||
      !tenantQuery.data ||
      userQuery.isLoading ||
      userQuery.isError ||
      !userQuery.data
    ) {
      return;
    }

    const tenant = tenantQuery.data;
    setAuthState({
      isAuthenticated: true,
      user: userQuery.data,
      tenant: tenant,
      loading: false,
    });
  }, [tenantQuery]);

  createEffect(async () => {
    if (!hasSession) return;
    const session = await authClient.getSession();
    if (!session || !session.data || session.error) return;
    await loadSessionData();
  });

  const signIn = async (email: string, password: string): Promise<void> => {
    await authClient.signIn(email, password);
    await loadSessionData();
  };

  const signUp = async (firstName: string, lastName: string, email: string, password: string): Promise<void> => {
    const newUser = await authClient.signUp(email, firstName, lastName, password);

    setAuthState({
      isAuthenticated: true,
      user: newUser,
      tenant: undefined,
      loading: false,
    });
  };

  const signOut = async (): Promise<void> => {
    setTenantId(undefined);
    setUserId(undefined);
    setAuthState({
      isAuthenticated: false,
      user: undefined,
      tenant: undefined,
      loading: false,
    });
    await authClient.signOut("/");
  };

  const hasPermission = (permission: Permission): boolean => {
    const [action, resource] = permission.split("::");

    const permissions = authState().user?.permissions ?? [];
    if (action === "view" && permissions.includes(`manage::${resource}` as Permission)) {
      return true;
    }
    return permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  const switchTenant = async (tenantId: string): Promise<void> => {
    if (!hasPermission("manage::tenants")) setTenantId(tenantId);
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

const hasSessionCookie = () => {
  return document.cookie.split(";").some(cookie => cookie.trim().startsWith("mailtura.session_token="));
};
