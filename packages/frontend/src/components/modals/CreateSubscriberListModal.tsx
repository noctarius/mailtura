import { createStore } from "solid-js/store";
import { CreateSubscriberList } from "@mailtura/rpcmodel/lib/models/request-response.js";
import { useCreateMutation } from "../../services/adapters/useCreateMutation.js";
import { useTenantId } from "../../hooks/useTenantId.js";
import { subscriberListKeys } from "../../services/subscriber-lists/keys.js";
import { useQueryClient } from "@tanstack/solid-query";

interface CreateListModalProps {
  onClose: () => void;
}

const CreateSubscriberListModal = ({ onClose }: CreateListModalProps) => {
  const queryClient = useQueryClient();
  const tenantId = useTenantId();

  const [form, setForm] = createStore<CreateSubscriberList>({
    name: "",
    description: "",
  });

  const createSubscriberList = useCreateMutation("/api/v1/tenants/{tenant_id}/lists/", {
    tenant_id: tenantId,
  });

  const handleSubmit = async () => {
    setForm({
      name: form.name.trim(),
      description: form.description?.trim(),
    });
    if (form.name.trim()) {
      createSubscriberList.mutate(form, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: subscriberListKeys.lists(tenantId()) });
          setForm({
            name: "",
            description: "",
          });
          onClose();
        },
        onError: error => {
          console.error("Error creating list:", error);
        },
      });
    }
  };

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Create New List</h3>
          <button
            onClick={onClose}
            class="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">List Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Product Updates"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Brief description of this list..."
            />
          </div>
        </div>

        <div class="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={createSubscriberList.isPending}
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={createSubscriberList.isPending}
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create List
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSubscriberListModal;
