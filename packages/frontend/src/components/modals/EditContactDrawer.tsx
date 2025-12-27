import { UiSideDrawer } from "../ui/UiSideDrawer.js";
import { Pen } from "lucide-solid";
import { useQueryClient } from "@tanstack/solid-query";
import { useTenantId } from "../../hooks/useTenantId.js";
import { useSubscriberListsQuery } from "../../services/subscriber-lists/use-subscriber-lists-query.js";
import { createMemo } from "solid-js";
import { createFormSpec, FormSubmitHandler } from "../../forms/index.js";
import { UpdateContact } from "@mailtura/rpcmodel/api/request-response.js";
import { useUpdateMutation } from "../../services/adapters/useUpdateMutation.js";
import { subscriberListKeys } from "../../services/subscriber-lists/keys.js";
import { UiForm } from "../../forms/UiForm.js";
import { UiButton } from "../ui/UiButton.js";
import { Contact } from "@mailtura/rpcmodel/api/index.js";
import { contactsKeys } from "../../services/contacts/keys.js";

interface EditContactDrawerProps {
  contact: () => Contact;
  onClose: () => void;
  isVisible: () => boolean;
}

export function EditContactDrawer(props: EditContactDrawerProps) {
  return (
    <UiSideDrawer
      id={`edit-${props.contact().id}`}
      show={props.isVisible}
      onClose={props.onClose}
      title={`Update contact ${props.contact().email}`}
      titleIcon={Pen}
    >
      <ContactEditForm
        contact={props.contact}
        onClose={props.onClose}
      />
    </UiSideDrawer>
  );
}

interface ContactEditFormProps {
  contact: () => Contact;
  onClose: () => void;
}

function ContactEditForm(props: ContactEditFormProps) {
  const queryClient = useQueryClient();
  const tenantId = useTenantId();

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

  const updateContactForm = createFormSpec<typeof UpdateContact>(
    UpdateContact,
    {
      firstName: {
        label: "First Name",
        type: "text",
      },
      lastName: {
        label: "Last Name",
        type: "text",
      },
      subscriptions: {
        label: "Subscription",
        type: "checkbox",
        options: subscriberListOptions,
      },
    },
    ["firstName", "lastName", "subscriptions"],
    {
      firstName: props.contact().firstName,
      lastName: props.contact().lastName,
      subscriptions: props.contact().subscriptions,
    }
  );

  const updateContact = useUpdateMutation("/api/v1/tenants/{tenant_id}/contacts/{contact_id}/", {
    tenant_id: tenantId,
    contact_id: () => props.contact().id,
  });

  const handleUpdateContact: FormSubmitHandler<UpdateContact> = async values => {
    if (values.firstName && values.firstName.trim().length === 0) {
      values.firstName = undefined;
    }

    if (values.lastName && values.lastName.trim().length === 0) {
      values.lastName = undefined;
    }

    return new Promise((resolve, reject) => {
      updateContact.mutate(values, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: contactsKeys.contacts(tenantId()) });
          await queryClient.invalidateQueries({ queryKey: subscriberListKeys.lists(tenantId()) });
          for (const subscription of values.subscriptions || []) {
            await queryClient.invalidateQueries({ queryKey: subscriberListKeys.subscribers(tenantId(), subscription) });
          }
          props.onClose();
          resolve(undefined);
        },
        onError: error => {
          console.error("Error updating contact:", error);
          reject(error);
        },
      });
    });
  };

  return (
    <>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            disabled
            value={props.contact().email}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <UiForm
          form={() => updateContactForm}
          onSubmit={handleUpdateContact}
          onCancel={props.onClose}
        />
      </div>

      <div class="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
        <UiButton
          text="Cancel"
          loading={() => updateContact.isPending}
          onClick={props.onClose}
          primary={false}
        />
        <UiButton
          text="Update Contact"
          loading={() => updateContact.isPending}
          onClick={updateContactForm.submitForm}
        />
      </div>
    </>
  );
}
