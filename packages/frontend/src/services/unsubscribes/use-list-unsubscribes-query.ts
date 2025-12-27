import { keepPreviousData, useQuery } from "@tanstack/solid-query";
import { useApi } from "../../hooks/useApi.js";
import { unsubscribesKeys } from "./keys.js";

interface ListUnsubscribesQueryProps {
  tenantId: () => string | undefined;
  query?: () => string | undefined;
  cursor?: () => string | undefined;
  limit?: () => number | undefined;
}

export function useListUnsubscribesQuery({ tenantId, query, cursor, limit }: ListUnsubscribesQueryProps) {
  const client = useApi();

  const pageSize = limit?.() ?? 100;
  return useQuery(() => ({
    queryKey: unsubscribesKeys.unsubscribes(tenantId(), query?.(), cursor?.(), pageSize),
    placeholderData: keepPreviousData,
    queryFn: async () => {
      if (!tenantId()) return;
      const response = await client.GET("/api/v1/tenants/{tenant_id}/suppressions/unsubscribes/", {
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
