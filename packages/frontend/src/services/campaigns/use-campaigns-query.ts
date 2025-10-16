import { useApi } from "../../hooks/useApi.js";
import { useQuery } from "@tanstack/solid-query";
import { campaignsKeys } from "./keys.js";

interface CampaignsQueryProps {
  tenantId: string;
}

export function useCampaignQuery({ tenantId }: CampaignsQueryProps) {
  const client = useApi();

  return useQuery(() => ({
    queryKey: campaignsKeys.campaigns(tenantId),
    queryFn: async () => {
      const response = await client.GET("/api/v1/tenants/{tenant_id}/campaigns/", {
        params: {
          path: {
            tenant_id: tenantId,
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },
  }));
}
