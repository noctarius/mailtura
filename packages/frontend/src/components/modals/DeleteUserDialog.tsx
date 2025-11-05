import { useTenantId } from "../../hooks/useTenantId.js";
import { useDeleteMutation } from "../../services/adapters/useDeleteMutation.js";
import { useQueryClient } from "@tanstack/solid-query";
import { UiDeleteApprovalDialog } from "../ui/UiDeleteApprovalDialog.js";
import { toast } from "solid-toast";
import { User } from "@mailtura/rpcmodel/lib/models/index.js";
import { userKeys } from "../../services/users/keys.js";

type DeleteUserDialogProps = {
  user: () => User | undefined;
  onClose: () => void;
};

const DeleteUserDialog = (props: DeleteUserDialogProps) => {
  const queryClient = useQueryClient();
  const tenantId = useTenantId();

  const deleteUser = useDeleteMutation("/api/v1/tenants/{tenant_id}/users/{user_id}/", {
    tenant_id: tenantId,
    user_id: () => props.user()?.id || "",
  });

  const handleSubmit = async () => {
    if (!props.user()) return;

    deleteUser.mutate({
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: userKeys.user(tenantId()) });
        props.onClose();
        toast.success("Contact deleted successfully.");
      },
      onError: error => {
        toast.error(`Error deleting contact: ${error}`);
      },
    });
  };

  return (
    <UiDeleteApprovalDialog
      title={() => "Delete User"}
      onCancel={props.onClose}
      onClose={props.onClose}
      onConfirm={handleSubmit}
      isPending={() => deleteUser.isPending}
      message={() => (
        <>
          <p>You're about to delete a user. Removing the user will prevent the user from logging into the system.</p>
        </>
      )}
    />
  );
};

export default DeleteUserDialog;
