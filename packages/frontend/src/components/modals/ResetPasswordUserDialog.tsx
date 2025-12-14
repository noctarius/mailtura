import { UiApprovalDialog } from "../ui/UiApprovalDialog.js";
import { toast } from "solid-toast";
import { User } from "@mailtura/rpcmodel/api/index.js";
import { useAuth } from "../../hooks/useAuth.js";
import { createSignal } from "solid-js";

type ResetPasswordUserDialogProps = {
  user: () => User | undefined;
  onClose: () => void;
};

const ResetPasswordUserDialog = (props: ResetPasswordUserDialogProps) => {
  const auth = useAuth();
  const [isPending, setIsPending] = createSignal(false);

  const handleSubmit = async () => {
    if (!props.user()) return;

    try {
      setIsPending(true);
      await auth.requestPasswordReset(props.user()!.email);
      props.onClose();
      toast.success("Password reset email sent successfully.");
    } catch (error) {
      toast.error(`Resetting password failed: ${error}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <UiApprovalDialog
      title={() => "Reset user password"}
      submitText={() => "Reset password"}
      onCancel={props.onClose}
      onClose={props.onClose}
      onConfirm={handleSubmit}
      isPending={isPending}
      message={() => (
        <>
          <p>
            You're about to reset the user password for {props.user()?.email ?? ""}. The user will not be able to login
            until the password is reset.
          </p>
        </>
      )}
    />
  );
};

export default ResetPasswordUserDialog;
