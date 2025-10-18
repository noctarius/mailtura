import { useTenantId } from "./useTenantId.js";
import { useSubscriberListsQuery } from "../services/subscriber-lists/use-subscriber-lists-query.js";

export function useSubscriberLists() {
  const tenantId = useTenantId();
  const subscriberListsQuery = useSubscriberListsQuery({ tenantId });

  return () => (subscriberListsQuery.data || []).toSort((a, b) => a.name.localeCompare(b.name));
}
