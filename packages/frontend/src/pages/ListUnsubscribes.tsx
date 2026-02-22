import { Download, Funnel, List, Plus, Search } from "lucide-solid";
import { createMemo, createSignal } from "solid-js";
import { debounce } from "lodash";
import { useTenantId } from "../hooks/useTenantId.js";
import { useSubscriberListsQuery } from "../services/subscriber-lists/use-subscriber-lists-query.js";
import { useListUnsubscribesQuery } from "../services/unsubscribes/use-list-unsubscribes-query.js";
import { TableLoading } from "../components/interfaces/TableLoading.js";
import { TablePagination } from "../components/interfaces/TablePagination.js";
import { ListUnsubscribesTable } from "../components/interfaces/ListUnsubscribesTable.js";
import { GLOBAL_UNSUBSCRIBE_LIST_ID } from "../constants/unsubscribes.js";

const ListUnsubscribes = () => {
  const [tableTarget, setTableTarget] = createSignal<HTMLDivElement>();

  const tenantId = useTenantId();

  const [searchTerm, setSearchTerm] = createSignal("");
  const [selectedList, setSelectedList] = createSignal("all");
  const [selectedSource, setSelectedSource] = createSignal("all");
  const [pageCursor, setPageCursor] = createSignal<string | undefined>(undefined);

  const updateSearchTerm = debounce((v: string) => setSearchTerm(v), 250);

  const subscriberListsQuery = useSubscriberListsQuery({ tenantId });
  const listNameById = createMemo(() => {
    const map = new Map<string, string>();
    (subscriberListsQuery.data || []).forEach(l => map.set(l.id, l.name));
    return map;
  });

  const toEnumSource = (label: string) => {
    switch (label) {
      case "Unsubscribe Link":
        return "UnsubscribeLink";
      case "Manual Addition":
        return "ManualAddition";
      case "API Request":
        return "Api";
      case "Bounce":
        return "Bounce";
      case "Other":
        return "Other";
      default:
        return undefined;
    }
  };

  const filterQuery = createMemo(() => {
    let query = `subscriberListId != '${GLOBAL_UNSUBSCRIBE_LIST_ID}'` as string | undefined;
    const filterTerm = searchTerm();
    if (filterTerm.trim().length > 0) {
      query = `${query} AND contactId ILIKE "%${filterTerm}%"`;
    }
    if (selectedList() !== "all") {
      query = `${query} AND subscriberListId = '${selectedList()}'`;
    }
    if (selectedSource() !== "all") {
      const enumSource = toEnumSource(selectedSource());
      if (enumSource) query = `${query} AND source = '${enumSource}'`;
    }
    return query;
  });

  const unsubscribesQuery = useListUnsubscribesQuery({ tenantId, query: filterQuery, cursor: pageCursor });

  return (
    <div class="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div class="bg-white border-b border-gray-200 p-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">List Unsubscribes</h1>
            <p class="text-gray-600">Manage list-specific unsubscribed email addresses</p>
          </div>
          <div class="flex items-center space-x-3">
            <button class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Download class="w-4 h-4" />
              <span>Export</span>
            </button>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus class="w-4 h-4" />
              <span>Add Email</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div class="bg-white border-b border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <Search class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search email addresses or lists..."
                value={searchTerm()}
                onInput={e => updateSearchTerm(e.currentTarget.value)}
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
            </div>

            <div class="flex items-center space-x-2">
              <Funnel class="w-5 h-5 text-gray-400" />
              <select
                value={selectedList()}
                onInput={e => setSelectedList(e.currentTarget.value)}
                class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Lists</option>
                {(subscriberListsQuery.data || [])
                  .toSort((a, b) => a.name.localeCompare(b.name))
                  .map(list => (
                    <option value={list.id}>{list.name}</option>
                  ))}
              </select>

              <select
                value={selectedSource()}
                onInput={e => setSelectedSource(e.currentTarget.value)}
                class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Sources</option>
                <option value="Unsubscribe Link">Unsubscribe Link</option>
                <option value="Manual Addition">Manual Addition</option>
                <option value="API Request">API Request</option>
                <option value="Bounce">Bounce</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div class="text-sm text-gray-600">
            {unsubscribesQuery.data?.metadata?.totalItems ?? 0} total unsubscribes
          </div>
        </div>
      </div>

      {/* Unsubscribes Table */}
      <div class="pl-8 pr-8 pt-8 pb-3 flex flex-1 flex-col min-h-0">
        {unsubscribesQuery.isLoading ? (
          <TableLoading
            title="Loading list unsubscribes"
            text="Please wait while we load the latest unsubscribes..."
          />
        ) : (
          <>
            <div class="flex flex-row min-h-0 relative">
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-1 flex-col min-h-0">
                <div
                  ref={setTableTarget}
                  class="overflow-x-auto"
                >
                  <ListUnsubscribesTable
                    data={() => unsubscribesQuery.data?.data || []}
                    listName={id => listNameById().get(id) || id}
                    target={tableTarget()!}
                  />
                </div>
              </div>
            </div>
            <TablePagination
              pagination={() => unsubscribesQuery.data?.metadata}
              onPageChange={setPageCursor}
            />
          </>
        )}

        {(unsubscribesQuery.data?.data || []).length === 0 && !unsubscribesQuery.isLoading && (
          <div class="text-center py-12">
            <List class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No list unsubscribes found</h3>
            <p class="text-gray-600 mb-6">
              {searchTerm() || selectedList() !== "all" || selectedSource() !== "all"
                ? "Try adjusting your search or filter criteria."
                : "List-specific unsubscribes will appear here when users opt out of specific lists."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListUnsubscribes;
