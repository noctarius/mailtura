import { keepPreviousData, useQuery } from "@tanstack/solid-query";
import { useApi } from "../../hooks/useApi.js";
import { contactsKeys } from "./keys.js";

interface ContactsQueryProps {
  tenantId: () => string | undefined;
  query: () => string | undefined;
  cursor: () => string | undefined;
  limit?: () => number | undefined;
}

export function useContactsQuery({ tenantId, query, cursor, limit }: ContactsQueryProps) {
  const client = useApi();

  const pageSize = limit?.() ?? 100;
  return useQuery(() => ({
    queryKey: contactsKeys.contacts(tenantId(), query?.(), cursor?.(), pageSize),
    placeholderData: keepPreviousData,
    queryFn: async () => {
      if (!tenantId()) return;
      const response = await client.GET("/api/v1/tenants/{tenant_id}/contacts/", {
        params: {
          path: {
            tenant_id: tenantId()!,
          },
          query: {
            limit: pageSize,
            query: query(),
            cursor: cursor(),
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
