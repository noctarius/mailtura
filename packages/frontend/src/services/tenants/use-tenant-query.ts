import { useApi } from "../../hooks/useApi.js";
import { useQuery } from "@tanstack/solid-query";
import { tenantKeys } from "./keys.js";

interface TenantQueryProps {
  tenantId: () => string | null;
}

export function useTenantQuery({ tenantId }: TenantQueryProps) {
  const client = useApi();

  return useQuery(() => ({
    queryKey: tenantKeys.tenant(tenantId() ?? undefined),
    queryFn: async () => {
      if (!tenantId()) return;
      const response = await client.GET("/api/v1/tenants/{tenant_id}/", {
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
