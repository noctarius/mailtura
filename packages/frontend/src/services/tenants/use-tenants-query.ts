import { useApi } from "../../hooks/useApi.js";
import { useQuery } from "@tanstack/solid-query";
import { tenantKeys } from "./keys.js";

export function useTenantsQuery() {
  const client = useApi();

  return useQuery(() => ({
    queryKey: tenantKeys.tenants(),
    queryFn: async () => {
      const response = await client.GET("/api/v1/tenants/");

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },
  }));
}
