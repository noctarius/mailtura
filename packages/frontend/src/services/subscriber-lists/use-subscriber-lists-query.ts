import { useApi } from "../../hooks/useApi.js";
import { useQuery } from "@tanstack/solid-query";
import { subscriberListKeys } from "./keys.js";

interface SubscriberListsQueryProps {
  tenantId: () => string | undefined;
}

export function useSubscriberListsQuery({ tenantId }: SubscriberListsQueryProps) {
  const client = useApi();

  return useQuery(() => ({
    queryKey: subscriberListKeys.lists(tenantId()),
    queryFn: async () => {
      if (!tenantId()) return;
      const response = await client.GET("/api/v1/tenants/{tenant_id}/lists/", {
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
