import { useApi } from "../../hooks/useApi.js";
import { useQuery } from "@tanstack/solid-query";
import { subscriberListKey } from "./keys.js";

interface SubscribersQueryProps {
  tenantId: () => string | undefined;
  subscriber_list_id: () => string | undefined;
}

export function useSubscribersQuery({ tenantId, subscriber_list_id }: SubscribersQueryProps) {
  const client = useApi();

  return useQuery(() => ({
    queryKey: subscriberListKey.subscribers(tenantId(), subscriber_list_id()),
    queryFn: async () => {
      const response = await client.GET("/api/v1/tenants/{tenant_id}/lists/{subscriber_list_id}/subscribers/", {
        params: {
          path: {
            tenant_id: tenantId()!,
            subscriber_list_id: subscriber_list_id()!,
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },
    enabled: !!tenantId() && !!subscriber_list_id() && subscriber_list_id() !== "all",
  }));
}
