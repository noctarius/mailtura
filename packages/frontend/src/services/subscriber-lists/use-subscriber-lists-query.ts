import { useApi } from "../../hooks/useApi.js";
import { useQuery } from "@tanstack/solid-query";
import { subscriberListKeys } from "./keys.js";

interface SubscriberListsQueryProps {
  tenantId: () => string | undefined;
  query?: () => string | undefined;
  cursor?: () => string | undefined;
  limit?: () => number | undefined;
}

export function useSubscriberListsQuery({ tenantId, query, cursor, limit }: SubscriberListsQueryProps) {
  const client = useApi();

  return useQuery(() => ({
    queryKey: subscriberListKeys.lists(tenantId(), query?.(), cursor?.(), limit?.()),
    queryFn: async () => {
      if (!tenantId()) return;
      const response = await client.GET("/api/v1/tenants/{tenant_id}/lists/", {
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
