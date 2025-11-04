import { useApi } from "../../hooks/useApi.js";
import { useQuery } from "@tanstack/solid-query";
import { userKeys } from "./keys.js";

interface UserQueryProps {
  tenantId: () => string | undefined;
  userId: () => string | undefined;
}

export function useUserQuery({ tenantId, userId }: UserQueryProps) {
  const client = useApi();

  return useQuery(() => ({
    queryKey: userKeys.user(tenantId() ?? undefined, userId() ?? undefined),
    queryFn: async () => {
      if (!tenantId()) return;
      const response = await client.GET("/api/v1/tenants/{tenant_id}/users/{user_id}/", {
        params: {
          path: {
            tenant_id: tenantId()!,
            user_id: userId()!,
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },
    enabled: !!tenantId() && !!userId(),
  }));
}
