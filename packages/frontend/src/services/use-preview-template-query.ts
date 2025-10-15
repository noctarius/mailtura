import { useApi } from "../hooks/useApi.js";
import { useQuery } from "@tanstack/solid-query";
import * as murmurhash from "@timepp/murmurhash";

interface PreviewTemplateProps {
  tenantId: string;
  templateId: string;
  content: () => string;
}

const hash = (content: string) => murmurhash.murmurHash3_x86_128(content).toString();

export function usePreviewTemplateQuery({ tenantId, templateId, content }: PreviewTemplateProps) {
  const client = useApi();

  const cacheKey = () => ["template-preview", hash(content())];
  return useQuery(() => ({
    queryKey: cacheKey(),
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
