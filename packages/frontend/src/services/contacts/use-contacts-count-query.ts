import { useQuery } from "@tanstack/solid-query";
import { useApi } from "../../hooks/useApi.js";
import { contactsKeys } from "./keys.js";

interface ContactsCountQueryProps {
  tenantId: () => string | undefined;
}

export function useContactsCountQuery({ tenantId }: ContactsCountQueryProps) {
  const client = useApi();

  return useQuery(() => ({
    queryKey: contactsKeys.contactsCount(tenantId()),
    queryFn: async () => {
      if (!tenantId()) return;
      const response = await client.GET("/api/v1/tenants/{tenant_id}/contacts/count/", {
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
