import { useApi } from "../../hooks/useApi.js";
import { useQuery } from "@tanstack/solid-query";
import { userKeys } from "./keys.js";

interface UsersQueryProps {
  tenantId: () => string | undefined;
}

export function useUsersQuery({ tenantId }: UsersQueryProps) {
  const client = useApi();

  return useQuery(() => ({
    queryKey: userKeys.users(tenantId() ?? undefined),
    queryFn: async () => {
      if (!tenantId()) return;
      const response = await client.GET("/api/v1/tenants/{tenant_id}/users/", {
        params: {
          path: {
            tenant_id: tenantId()!,
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },
    enabled: !!tenantId(),
  }));
}
