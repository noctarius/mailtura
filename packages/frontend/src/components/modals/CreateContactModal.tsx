import { createSignal } from "solid-js";
import { Plus } from "lucide-solid";
import { useSubscriberListsQuery } from "../../services/subscriber-lists/use-subscriber-lists-query.js";
import { CreateContact } from "@mailtura/rpcmodel/lib/models/request-response.js";
import { createStore } from "solid-js/store";
import { useCreateMutation } from "../../services/adapters/useCreateMutation.js";
import { useQueryClient } from "@tanstack/solid-query";
import { contactsKeys } from "../../services/contacts/keys.js";
import { subscriberListKeys } from "../../services/subscriber-lists/keys.js";
import { useTenantId } from "../../hooks/useTenantId.js";

type CreateContactModalProps = {
  onClose: () => void;
};

const CreateContactModal = ({ onClose }: CreateContactModalProps) => {
  const queryClient = useQueryClient();
  const tenantId = useTenantId();

  const [newListName, setNewListName] = createSignal("");
  const [showNewListInput, setShowNewListInput] = createSignal(false);
  const [form, setForm] = createStore<CreateContact>({
    email: "",
    firstName: undefined,
    lastName: undefined,
    listIds: [],
  });

  const subscriberListsQuery = useSubscriberListsQuery({ tenantId });
  const subscriberLists = () => (subscriberListsQuery.data || []).toSort((a, b) => a.name.localeCompare(b.name));

  const createContact = useCreateMutation("/api/v1/tenants/{tenant_id}/contacts/", {
    tenant_id: tenantId,
  });

  const createSubscriberList = useCreateMutation("/api/v1/tenants/{tenant_id}/lists/", {
    tenant_id: tenantId,
  });

  const handleListToggle = (listId: string) => {
    setForm(prev => ({
      ...prev,
      listIds: prev.listIds.includes(listId) ? prev.listIds.filter(id => id !== listId) : [...prev.listIds, listId],
    }));
  };

  const handleSubmit = async () => {
    if (!form.email || form.email.trim().length === 0) {
      return;
    }

    if (form.firstName && form.firstName.trim().length === 0) {
      form.firstName = undefined;
    }

    if (form.lastName && form.lastName.trim().length === 0) {
      form.lastName = undefined;
    }

    createContact.mutate(form, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: contactsKeys.contacts(tenantId()) });
        await queryClient.invalidateQueries({ queryKey: subscriberListKeys.lists(tenantId()) });
        for (const listId of form.listIds) {
          await queryClient.invalidateQueries({ queryKey: subscriberListKeys.subscribers(tenantId(), listId) });
        }
        onClose();
        setForm({
          email: "",
          firstName: undefined,
          lastName: undefined,
          listIds: [],
        });
      },
      onError: error => {
        console.error("Error creating contact:", error);
      },
    });
  };

  const handleAddNewList = () => {
    if (newListName().trim()) {
      createSubscriberList.mutate(
        {
          name: newListName(),
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: subscriberListKeys.lists(tenantId()) });
            setShowNewListInput(false);
            setNewListName("");
          },
          onError: error => {
            console.error("Error creating list:", error);
          },
        }
      );
    }
  };

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Add New Contact</h3>
          <button
            onClick={onClose}
            class="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={form.email}
              required
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="contact@example.com"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={form.firstName || ""}
                onChange={e => setForm(prev => ({ ...prev, firstName: e.target.value }))}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={form.lastName || ""}
                onChange={e => setForm(prev => ({ ...prev, lastName: e.target.value }))}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Subscriber Lists</label>
            <div class="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {subscriberLists()?.map(list => (
                <div class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`list-${list.id}`}
                    checked={form.listIds.includes(list.id)}
                    onChange={() => handleListToggle(list.id)}
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    for={`list-${list.id}`}
                    class="text-sm text-gray-700 flex-1"
                  >
                    {list.name}
                    {list.id === "all" && <span class="text-gray-400 ml-1">(automatic)</span>}
                  </label>
                </div>
              ))}
            </div>

            <div class="mt-3">
              {!showNewListInput ? (
                <button
                  onClick={() => setShowNewListInput(true)}
                  class="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                >
                  <Plus class="w-4 h-4" />
                  <span>Create new list</span>
                </button>
              ) : (
                <div class="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newListName()}
                    onChange={e => setNewListName(e.target.value)}
                    placeholder="List name"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleAddNewList}
                    disabled={createContact.isPending}
                    class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowNewListInput(false);
                      setNewListName("");
                    }}
                    disabled={createContact.isPending}
                    class="px-3 py-2 text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={createContact.isPending}
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={createContact.isPending}
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContactModal;
