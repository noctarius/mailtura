import { Funnel, List, Loader, Plus, Search, UserPlus, Users } from "lucide-solid";
import { useContactsQuery } from "../services/contacts/use-contacts-query.js";
import { createMemo, createSignal } from "solid-js";
import { useSubscriberListsQuery } from "../services/subscriber-lists/use-subscriber-lists-query.js";
import { useSubscribersQuery } from "../services/subscriber-lists/use-subscribers-query.js";
import CreateContactModal from "../components/modals/CreateContactModal.js";
import CreateSubscriberListModal from "../components/modals/CreateSubscriberListModal.js";
import { useTenantId } from "../hooks/useTenantId.js";
import { ContactsTable } from "../components/interfaces/ContactsTable.js";

const Contacts = () => {
  const [contactsTable, setContactsTable] = createSignal<HTMLDivElement>();

  const tenantId = useTenantId();

  const [selectedList, setSelectedList] = createSignal("all");
  const [searchTerm, setSearchTerm] = createSignal("");
  const [selectedStatus, setSelectedStatus] = createSignal("all");
  const [showCreateContact, setShowCreateContact] = createSignal(false);
  const [showCreateList, setShowCreateList] = createSignal(false);

  const contactsQuery = useContactsQuery({ tenantId });
  const subscriberListsQuery = useSubscriberListsQuery({ tenantId });
  const subscribersQuery = useSubscribersQuery({ tenantId, subscriber_list_id: selectedList });

  const subscriberLists = createMemo(() => {
    return [
      {
        id: "all",
        name: "All Contacts",
        description: "All contacts",
        contactCount: contactsQuery.data?.length || 0,
      },
      ...(subscriberListsQuery.data || []).toSort((a, b) => a.name.localeCompare(b.name)),
    ];
  });

  const filteredContacts = createMemo(() =>
    (contactsQuery.data || []).filter(contact => {
      const matchesSearch =
        contact.email.toLowerCase().includes(searchTerm().toLowerCase()) ||
        contact.firstName?.toLowerCase().includes(searchTerm().toLowerCase()) ||
        contact.lastName?.toLowerCase().includes(searchTerm().toLowerCase());

      // Filter selected subscribers
      const isSubscribed =
        selectedList() === "all" ||
        (subscribersQuery.data || []).some(
          subscriber => subscriber.contactId === contact.id && subscriber.status === "Subscribed"
        );

      const matchesStatus = selectedStatus() === "all" || contact.status === selectedStatus();

      return matchesSearch && isSubscribed && matchesStatus;
    })
  );

  return (
    <div class="h-full flex flex-1 min-h-0 bg-gray-50">
      {/* Lists Sidebar */}
      <div class="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900">Subscriber Lists</h2>
            <button
              onClick={() => setShowCreateList(true)}
              class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Plus class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <div class="space-y-2">
            {subscriberLists()?.map(list => (
              <div
                onClick={() => setSelectedList(list.id)}
                class={`p-4 rounded-lg cursor-pointer transition-colors ${selectedList() === list.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50 border border-transparent"}`}
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center space-x-2">
                    <List class="w-4 h-4 text-gray-400" />
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
            <button
              onClick={() => setShowCreateContact(true)}
              class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <UserPlus class="w-5 h-5" />
              <span>Add Contact</span>
            </button>
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
                  onChange={e => setSearchTerm(e.target.value)}
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
              {filteredContacts.length} of {contactsQuery.data?.length || 0} contacts
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div class="p-8 flex flex-1 flex-col min-h-0">
          {contactsQuery.isLoading ? (
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
              <div class="flex flex-col items-center justify-center space-y-4">
                <div class="relative">
                  <Loader class="w-8 h-8 text-blue-600 animate-spin" />
                </div>
                <div class="text-center">
                  <h3 class="text-lg font-medium text-gray-900 mb-2">Loading Contacts</h3>
                  <p class="text-gray-600">Please wait while we fetch your contact data...</p>
                </div>
                {/* Loading skeleton */}
                <div class="w-full max-w-4xl mt-8 space-y-4">
                  {[...Array(5)].map(() => (
                    <div class="animate-pulse">
                      <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div class="flex-1 space-y-2">
                          <div class="h-4 bg-gray-300 rounded w-1/4"></div>
                          <div class="h-3 bg-gray-300 rounded w-1/3"></div>
                        </div>
                        <div class="flex space-x-2">
                          <div class="h-6 bg-gray-300 rounded-full w-16"></div>
                          <div class="h-6 bg-gray-300 rounded-full w-20"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredContacts().length > 0 ? (
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-1 flex-col min-h-0">
              <div
                ref={setContactsTable}
                class="overflow-auto relative"
                style={{ "scroll-behavior": "smooth", "min-height": "100%" }}
              >
                {contactsTable() && (
                  <ContactsTable
                    data={filteredContacts}
                    target={contactsTable()!}
                  />
                )}
              </div>
            </div>
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
      {showCreateContact() && <CreateContactModal onClose={() => setShowCreateContact(false)} />}
      {showCreateList() && <CreateSubscriberListModal onClose={() => setShowCreateList(false)} />}
    </div>
  );
};

export default Contacts;
