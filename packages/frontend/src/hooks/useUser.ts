import { useAuth } from "./useAuth.js";

export function useUser() {
  const auth = useAuth();
  return () => auth.user();
}