import { useApi } from "../../hooks/useApi.js";
import { useQuery } from "@tanstack/solid-query";
import { roleKeys } from "./keys.js";

interface RoleQueryProps {
  tenantId: () => string | undefined;
  roleId: () => string | undefined;
}

export function useRoleQuery({ tenantId, roleId }: RoleQueryProps) {
  const client = useApi();

  return useQuery(() => ({
    queryKey: roleKeys.role(tenantId() ?? undefined, roleId() ?? undefined),
    queryFn: async () => {
      if (!tenantId()) return;
      const response = await client.GET("/api/v1/tenants/{tenant_id}/roles/{role_id}/", {
        params: {
          path: {
            tenant_id: tenantId()!,
            role_id: roleId()!,
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },
    enabled: !!tenantId() && !!roleId(),
  }));
}
