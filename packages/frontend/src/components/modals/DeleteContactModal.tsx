import { createSignal, For } from "solid-js";
import { useSubscriberListsQuery } from "../../services/subscriber-lists/use-subscriber-lists-query.js";
import { useTenantId } from "../../hooks/useTenantId.js";
import { Contact } from "@mailtura/rpcmodel/lib/models/index.js";
import { useDeleteMutation } from "../../services/adapters/useDeleteMutation.js";
import { useQueryClient } from "@tanstack/solid-query";
import { contactsKeys } from "../../services/contacts/keys.js";
import { subscriberListKeys } from "../../services/subscriber-lists/keys.js";
import { UiDialog } from "../ui/UiDialog.js";
import TableCellChip from "../interfaces/TableCellChip.js";

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

  const actions = () => {
    return (
      <>
        {" "}
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
          Delete Contact
        </button>
      </>
    );
  };

  return (
    <UiDialog
      title={() => "Delete Contact"}
      actions={actions()}
      onClose={props.onClose}
    >
      <div class="space-y-4">
        <div>
          <p>
            You're about to delete a user. However, the user is a member of one or more lists. Removing the user will
            prevent the user from receiving further communication.
          </p>
          <p>
            {subscriberLists().length > 0 && (
              <div class="font-light text-xs mt-3 mb-3">
                <For each={subscriberLists()}>
                  {list => (
                    <TableCellChip
                      value={list.name}
                      bgColor="bg-green-100"
                      textColor="text-green-800"
                    />
                  )}
                </For>
              </div>
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
    </UiDialog>
  );
};

export default DeleteContactModal;
