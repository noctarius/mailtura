import { useQuery } from "@tanstack/solid-query";
import { useApi } from "../../hooks/useApi.js";
import { contactsKeys } from "./keys.js";

interface ContactsQueryProps {
  tenantId: string;
}

export function useContactsQuery({ tenantId }: ContactsQueryProps) {
  const client = useApi();

  return useQuery(() => ({
    queryKey: contactsKeys.contacts(tenantId),
    queryFn: async () => {
      const response = await client.GET("/api/v1/tenants/{tenant_id}/contacts/", {
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
