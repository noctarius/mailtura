import { useApi } from "../../hooks/useApi.js";
import { useQuery } from "@tanstack/solid-query";
import { userKeys } from "./keys.js";

interface UsersQueryProps {
  tenantId: () => string | undefined;
  query?: () => string | undefined;
  cursor?: () => string | undefined;
  limit?: () => number | undefined;
}

export function useUsersQuery({ tenantId, query, cursor, limit }: UsersQueryProps) {
  const client = useApi();

  const pageSize = limit?.() ?? 100;
  return useQuery(() => ({
    queryKey: userKeys.users(tenantId() ?? undefined, query?.(), cursor?.(), pageSize),
    queryFn: async () => {
      if (!tenantId()) return;
      const response = await client.GET("/api/v1/tenants/{tenant_id}/users/", {
        params: {
          path: {
            tenant_id: tenantId()!,
          },
          query: {
            limit: pageSize,
            query: query?.(),
            cursor: cursor?.(),
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
