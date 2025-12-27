import { Download, Funnel, Plus, Search, TriangleAlert } from "lucide-solid";
import { createMemo, createSignal } from "solid-js";
import { BouncesTable } from "../components/interfaces/BouncesTable.js";
import { TableLoading } from "../components/interfaces/TableLoading.js";
import { TablePagination } from "../components/interfaces/TablePagination.js";
import { useTenantId } from "../hooks/useTenantId.js";
import { debounce } from "lodash";
import { useBouncesQuery } from "../services/bounces/use-bounces-query.js";

const Bounces = () => {
  const [bouncesTable, setBouncesTable] = createSignal<HTMLDivElement>();

  const tenantId = useTenantId();

  const [searchTerm, setSearchTerm] = createSignal("");
  const [selectedType, setSelectedType] = createSignal("all");
  const [pageCursor, setPageCursor] = createSignal<string | undefined>(undefined);

  const updateSearchTerm = debounce((v: string) => setSearchTerm(v), 250);

  const filterQuery = createMemo(() => {
    let query = undefined as string | undefined;
    const filterTerm = searchTerm();
    if (filterTerm.trim().length > 0) {
      query = `reason ILIKE "%${filterTerm}%"`;
    }
    if (selectedType() !== "all") {
      if (query) query = `(${query}) AND `;
      const type = selectedType() === "hard" ? "Hard" : "Soft";
      query = `${query ?? ""}bounceType = '${type}'`;
    }
    return query;
  });

  const bouncesQuery = useBouncesQuery({ tenantId, query: filterQuery, cursor: pageCursor });

  return (
    <div class="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div class="bg-white border-b border-gray-200 p-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Bounces</h1>
            <p class="text-gray-600">Manage bounced email addresses and delivery failures</p>
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
                placeholder="Search reasons..."
                value={searchTerm()}
                onInput={e => updateSearchTerm(e.currentTarget.value)}
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-96"
              />
            </div>

            <div class="flex items-center space-x-2">
              <Funnel class="w-5 h-5 text-gray-400" />
              <select
                value={selectedType()}
                onInput={e => setSelectedType(e.currentTarget.value)}
                class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="hard">Hard Bounces</option>
                <option value="soft">Soft Bounces</option>
              </select>
            </div>
          </div>

          <div class="text-sm text-gray-600">{bouncesQuery.data?.metadata?.totalItems ?? 0} total bounces</div>
        </div>
      </div>

      {/* Bounces Table */}
      <div class="pl-8 pr-8 pt-8 pb-3 flex flex-1 flex-col min-h-0">
        {bouncesQuery.isLoading ? (
          <TableLoading
            title="Loading bounces"
            text="Please wait while we load the latest bounces..."
          />
        ) : (
          <>
            <div class="flex flex-row min-h-0 relative">
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-1 flex-col min-h-0">
                <div
                  ref={setBouncesTable}
                  class="overflow-x-auto"
                >
                  <BouncesTable
                    data={() => bouncesQuery.data?.data || []}
                    target={bouncesTable()!}
                  />
                </div>
              </div>
            </div>
            <TablePagination
              pagination={() => bouncesQuery.data?.metadata}
              onPageChange={setPageCursor}
            />
          </>
        )}

        {bouncesQuery.data?.data?.length === 0 && !bouncesQuery.isLoading && (
          <div class="text-center py-12">
            <TriangleAlert class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No bounces found</h3>
            <p class="text-gray-600 mb-6">
              {searchTerm() || selectedType() !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Email bounces will appear here when delivery failures occur."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bounces;
