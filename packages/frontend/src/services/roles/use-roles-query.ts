import { useApi } from "../../hooks/useApi.js";
import { useQuery } from "@tanstack/solid-query";
import { roleKeys } from "./keys.js";

interface RolesQueryProps {
  tenantId: () => string | undefined;
}

export function useRolesQuery({ tenantId }: RolesQueryProps) {
  const client = useApi();

  return useQuery(() => ({
    queryKey: roleKeys.roles(tenantId() ?? undefined),
    queryFn: async () => {
      if (!tenantId()) return;
      const response = await client.GET("/api/v1/tenants/{tenant_id}/roles/", {
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
