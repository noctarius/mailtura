import { AuthState, Permissions, ROLE_PERMISSIONS, User } from "../types/auth.js";
import { createContext, createEffect, createMemo, createSignal, ParentComponent, useContext } from "solid-js";
import { useTenantQuery } from "../services/tenants/use-tenant-query.js";
import { Tenant } from "@mailtura/rpcmodel/lib/models/index.js";

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
  const [authState, setAuthState] = createSignal<AuthState>({
    isAuthenticated: false,
    user: null,
    tenant: null,
    loading: true,
  });

  const [currentUser, setCurrentUser] = createSignal<User | null>(null);
  const [tenantId, setTenantId] = createSignal<string | null>(null);
  const tenantQuery = useTenantQuery({ tenantId });

  // Mock data - in real app this would come from API
  /*const mockTenants: Tenant[] = [
    {
      id: "tenant-1",
      name: "Acme Corporation",
      domain: "acme.com",
      isActive: true,
      createdAt: "2024-01-01",
      userCount: 15,
      settings: {
        maxUsers: 50,
        features: ["campaigns", "analytics", "templates"],
        customBranding: {
          companyName: "Acme Corporation",
          primaryColor: "#3b82f6",
        },
      },
    },
    {
      id: "tenant-2",
      name: "TechStart Inc",
      domain: "techstart.io",
      isActive: true,
      createdAt: "2024-01-15",
      userCount: 8,
      settings: {
        maxUsers: 25,
        features: ["campaigns", "templates"],
      },
    },
  ];*/

  const mockUsers: User[] = [
    {
      id: "user-1",
      email: "admin@acme.com",
      firstName: "John",
      lastName: "Admin",
      role: "tenant_admin",
      tenantId: "0199e407-dd7f-7dfb-81fc-f39d09316def",
      permissions: ROLE_PERMISSIONS.tenant_admin,
      isActive: true,
      createdAt: "2024-01-01",
      lastLoginAt: "2024-01-25",
    },
    {
      id: "user-2",
      email: "user@acme.com",
      firstName: "Jane",
      lastName: "User",
      role: "user",
      tenantId: "tenant-1",
      permissions: ROLE_PERMISSIONS.user,
      isActive: true,
      createdAt: "2024-01-05",
    },
  ];

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

  const signIn = async (email: string, _password: string): Promise<void> => {
    // Mock authentication - in real app this would be an API call
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

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
