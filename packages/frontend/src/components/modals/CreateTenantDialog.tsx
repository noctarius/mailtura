import { useQueryClient } from "@tanstack/solid-query";
import { CreateTenant } from "@mailtura/rpcmodel/api/request-response.js";
import { createFormSpec, FormSubmitHandler } from "../../forms/index.js";
import { useCreateMutation } from "../../services/adapters/useCreateMutation.js";
import { tenantKeys } from "../../services/tenants/keys.js";
import { UiForm } from "../../forms/UiForm.js";
import { UiDialog } from "../ui/UiDialog.js";
import { UiButton } from "../ui/UiButton.js";
import { toast } from "solid-toast";

const AVAILABLE_FEATURES = ["campaigns", "templates", "analytics"] as const;

interface CreateTenantDialogProps {
  onClose: () => void;
}

const featureOptions = () => AVAILABLE_FEATURES.map(feature => ({ label: feature, value: feature }));

export function CreateTenantDialog(props: CreateTenantDialogProps) {
  const queryClient = useQueryClient();

  const createTenantForm = createFormSpec<typeof CreateTenant>(
    CreateTenant,
    {
      name: {
        label: "Tenant Name",
        type: "text",
      },
      maxUsers: {
        label: "User Limit",
        type: "number",
        min: 0,
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
      maxUsers: 0,
      features: [...AVAILABLE_FEATURES],
    }
  );

  const createTenant = useCreateMutation("/api/v1/tenants/", {}, tenantKeys.tenants());

  const handleCreateTenant: FormSubmitHandler<CreateTenant> = async values => {
    const name = values.name.trim();
    if (name.length === 0) return Promise.reject(new Error("Tenant name cannot be empty"));

    const maxUsers = values.maxUsers ?? 0;
    if (!Number.isInteger(maxUsers) || maxUsers < 0) {
      return Promise.reject(new Error("User limit must be a non-negative integer"));
    }

    return new Promise((resolve, reject) => {
      createTenant.mutate(
        {
          name,
          active: true,
          maxUsers,
          features: values.features ?? [],
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: tenantKeys.tenants() });
            toast.success("Tenant created successfully.");
            props.onClose();
            resolve(undefined);
          },
          onError: error => {
            toast.error(`Failed to create tenant: ${String(error)}`);
            reject(error);
          },
        }
      );
    });
  };

  return (
    <UiDialog
      title={() => "Create Tenant"}
      subTitle={() => "Set user limit to 0 for unlimited users."}
      onClose={props.onClose}
      actions={
        <div class="flex justify-end w-full">
          <UiButton
            text="Cancel"
            loading={() => createTenant.isPending}
            onClick={props.onClose}
            primary={false}
          />
          <UiButton
            text="Create"
            loading={() => createTenant.isPending}
            onClick={createTenantForm.submitForm}
          />
        </div>
      }
    >
      <UiForm
        form={() => createTenantForm}
        onSubmit={handleCreateTenant}
        onCancel={props.onClose}
      />
    </UiDialog>
  );
}

