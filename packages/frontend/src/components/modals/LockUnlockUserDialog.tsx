import { useTenantId } from "../../hooks/useTenantId.js";
import { useQueryClient } from "@tanstack/solid-query";
import { UiApprovalDialog } from "../ui/UiApprovalDialog.js";
import { toast } from "solid-toast";
import { User } from "@mailtura/rpcmodel/api/index.js";
import { userKeys } from "../../services/users/keys.js";
import { useUpdateMutation } from "../../services/adapters/useUpdateMutation.js";

type LockUnlockUserDialogProps = {
  user: () => User | undefined;
  onClose: () => void;
};

const LockUnlockUserDialog = (props: LockUnlockUserDialogProps) => {
  const queryClient = useQueryClient();
  const tenantId = useTenantId();
  const lock = props.user()?.active ?? true;

  const updateUser = useUpdateMutation("/api/v1/tenants/{tenant_id}/users/{user_id}/", {
    tenant_id: tenantId,
    user_id: () => props.user()?.id || "",
  });

  const handleSubmit = async () => {
    if (!props.user()) return;

    updateUser.mutate(
      {
        active: !lock,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: userKeys.user(tenantId()) });
          props.onClose();
          toast.success(`User ${lock ? "locked" : "unlocked"} successfully.`);
        },
        onError: error => {
          toast.error(`Error ${lock ? "locking" : "unlocking"} user: ${error}`);
        },
      }
    );
  };

  return (
    <UiApprovalDialog
      title={() => `${lock ? "Lock" : "Unlock"} User}`}
      submitText={() => `${lock ? "Lock" : "Unlock"} user`}
      onCancel={props.onClose}
      onClose={props.onClose}
      onConfirm={handleSubmit}
      isPending={() => updateUser.isPending}
      message={() => (
        <>
          <p>
            You're about to {lock ? "lock" : "unlock"} a user.{" "}
            {lock ? "Locking the user will prevent the user from logging into the system." : ""}
          </p>
        </>
      )}
    />
  );
};

export default LockUnlockUserDialog;
