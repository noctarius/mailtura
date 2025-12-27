import { keepPreviousData, useQuery } from "@tanstack/solid-query";
import { useApi } from "../../hooks/useApi.js";
import { bouncesKeys } from "./keys.js";

interface BouncesQueryProps {
  tenantId: () => string | undefined;
  query?: () => string | undefined;
  cursor?: () => string | undefined;
  limit?: () => number | undefined;
}

export function useBouncesQuery({ tenantId, query, cursor, limit }: BouncesQueryProps) {
  const client = useApi();

  const pageSize = limit?.() ?? 100;
  return useQuery(() => ({
    queryKey: bouncesKeys.bounces(tenantId(), query?.(), cursor?.(), pageSize),
    placeholderData: keepPreviousData,
    queryFn: async () => {
      if (!tenantId()) return;
      const response = await client.GET("/api/v1/tenants/{tenant_id}/suppressions/bounces/", {
        params: {
          path: {
            tenant_id: tenantId()!,
          },
          query: {
            limit: pageSize,
            query: query?.(),
            cursor: cursor?.(),
            sort: "bounced_at:desc",
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
