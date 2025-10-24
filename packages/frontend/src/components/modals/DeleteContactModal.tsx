import { createSignal, For } from "solid-js";
import { useSubscriberListsQuery } from "../../services/subscriber-lists/use-subscriber-lists-query.js";
import { useTenantId } from "../../hooks/useTenantId.js";
import { Contact } from "@mailtura/rpcmodel/lib/models/index.js";
import { useDeleteMutation } from "../../services/adapters/useDeleteMutation.js";
import { useQueryClient } from "@tanstack/solid-query";
import { contactsKeys } from "../../services/contacts/keys.js";
import { subscriberListKeys } from "../../services/subscriber-lists/keys.js";

type DeleteContactModalProps = {
  contact: () => Contact | undefined;
  onClose: () => void;
};

const DeleteContactModal = (props: DeleteContactModalProps) => {
  const queryClient = useQueryClient();
  const tenantId = useTenantId();

  const [approval, setApproval] = createSignal("");

  const subscriberListsQuery = useSubscriberListsQuery({ tenantId });
  const subscriberLists = () =>
    (subscriberListsQuery.data || [])
      .filter(item => props.contact()?.listIds.includes(item.id))
      .toSort((a, b) => a.name.localeCompare(b.name));

  const deleteContact = useDeleteMutation("/api/v1/tenants/{tenant_id}/contacts/{contact_id}/", {
    tenant_id: tenantId,
    contact_id: () => props.contact()?.id || "",
  });

  const handleSubmit = async () => {
    if (approval() !== "yes") return;

    deleteContact.mutate({
      onSuccess: async () => {
        setApproval("");
        await queryClient.invalidateQueries({ queryKey: contactsKeys.contacts(tenantId()) });
        await queryClient.invalidateQueries({ queryKey: subscriberListKeys.lists(tenantId()) });
        props.onClose();
      },
      onError: error => {
        console.error("Error deleting contact:", error);
      },
    });
  };

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Delete Contact</h3>
          <button
            onClick={() => props.onClose()}
            class="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <p>
              You're about to delete a user. However, the user is a member of one or more lists. Removing the user will
              prevent the user from receiving further communication.
            </p>
            <p>
              {subscriberLists().length > 0 && (
                <ul>
                  <For each={subscriberLists()}>{list => <li>{list.name}</li>}</For>
                </ul>
              )}
            </p>
          </div>
        </div>

        <div class="mt-3 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Approval</label>
            <input
              type="text"
              value={approval() || ""}
              required
              onChange={e => setApproval(e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="yes"
            />
          </div>
        </div>

        <div class="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={props.onClose}
            disabled={deleteContact.isPending}
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={deleteContact.isPending}
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteContactModal;
