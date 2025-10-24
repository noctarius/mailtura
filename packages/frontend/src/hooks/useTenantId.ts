import { useAuth } from "./useAuth.js";

export function useTenantId() {
  const auth = useAuth();
  return () => auth.tenant()?.id;
}
