import { createSignal } from "solid-js";
import { Plus } from "lucide-solid";
import { useSubscriberListsQuery } from "../../services/subscriber-lists/use-subscriber-lists-query.js";
import { CreateContact, CreateSubscriberList } from "@mailtura/rpcmodel/lib/models/request-response.js";
import { useCreateMutation } from "../../services/adapters/useCreateMutation.js";
import { useQueryClient } from "@tanstack/solid-query";
import { contactsKeys } from "../../services/contacts/keys.js";
import { subscriberListKeys } from "../../services/subscriber-lists/keys.js";
import { useTenantId } from "../../hooks/useTenantId.js";
import { createForm, email, required, submit, SubmitHandler } from "@modular-forms/solid";
import { UiButton } from "../ui/UiButton.js";

type CreateContactModalProps = {
  onClose: () => void;
};

const CreateContactModal = ({ onClose }: CreateContactModalProps) => {
  const queryClient = useQueryClient();
  const tenantId = useTenantId();

  const [showNewListInput, setShowNewListInput] = createSignal(false);

  const [newContactForm, { Form: ContactForm, Field: ContactField }] = createForm<CreateContact>();
  const [newListForm, { Form: ListForm, Field: ListField }] = createForm<CreateSubscriberList>();

  const subscriberListsQuery = useSubscriberListsQuery({ tenantId });
  const subscriberLists = () => (subscriberListsQuery.data || []).toSort((a, b) => a.name.localeCompare(b.name));

  const createContact = useCreateMutation("/api/v1/tenants/{tenant_id}/contacts/", {
    tenant_id: tenantId,
  });

  const createSubscriberList = useCreateMutation("/api/v1/tenants/{tenant_id}/lists/", {
    tenant_id: tenantId,
  });

  const handleCreateNewContact: SubmitHandler<CreateContact> = async (values, event) => {
    event.stopPropagation();
    if (!values.email || values.email.trim().length === 0) {
      return;
    }

    if (values.firstName && values.firstName.trim().length === 0) {
      values.firstName = undefined;
    }

    if (values.lastName && values.lastName.trim().length === 0) {
      values.lastName = undefined;
    }

    return new Promise((resolve, reject) => {
      createContact.mutate(values, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: contactsKeys.contacts(tenantId()) });
          await queryClient.invalidateQueries({ queryKey: subscriberListKeys.lists(tenantId()) });
          for (const listId of values.listIds) {
            await queryClient.invalidateQueries({ queryKey: subscriberListKeys.subscribers(tenantId(), listId) });
          }
          onClose();
          resolve(undefined);
        },
        onError: error => {
          console.error("Error creating contact:", error);
          reject(error);
        },
      });
    });
  };

  const handleCreateNewList: SubmitHandler<CreateSubscriberList> = (values, event) => {
    event.stopPropagation();

    values.name = values.name.trim();
    if (values.name.length === 0) return false;

    return new Promise((resolve, reject) => {
      createSubscriberList.mutate(values, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: subscriberListKeys.lists(tenantId()) });
          setShowNewListInput(false);
          resolve(undefined);
        },
        onError: error => {
          console.error("Error creating list:", error);
          reject(error);
        },
      });
    });
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

        <ContactForm onSubmit={handleCreateNewContact}>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <ContactField
                name="email"
                validate={[required("Please enter your email."), email("The email address is badly formatted.")]}
              >
                {(field, props) => (
                  <>
                    <input
                      {...props}
                      type="email"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="contact@example.com"
                    />
                    {field.error && <div>{field.error}</div>}
                  </>
                )}
              </ContactField>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <ContactField name="firstName">
                  {(field, props) => (
                    <>
                      <input
                        {...props}
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John"
                      />
                      {field.error && <div>{field.error}</div>}
                    </>
                  )}
                </ContactField>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <ContactField name={"lastName"}>
                  {(field, props) => (
                    <>
                      <input
                        {...props}
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Doe"
                      />
                      {field.error && <div>{field.error}</div>}
                    </>
                  )}
                </ContactField>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Subscriber Lists</label>
              <div class="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {subscriberLists()?.map(list => (
                  <div class="flex items-center space-x-2">
                    <ContactField
                      name="listIds"
                      type="string[]"
                      validate={[required("Please select at least one list.")]}
                    >
                      {(field, props) => (
                        <>
                          <input
                            {...props}
                            type="checkbox"
                            id={list.id}
                            value={list.id}
                            checked={field.value?.includes(list.id) || false}
                            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          {field.error && <div>{field.error}</div>}
                        </>
                      )}
                    </ContactField>
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
                {!showNewListInput() ? (
                  <button
                    onClick={() => setShowNewListInput(true)}
                    class="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <Plus class="w-4 h-4" />
                    <span>Create new list</span>
                  </button>
                ) : (
                  <ListForm onSubmit={handleCreateNewList}>
                    <div class="flex items-center space-x-2">
                      <ListField
                        name="name"
                        validate={[required("Please enter a list name.")]}
                      >
                        {(field, props) => (
                          <>
                            {" "}
                            <input
                              {...props}
                              type="text"
                              placeholder="List name"
                              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                            {field.error && <div>{field.error}</div>}
                          </>
                        )}
                      </ListField>
                      <button
                        onClick={() => submit(newListForm)}
                        disabled={createContact.isPending || createSubscriberList.isPending}
                        class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setShowNewListInput(false);
                        }}
                        disabled={createContact.isPending || createSubscriberList.isPending}
                        class="px-3 py-2 text-gray-600 hover:text-gray-800 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </ListForm>
                )}
              </div>
            </div>
          </div>
        </ContactForm>

        <div class="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
          <UiButton
            text="Cancel"
            loading={() => createContact.isPending || createSubscriberList.isPending}
            onClick={onClose}
            primary={false}
          />
          <UiButton
            text="Add Contact"
            loading={() => createContact.isPending || createSubscriberList.isPending}
            onClick={() => submit(newContactForm)}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateContactModal;
