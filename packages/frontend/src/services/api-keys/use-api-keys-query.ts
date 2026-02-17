import { useApi } from "../../hooks/useApi.js";
import { useQuery } from "@tanstack/solid-query";
import { apiKeyKeys } from "./keys.js";

interface ApiKeysQueryProps {
  tenantId: () => string | undefined;
}

export function useApiKeysQuery({ tenantId }: ApiKeysQueryProps) {
  const client = useApi();

  return useQuery(() => ({
    queryKey: apiKeyKeys.apiKeys(tenantId() ?? undefined),
    queryFn: async () => {
      if (!tenantId()) return;

      const response = await client.GET("/api/v1/tenants/{tenant_id}/api-keys/", {
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
