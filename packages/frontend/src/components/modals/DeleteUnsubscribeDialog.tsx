import { useTenantId } from "../../hooks/useTenantId.js";
import { useDeleteMutation } from "../../services/adapters/useDeleteMutation.js";
import { useQueryClient } from "@tanstack/solid-query";
import { UiApprovalDialog } from "../ui/UiApprovalDialog.js";
import { toast } from "solid-toast";
import { Unsubscribe } from "@mailtura/rpcmodel/api/index.js";
import { unsubscribesKeys } from "../../services/unsubscribes/keys.js";

type DeleteUnsubscribeDialogProps = {
  unsubscribe: () => Unsubscribe | undefined;
  onClose: () => void;
};

const DeleteUnsubscribeDialog = (props: DeleteUnsubscribeDialogProps) => {
  const queryClient = useQueryClient();
  const tenantId = useTenantId();

  const deleteUnsubscribe = useDeleteMutation(
    "/api/v1/tenants/{tenant_id}/suppressions/unsubscribes/{unsubscribe_id}/",
    {
      tenant_id: tenantId,
      unsubscribe_id: () => props.unsubscribe()?.id || "",
    }
  );

  const handleSubmit = async () => {
    if (!props.unsubscribe()) return;

    deleteUnsubscribe.mutate({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: unsubscribesKeys.unsubscribes(tenantId()),
        });
        props.onClose();
        toast.success("Unsubscribe deleted successfully.");
      },
      onError: error => {
        toast.error(`Error deleting unsubscribe: ${error}`);
      },
    });
  };

  return (
    <UiApprovalDialog
      title={() => "Delete Unsubscribe"}
      submitText={() => "Delete Unsubscribe"}
      onCancel={props.onClose}
      onClose={props.onClose}
      onConfirm={handleSubmit}
      isPending={() => deleteUnsubscribe.isPending}
      message={() => (
        <>
          <p>
            You're about to delete an unsubscribe from a contact. When users unsubscribe from a list, they don't want to
            receive further communication. Removing the unsubscribe may lead to sending emails to contacts who have
            explicitly opted out, which can damage your sender reputation.
          </p>
        </>
      )}
    />
  );
};

export default DeleteUnsubscribeDialog;
