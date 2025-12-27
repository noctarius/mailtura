import { Funnel, List, Minus, Plus, Search, Upload, UserPlus, Users } from "lucide-solid";
import { useContactsQuery } from "../services/contacts/use-contacts-query.js";
import { createEffect, createMemo, createSignal } from "solid-js";
import { useSubscriberListsQuery } from "../services/subscriber-lists/use-subscriber-lists-query.js";
import CreateContactDialog from "../components/modals/CreateContactDialog.js";
import CreateSubscriberListDialog from "../components/modals/CreateSubscriberListDialog.js";
import { useTenantId } from "../hooks/useTenantId.js";
import { ContactsTable } from "../components/interfaces/ContactsTable.js";
import { ImportContactsDialog } from "../components/modals/ImportContactsDialog.js";
import { DeleteSubscriberListDialog } from "../components/modals/DeleteSubscriberListDialog.js";
import { debounce } from "lodash";
import { TableLoading } from "../components/interfaces/TableLoading.js";
import { useContactsCountQuery } from "../services/contacts/use-contacts-count-query.js";
import { TablePagination } from "../components/interfaces/TablePagination.js";

const Contacts = () => {
  const [contactsTable, setContactsTable] = createSignal<HTMLDivElement>();

  const tenantId = useTenantId();

  const [selectedList, setSelectedList] = createSignal("all");
  const [searchTerm, setSearchTerm] = createSignal("");
  const [selectedStatus, setSelectedStatus] = createSignal("all");
  const [showCreateContact, setShowCreateContact] = createSignal(false);
  const [showCreateSubscriberList, setShowCreateSubscriberList] = createSignal(false);
  const [showImportContacts, setShowImportContacts] = createSignal(false);
  const [listRemovalActive, setListRemovalActive] = createSignal(false);
  const [deleteSubscriberList, setDeleteSubscriberList] = createSignal<string | undefined>(undefined);
  const [showListRemovalConfirmation, setShowListRemovalConfirmation] = createSignal(false);
  const [pageCursor, setPageCursor] = createSignal<string | undefined>(undefined);

  const updateSearchTerm = debounce((searchTerm: string) => setSearchTerm(searchTerm), 250);

  const filterQuery = createMemo(() => {
    let query = undefined;
    const filterTerm = searchTerm();
    if (filterTerm.trim().length > 0) {
      query = `email ILIKE "%${filterTerm}%" OR firstName ILIKE "%${filterTerm}%" OR lastName ILIKE "%${filterTerm}%"`;
    }
    if (selectedStatus() !== "all") {
      if (query) query = `(${query}) AND `;
      if (selectedStatus() === "Bounced") {
        query = `${query ?? ""}bounces > 0`;
      } else if (selectedStatus() === "Unsubscribed") {
        query = `${query ?? ""}unsubscribes > 0`;
      } else {
        query = `${query ?? ""}(bounces = 0 AND unsubscribes = 0)`;
      }
    }
    if (selectedList() !== "all") {
      if (query) query = `(${query}) AND `;
      query = `${query ?? ""} subscriptions CONTAINS '${selectedList()}'`;
    }
    return query;
  });

  createEffect(() => {
    filterQuery();
    setPageCursor(undefined);
  });

  const contactsCountQuery = useContactsCountQuery({ tenantId });
  const contactsQuery = useContactsQuery({ tenantId, query: filterQuery, cursor: pageCursor });
  const subscriberListsQuery = useSubscriberListsQuery({ tenantId });

  const subscriberLists = createMemo(() => {
    return [
      {
        id: "all",
        name: "All Contacts",
        description: "All contacts",
        contactCount: contactsCountQuery.data?.count || 0,
      },
      ...(subscriberListsQuery.data || []).toSort((a, b) => a.name.localeCompare(b.name)),
    ];
  });

  const handleListRemovalClick = (event: Event, subscriberListId: string) => {
    event.stopPropagation();
    if (listRemovalActive()) {
      if (subscriberListId === "all") return;
      setDeleteSubscriberList(subscriberListId);
      setShowListRemovalConfirmation(true);
    } else {
      setSelectedList(subscriberListId);
    }
  };

  return (
    <div class="h-full flex flex-1 min-h-0 bg-gray-50">
      {/* Lists Sidebar */}
      <div class="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900">Subscriber Lists</h2>
            <div class="flex items-end space-x-1">
              <button
                onClick={() => setListRemovalActive(!listRemovalActive())}
                class="p-2 text-blue-600 hover:bg-blue-50 disabled:text-gray-600 disabled:hover:bg-white rounded-lg transition-colors"
              >
                <Minus class="w-5 h-5" />
              </button>
              <button
                disabled={listRemovalActive()}
                onClick={() => setShowCreateSubscriberList(true)}
                class="p-2 text-blue-600 hover:bg-blue-50 disabled:text-gray-600 disabled:hover:bg-white rounded-lg transition-colors"
              >
                <Plus class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <div class="space-y-2">
            {subscriberLists()?.map(list => (
              <div
                onClick={(event: Event) => handleListRemovalClick(event, list.id)}
                class={`p-4 rounded-lg cursor-pointer transition-colors full-row-checkbox ${!listRemovalActive() && selectedList() === list.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50 border border-transparent"}`}
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center space-x-2">
                    {listRemovalActive() && list.id !== "all" ? (
                      <Minus class="w-4 h-4" />
                    ) : (
                      <List class="w-4 h-4 text-gray-400" />
                    )}
                    <span class="font-medium text-gray-900">{list.name}</span>
                  </div>
                  <span class="text-sm font-medium text-gray-600">{list.contactCount.toLocaleString()}</span>
                </div>
                <p class="text-sm text-gray-600">{list.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div class="flex flex-1 flex-col min-h-0">
        {/* Header */}
        <div class="bg-white border-b border-gray-200 p-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">
                {subscriberLists()?.find(list => list.id === selectedList())?.name || "Contacts"}
              </h1>
              <p class="text-gray-600">Manage your contacts and subscriber lists </p>
            </div>
            <div class="flex items-end space-x-4">
              <button
                onClick={() => setShowImportContacts(true)}
                class="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <Upload class="w-5 h-5" />
                <span>Import CSV</span>
              </button>
              <button
                onClick={() => setShowCreateContact(true)}
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <UserPlus class="w-5 h-5" />
                <span>Add Contact</span>
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
                  placeholder="Search contacts..."
                  value={searchTerm()}
                  onInput={e => updateSearchTerm(e.target.value)}
                  class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                />
              </div>

              <div class="flex items-center space-x-2">
                <Funnel class="w-5 h-5 text-gray-400" />
                <select
                  value={selectedStatus()}
                  onChange={e => setSelectedStatus(e.target.value)}
                  class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="Subscribed">Subscribed</option>
                  <option value="Unsubscribed">Unsubscribed</option>
                  <option value="Bounced">Bounced</option>
                </select>
              </div>
            </div>

            <div class="text-sm text-gray-600">
              {contactsQuery.data?.metadata.totalItems ?? 0} of {contactsCountQuery.data?.count || 0} contacts
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div class="pl-8 pr-8 pt-8 pb-3 flex flex-1 flex-col min-h-0 relative">
          {contactsQuery.isLoading ? (
            <TableLoading
              title="Loading Contacts"
              text="Please wait while we fetch your contact data..."
            />
          ) : (contactsQuery.data?.data.length ?? 0 > 0) ? (
            <>
              <div class="flex flex-row flex-grow min-h-0 relative">
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-1 flex-col min-h-0">
                  <div
                    ref={setContactsTable}
                    class="overflow-auto relative rounded-xl min-h-100 scroll-smooth"
                  >
                    {contactsTable() && (
                      <ContactsTable
                        data={() => contactsQuery.data?.data ?? []}
                        target={contactsTable()!}
                      />
                    )}
                  </div>
                </div>
              </div>
              <TablePagination
                pagination={() => contactsQuery.data?.metadata}
                onPageChange={cursor => setPageCursor(cursor)}
              />
            </>
          ) : (
            <div class="text-center py-12">
              <Users class="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
              <p class="text-gray-600 mb-6">
                {searchTerm() || selectedStatus() !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by adding your first contact."}
              </p>
              <button
                onClick={() => setShowCreateContact(true)}
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Contact
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showCreateContact() && <CreateContactDialog onClose={() => setShowCreateContact(false)} />}
      {showCreateSubscriberList() && <CreateSubscriberListDialog onClose={() => setShowCreateSubscriberList(false)} />}
      {showImportContacts() && <ImportContactsDialog onClose={() => setShowImportContacts(false)} />}
      {showListRemovalConfirmation() && (
        <DeleteSubscriberListDialog
          subscriberListId={deleteSubscriberList}
          onClose={() => setShowListRemovalConfirmation(false)}
        />
      )}
    </div>
  );
};

export default Contacts;
