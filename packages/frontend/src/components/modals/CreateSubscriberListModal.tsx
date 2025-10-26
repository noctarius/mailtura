import { CreateSubscriberList } from "@mailtura/rpcmodel/lib/models/request-response.js";
import { useCreateMutation } from "../../services/adapters/useCreateMutation.js";
import { useTenantId } from "../../hooks/useTenantId.js";
import { subscriberListKeys } from "../../services/subscriber-lists/keys.js";
import { useQueryClient } from "@tanstack/solid-query";
import { createFormSpec, FormSubmitHandler } from "../../forms/index.js";
import { UiForm } from "../../forms/UiForm.js";
import { UiDialog } from "../ui/UiDialog.js";

interface CreateListModalProps {
  onClose: () => void;
}

const CreateSubscriberListModal = ({ onClose }: CreateListModalProps) => {
  const queryClient = useQueryClient();
  const tenantId = useTenantId();

  const newSubscriberListForm = createFormSpec<typeof CreateSubscriberList>(
    CreateSubscriberList,
    {
      name: {
        label: "List Name",
        type: "text",
        placeholder: "e.g., Product Updates",
      },
      description: {
        label: "Description",
        type: "text",
        placeholder: "Brief description of this list...",
      },
    },
    ["name", "description"]
  );

  const createSubscriberList = useCreateMutation("/api/v1/tenants/{tenant_id}/lists/", {
    tenant_id: tenantId,
  });

  const handleCreateNewSubscriberList: FormSubmitHandler<CreateSubscriberList> = async values => {
    values.name = values.name.trim();
    if (values.name.length === 0) return Promise.reject("List name cannot be empty.");
    return new Promise((resolve, reject) => {
      createSubscriberList.mutate(values, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: subscriberListKeys.lists(tenantId()) });
          onClose();
          resolve(undefined);
        },
        onError: error => {
          console.error("Error creating list:", error);
          reject(error);
        },
      });
    });
  };

  const actions = () => {
    return (
      <div class="flex justify-end w-full">
        <button
          onClick={onClose}
          disabled={createSubscriberList.isPending}
          class="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={newSubscriberListForm.submitForm}
          disabled={createSubscriberList.isPending}
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create List
        </button>
      </div>
    );
  };

  return (
    <UiDialog
      title={() => "Create New List"}
      actions={actions()}
      onClose={onClose}
    >
      <UiForm
        form={() => newSubscriberListForm}
        onSubmit={handleCreateNewSubscriberList}
        onCancel={onClose}
      />
    </UiDialog>
  );
};

export default CreateSubscriberListModal;
