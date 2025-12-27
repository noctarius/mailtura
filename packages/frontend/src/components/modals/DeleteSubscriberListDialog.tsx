import { useDeleteMutation } from "../../services/adapters/useDeleteMutation.js";
import { useTenantId } from "../../hooks/useTenantId.js";
import { useQueryClient } from "@tanstack/solid-query";
import { useSubscriberListsQuery } from "../../services/subscriber-lists/use-subscriber-lists-query.js";
import { UiApprovalDialog } from "../ui/UiApprovalDialog.js";
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
        await queryClient.invalidateQueries({ queryKey: ["lists", tenantId()] });
        await queryClient.invalidateQueries({ queryKey: ["contacts", tenantId()] });
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
    <UiApprovalDialog
      title={() => "Delete Subscriber List"}
      submitText={() => "Delete subscriber list"}
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
