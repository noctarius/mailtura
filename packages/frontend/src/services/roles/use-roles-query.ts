import { useApi } from "../../hooks/useApi.js";
import { useQuery } from "@tanstack/solid-query";
import { roleKeys } from "./keys.js";

interface RolesQueryProps {
  tenantId: () => string | undefined;
  query?: () => string | undefined;
  cursor?: () => string | undefined;
  limit?: () => number | undefined;
}

export function useRolesQuery({ tenantId, query, cursor, limit }: RolesQueryProps) {
  const client = useApi();

  return useQuery(() => ({
    queryKey: roleKeys.roles(tenantId() ?? undefined, query?.(), cursor?.(), limit?.()),
    queryFn: async () => {
      if (!tenantId()) return;
      const response = await client.GET("/api/v1/tenants/{tenant_id}/roles/", {
        params: {
          path: {
            tenant_id: tenantId()!,
          },
          query: {
            limit: limit?.() ?? 100,
            query: query?.(),
            cursor: cursor?.(),
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data?.data;
    },
    enabled: !!tenantId(),
  }));
}
