import { useDeleteMutation } from "../../services/adapters/useDeleteMutation.js";
import { useTenantId } from "../../hooks/useTenantId.js";
import { useQueryClient } from "@tanstack/solid-query";
import { subscriberListKeys } from "../../services/subscriber-lists/keys.js";
import { contactsKeys } from "../../services/contacts/keys.js";
import { useSubscriberListsQuery } from "../../services/subscriber-lists/use-subscriber-lists-query.js";
import { UiDeleteApprovalDialog } from "../ui/UiDeleteApprovalDialog.js";
import { toast } from "solid-toast";

interface DeleteSubscriberListDialogProps {
  subscriberListId: () => string | undefined;
  onClose: () => void;
}

export function DeleteSubscriberListDialog(props: DeleteSubscriberListDialogProps) {
  const queryClient = useQueryClient();
  const tenantId = useTenantId();

  const { data: subscriberLists } = useSubscriberListsQuery({ tenantId });

  const deleteSubscriberLists = useDeleteMutation("/api/v1/tenants/{tenant_id}/lists/{subscriber_list_id}/", {
    tenant_id: tenantId,
    subscriber_list_id: () => props.subscriberListId() || "",
  });

  const handleSubmit = async () => {
    if (!props.subscriberListId()) return;

    deleteSubscriberLists.mutate({
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: contactsKeys.contacts(tenantId()) });
        await queryClient.invalidateQueries({ queryKey: subscriberListKeys.lists(tenantId()) });
        props.onClose();
        toast.success("Subscriber list deleted successfully.");
      },
      onError: error => {
        toast.error(`Error deleting subscriber list: ${error}`);
      },
    });
  };

  const subscriberList = () => subscriberLists?.find(item => item.id === props.subscriberListId());

  return (
    <UiDeleteApprovalDialog
      title={() => "Delete Subscriber List"}
      onCancel={props.onClose}
      onClose={props.onClose}
      onConfirm={handleSubmit}
      requiresApproval={() => false}
      isPending={() => deleteSubscriberLists.isPending}
      message={() => (
        <p>
          You're about to delete subscriber list '{subscriberList()?.name ?? ""}'. Users who are subscribed to this list
          will not be removed but stay available to other lists.
        </p>
      )}
    />
  );
}
