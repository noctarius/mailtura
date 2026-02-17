import { Accessor } from "solid-js";
import { ApiKey } from "@mailtura/rpcmodel/api/index.js";
import { useTenantId } from "../../hooks/useTenantId.js";
import { useDeleteMutation } from "../../services/adapters/useDeleteMutation.js";
import { useQueryClient } from "@tanstack/solid-query";
import { UiApprovalDialog } from "../ui/UiApprovalDialog.js";
import { toast } from "solid-toast";
import { apiKeyKeys } from "../../services/api-keys/keys.js";

type DeleteApiKeyDialogProps = {
  apiKey: Accessor<ApiKey | undefined>;
  onClose: () => void;
};

const DeleteApiKeyDialog = (props: DeleteApiKeyDialogProps) => {
  const queryClient = useQueryClient();
  const tenantId = useTenantId();

  const deleteApiKey = useDeleteMutation("/api/v1/tenants/{tenant_id}/api-keys/{api_key_id}/", {
    tenant_id: tenantId,
    api_key_id: () => props.apiKey()?.id || "",
  });

  const handleSubmit = () => {
    if (!props.apiKey()) return;

    deleteApiKey.mutate({
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: apiKeyKeys.apiKeys(tenantId() ?? undefined) });
        props.onClose();
        toast.success("API key deleted successfully.");
      },
      onError: error => {
        toast.error(`Error deleting API key: ${error}`);
      },
    });
  };

  return (
    <UiApprovalDialog
      title={() => "Delete API Key"}
      submitText={() => "Delete API key"}
      onCancel={props.onClose}
      onClose={props.onClose}
      onConfirm={handleSubmit}
      isPending={() => deleteApiKey.isPending}
      message={() => (
        <>
          <p>You are about to delete API key "{props.apiKey()?.name}". This action cannot be undone.</p>
        </>
      )}
    />
  );
};

export default DeleteApiKeyDialog;
