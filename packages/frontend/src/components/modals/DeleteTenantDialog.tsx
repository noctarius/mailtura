import { useQueryClient } from "@tanstack/solid-query";
import { Tenant } from "@mailtura/rpcmodel/api/index.js";
import { useDeleteMutation } from "../../services/adapters/useDeleteMutation.js";
import { tenantKeys } from "../../services/tenants/keys.js";
import { UiApprovalDialog } from "../ui/UiApprovalDialog.js";
import { toast } from "solid-toast";

interface DeleteTenantDialogProps {
  tenant: () => Tenant | undefined;
  onClose: () => void;
}

export function DeleteTenantDialog(props: DeleteTenantDialogProps) {
  const queryClient = useQueryClient();
  const isSystemTenant = () => props.tenant()?.name === "::system::";

  const deleteTenant = useDeleteMutation(
    "/api/v1/tenants/{tenant_id}/",
    {
      tenant_id: () => props.tenant()?.id ?? "",
    },
    tenantKeys.tenants()
  );

  const handleSubmit = async () => {
    if (!props.tenant()) return;
    if (isSystemTenant()) {
      toast.error("The system tenant cannot be deleted.");
      return;
    }

    deleteTenant.mutate({
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: tenantKeys.tenants() });
        props.onClose();
        toast.success("Tenant deleted successfully.");
      },
      onError: error => {
        toast.error(`Failed to delete tenant: ${String(error)}`);
      },
    });
  };

  return (
    <UiApprovalDialog
      title={() => "Delete Tenant"}
      submitText={() => "Delete tenant"}
      onCancel={props.onClose}
      onClose={props.onClose}
      onConfirm={handleSubmit}
      isPending={() => deleteTenant.isPending}
      requiresApproval={() => !isSystemTenant()}
      message={() => (
        <p>
          {isSystemTenant() ? (
            <>The system tenant cannot be deleted.</>
          ) : (
            <>
              You are about to delete tenant "<strong>{props.tenant()?.name}</strong>". This action cannot be undone.
            </>
          )}
        </p>
      )}
    />
  );
}
