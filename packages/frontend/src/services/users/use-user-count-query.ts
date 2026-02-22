import { useApi } from "../../hooks/useApi.js";
import { useQuery } from "@tanstack/solid-query";
import { userKeys } from "./keys.js";

interface UserCountQueryProps {
  tenantId: () => string | undefined;
  query?: () => string | undefined;
}

export function useUserCountQuery({ tenantId, query }: UserCountQueryProps) {
  const client = useApi();

  return useQuery(() => ({
    queryKey: userKeys.userCount(tenantId() ?? undefined, query?.()),
    queryFn: async () => {
      if (!tenantId()) return;
      const response = await client.GET("/api/v1/tenants/{tenant_id}/users/count", {
        params: {
          path: {
            tenant_id: tenantId()!,
          },
          query: {
            query: query?.(),
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
