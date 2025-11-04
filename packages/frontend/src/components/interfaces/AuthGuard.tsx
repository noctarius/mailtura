import { Navigate } from "@solidjs/router";
import { useAuth } from "../../hooks/useAuth.js";
import { JSX } from "solid-js";
import { RolePermission } from "@mailtura/rpcmodel/lib/auth/index.js";

interface AuthGuardProps {
  children: JSX.Element;
  permissions?: RolePermission[];
}

export function AuthGuard(props: AuthGuardProps) {
  const auth = useAuth();

  const isAvailable = () =>
    auth && (!props.permissions || props.permissions.length === 0 || auth.hasAllPermissions(props.permissions));

  return isAvailable() ? props.children : <Navigate href="/unauthorized" />;
}
