import { For } from "solid-js";
import { useSubscriberListsQuery } from "../../services/subscriber-lists/use-subscriber-lists-query.js";
import { useTenantId } from "../../hooks/useTenantId.js";
import { Contact } from "@mailtura/rpcmodel/api/index.js";
import { useDeleteMutation } from "../../services/adapters/useDeleteMutation.js";
import { useQueryClient } from "@tanstack/solid-query";
import TableCellChip from "../interfaces/TableCellChip.js";
import { UiApprovalDialog } from "../ui/UiApprovalDialog.js";
import { toast } from "solid-toast";

type DeleteContactDialogProps = {
  contact: () => Contact | undefined;
  onClose: () => void;
};

const DeleteContactDialog = (props: DeleteContactDialogProps) => {
  const queryClient = useQueryClient();
  const tenantId = useTenantId();

  const subscriberListsQuery = useSubscriberListsQuery({ tenantId });
  const subscriberLists = () =>
    (subscriberListsQuery.data || [])
      .filter(item => props.contact()?.subscriptions.includes(item.id))
      .toSort((a, b) => a.name.localeCompare(b.name));

  const deleteContact = useDeleteMutation("/api/v1/tenants/{tenant_id}/contacts/{contact_id}/", {
    tenant_id: tenantId,
    contact_id: () => props.contact()?.id || "",
  });

  const handleSubmit = async () => {
    if (!props.contact()) return;

    deleteContact.mutate({
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["lists", tenantId()] });
        await queryClient.invalidateQueries({ queryKey: ["contacts", tenantId()] });
        props.onClose();
        toast.success("Contact deleted successfully.");
      },
      onError: error => {
        toast.error(`Error deleting contact: ${error}`);
      },
    });
  };

  return (
    <UiApprovalDialog
      title={() => "Delete Contact"}
      submitText={() => "Delete contact"}
      onCancel={props.onClose}
      onClose={props.onClose}
      onConfirm={handleSubmit}
      isPending={() => deleteContact.isPending}
      message={() => (
        <>
          <p>
            You're about to delete a contact. However, the user is a member of one or more lists. Removing the contact
            will prevent the contact from receiving further communication.
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
        </>
      )}
    />
  );
};

export default DeleteContactDialog;
