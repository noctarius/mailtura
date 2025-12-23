import { useQuery } from "@tanstack/solid-query";
import { useApi } from "../../hooks/useApi.js";
import { contactsKeys } from "./keys.js";

interface ContactsQueryProps {
  tenantId: () => string | undefined;
  query: () => string | undefined;
  cursor: () => string | undefined;
}

export function useContactsQuery({ tenantId, query, cursor }: ContactsQueryProps) {
  const client = useApi();

  return useQuery(() => ({
    queryKey: contactsKeys.contacts(tenantId(), query()),
    queryFn: async () => {
      if (!tenantId()) return;
      const response = await client.GET("/api/v1/tenants/{tenant_id}/contacts/", {
        params: {
          path: {
            tenant_id: tenantId()!,
          },
          query: {
            limit: 100,
            query: query(),
            cursor: cursor(),
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data.data;
    },
    enabled: !!tenantId(),
  }));
}
