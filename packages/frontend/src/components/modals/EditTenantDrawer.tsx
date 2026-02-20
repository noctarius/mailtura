import { Pen } from "lucide-solid";
import { Tenant } from "@mailtura/rpcmodel/api/index.js";
import { UiSideDrawer } from "../ui/UiSideDrawer.js";
import { createFormSpec, FormSubmitHandler } from "../../forms/index.js";
import { UpdateTenant } from "@mailtura/rpcmodel/api/request-response.js";
import { UiForm } from "../../forms/UiForm.js";
import { UiButton } from "../ui/UiButton.js";
import { useUpdateMutation } from "../../services/adapters/useUpdateMutation.js";
import { useQueryClient } from "@tanstack/solid-query";

const AVAILABLE_FEATURES = ["campaigns", "templates", "analytics"] as const;

interface EditTenantDrawerProps {
  tenant: () => Tenant;
  isVisible: () => boolean;
  onClose: () => void;
}

const featureOptions = () => AVAILABLE_FEATURES.map(feature => ({ label: feature, value: feature }));

export function EditTenantDrawer(props: EditTenantDrawerProps) {
  const queryClient = useQueryClient();
  const canChangeName = props.tenant().name !== "::system::";

  const updateTenantForm = createFormSpec<typeof UpdateTenant>(
    UpdateTenant,
    {
      name: {
        label: "Tenant Name",
        type: "text",
        disabled: !canChangeName,
      },
      maxUsers: {
        label: "User Limit",
        type: "number",
        defaultValue: 0,
      },
      features: {
        label: "Features",
        type: "checkbox",
        options: featureOptions,
      },
    },
    ["name", "maxUsers", "features"],
    {
      name: props.tenant().name,
      maxUsers: props.tenant().maxUsers,
      features: props.tenant().features,
    }
  );

  const updateTenant = useUpdateMutation("/api/v1/tenants/{tenant_id}/", {
    tenant_id: () => props.tenant()?.id ?? "",
  });

  const handleUpdateTenant: FormSubmitHandler<UpdateTenant> = async values => {
    const name = canChangeName ? values.name?.trim() : undefined;
    const maxUsers = (values.maxUsers ?? 0) < 0 ? 0 : values.maxUsers;
    if ((name?.length ?? 1) === 0 || maxUsers === undefined) return Promise.reject(new Error("Invalid tenant payload"));

    return new Promise((resolve, reject) => {
      updateTenant.mutate(
        {
          name,
          maxUsers,
          features: values.features ?? [],
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["tenants"] });
            await queryClient.invalidateQueries({ queryKey: ["tenants", props.tenant().id] });
            props.onClose();
            resolve(undefined);
          },
          onError: error => {
            console.error("Error updating tenant:", error);
            reject(error);
          },
        }
      );
    });
  };

  return (
    <UiSideDrawer
      id={`edit-${props.tenant().id}`}
      show={props.isVisible}
      onClose={props.onClose}
      title={`Update tenant ${props.tenant().name}`}
      titleIcon={Pen}
    >
      <UiForm
        form={() => updateTenantForm}
        onSubmit={handleUpdateTenant}
        onCancel={props.onClose}
      />

      <div class="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
        <UiButton
          text="Cancel"
          loading={() => updateTenant.isPending}
          onClick={props.onClose}
          primary={false}
        />
        <UiButton
          text="Update Tenant"
          loading={() => updateTenant.isPending}
          onClick={updateTenantForm.submitForm}
        />
      </div>
    </UiSideDrawer>
  );
}
