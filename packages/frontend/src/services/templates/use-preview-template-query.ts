import { useApi } from "../../hooks/useApi.js";
import { useQuery } from "@tanstack/solid-query";
import { templateKeys } from "./keys.js";

interface PreviewTemplateProps {
  tenantId: string;
  templateId: string;
  content: () => string;
}

export function usePreviewTemplateQuery({ tenantId, templateId, content }: PreviewTemplateProps) {
  const client = useApi();

  return useQuery(() => ({
    queryKey: templateKeys.template_preview(tenantId, templateId, content()),
    queryFn: async () => {
      const response = await client.POST("/api/v1/tenants/{tenant_id}/templates/{template_id}/preview", {
        params: {
          path: {
            tenant_id: tenantId,
            template_id: templateId,
          },
        },
        body: {
          content: content(),
          data: {
            firstName: "John",
            lastName: "Doe",
          },
        },
        parseAs: "text",
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },
  }));
}
