import { useMutation } from "@tanstack/solid-query";
import { useApi } from "../../hooks/useApi.js";
import { ResponseError } from "../adapters/types.js";
import { maybeHandleError } from "../adapters/errors.js";
import { ImportContacts } from "@mailtura/rpcmodel/api/request-response.js";
import { ContactImport } from "@mailtura/rpcmodel/api/index.js";

interface ImportContactsMutationProps {
  file: File;
  parameters: ImportContacts;
}

const importContacts = async (
  client: ReturnType<typeof useApi>,
  tenantId: string,
  body: ImportContactsMutationProps
) => {
  const response = await client.POST("/api/v1/tenants/{tenant_id}/contacts/imports/", {
    params: {
      path: {
        tenant_id: tenantId,
      },
    },
    body: {
      // @ts-expect-error — openapi-fetch wants string, but runtime expects File
      file: body.file,
      parameters: body.parameters,
    },
    bodySerializer(body) {
      const formData = new FormData();
      formData.append("file", body.file);
      formData.append("parameters", JSON.stringify(body.parameters));
      return formData;
    }
  });

  if (maybeHandleError(response)) {
    return response.data;
  }
};

export function useImportContactsMutation({ tenantId }: { tenantId: string }) {
  const client = useApi();

  return useMutation<ContactImport | unknown, ResponseError, ImportContactsMutationProps>(() => ({
    mutationFn: body => importContacts(client, tenantId, body),
    onError: error => {
      console.error(error);
    },
  }));
}
