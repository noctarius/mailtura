import { createMemo, createSignal } from "solid-js";
import { Plus } from "lucide-solid";
import { useSubscriberListsQuery } from "../../services/subscriber-lists/use-subscriber-lists-query.js";
import { CreateContact, CreateSubscriberList } from "@mailtura/rpcmodel/lib/models/request-response.js";
import { useCreateMutation } from "../../services/adapters/useCreateMutation.js";
import { useQueryClient } from "@tanstack/solid-query";
import { contactsKeys } from "../../services/contacts/keys.js";
import { subscriberListKeys } from "../../services/subscriber-lists/keys.js";
import { useTenantId } from "../../hooks/useTenantId.js";
import { UiButton } from "../ui/UiButton.js";
import { createFormSpec, FormSubmitHandler } from "../../forms/index.js";
import { UiForm } from "../../forms/UiForm.js";
import { UiDialog } from "../ui/UiDialog.js";

type CreateContactModalProps = {
  onClose: () => void;
};

const CreateContactModal = ({ onClose }: CreateContactModalProps) => {
  const queryClient = useQueryClient();
  const tenantId = useTenantId();

  const [showNewSubscriberListInput, setShowNewSubscriberListInput] = createSignal(false);

  const subscriberListsQuery = useSubscriberListsQuery({ tenantId });
  const subscriberLists = () => (subscriberListsQuery.data || []).toSort((a, b) => a.name.localeCompare(b.name));

  const subscriberListOptions = createMemo(() =>
    subscriberLists().map(list => {
      return {
        label: list.name,
        value: list.id,
        description: list.description,
      };
    })
  );

  const newContactForm = createFormSpec<typeof CreateContact>(
    CreateContact,
    {
      email: {
        label: "Email Address",
        type: "email",
      },
      firstName: {
        label: "First Name",
        type: "text",
      },
      lastName: {
        label: "Last Name",
        type: "text",
      },
      listIds: {
        label: "Subscription",
        type: "checkbox",
        options: subscriberListOptions,
      },
    },
    ["email", "firstName", "lastName", "listIds"]
  );

  const newSubscriberListForm = createFormSpec<typeof CreateSubscriberList>(
    CreateSubscriberList,
    {
      name: {
        label: "",
        type: "text",
        placeholder: "List name",
      },
    },
    ["name"]
  );

  const createContact = useCreateMutation("/api/v1/tenants/{tenant_id}/contacts/", {
    tenant_id: tenantId,
  });

  const createSubscriberList = useCreateMutation("/api/v1/tenants/{tenant_id}/lists/", {
    tenant_id: tenantId,
  });

  const handleCreateNewContact: FormSubmitHandler<CreateContact> = async values => {
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

  const handleCreateNewSubscriberList: FormSubmitHandler<CreateSubscriberList> = values => {
    values.name = values.name.trim();
    if (values.name.length === 0) return Promise.reject("List name cannot be empty.");

    return new Promise((resolve, reject) => {
      createSubscriberList.mutate(values, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: subscriberListKeys.lists(tenantId()) });
          setShowNewSubscriberListInput(false);
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
        <UiButton
          text="Cancel"
          loading={() => createContact.isPending || createSubscriberList.isPending}
          onClick={onClose}
          primary={false}
        />
        <UiButton
          text="Add Contact"
          loading={() => createContact.isPending || createSubscriberList.isPending}
          onClick={() => newContactForm.submitForm()}
        />
      </div>
    );
  };

  return (
    <UiDialog
      title={() => "Add New Contact"}
      subTitle={() => "New contacts will be added to the default list."}
      onClose={onClose}
      actions={actions()}
    >
      <UiForm
        form={() => newContactForm}
        onSubmit={handleCreateNewContact}
        onCancel={onClose}
      />
      <div class="mt-3">
        {!showNewSubscriberListInput() ? (
          <button
            onClick={() => setShowNewSubscriberListInput(true)}
            class="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          >
            <Plus class="w-4 h-4" />
            <span>Create new list</span>
          </button>
        ) : (
          <div class="flex items-center space-x-2">
            <UiForm
              form={() => newSubscriberListForm}
              onSubmit={handleCreateNewSubscriberList}
              onCancel={() => setShowNewSubscriberListInput(false)}
            />
            <button
              onClick={() => newSubscriberListForm.submitForm()}
              disabled={createContact.isPending || createSubscriberList.isPending}
              class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowNewSubscriberListInput(false);
              }}
              disabled={createContact.isPending || createSubscriberList.isPending}
              class="px-3 py-2 text-gray-600 hover:text-gray-800 text-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </UiDialog>
  );
};

export default CreateContactModal;
