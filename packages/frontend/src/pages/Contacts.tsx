import {
  Calendar,
  CreditCard as Edit,
  Ellipsis,
  Funnel,
  List,
  Loader,
  Mail,
  Plus,
  Search,
  UserPlus,
  Users,
} from "lucide-solid";
import { TailwindBgColor } from "../helpers/tailwind-bg-colors.ts";
import { TailwindTextColor } from "../helpers/tailwind-text-colors.ts";
import { useContactsQuery } from "../services/contacts/use-contacts-query.js";
import TableCellChip from "../components/interfaces/TableCellChip.js";
import { createMemo, createSignal } from "solid-js";
import { useSubscriberListsQuery } from "../services/subscriber-lists/use-subscriber-lists-query.js";
import { useAuth } from "../hooks/useAuth.js";
import { useSubscribersQuery } from "../services/subscriber-lists/use-subscribers-query.js";

const Contacts = () => {
  const auth = useAuth();

  const tenantId = () => auth.tenant()?.id;

  const [selectedList, setSelectedList] = createSignal("all");
  const [searchTerm, setSearchTerm] = createSignal("");
  const [selectedStatus, setSelectedStatus] = createSignal("all");
  const [showAddContact, setShowAddContact] = createSignal(false);
  const [showAddList, setShowAddList] = createSignal(false);

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
      ...(subscriberListsQuery.data || []).sort((a, b) => a.name.localeCompare(b.name)),
    ];
  });

  const getStatusBgColor = (status: string): TailwindBgColor => {
    switch (status) {
      case "subscribed":
        return "bg-green-100";
      case "unsubscribed":
        return "bg-gray-100";
      case "bounced":
        return "bg-red-100";
      default:
        return "bg-gray-100";
    }
  };

  const getStatusTextColor = (status: string): TailwindTextColor => {
    switch (status) {
      case "subscribed":
        return "text-green-800";
      case "unsubscribed":
        return "text-gray-800";
      case "bounced":
        return "text-red-800";
      default:
        return "text-gray-800";
    }
  };

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

  const AddContactModal = () => {
    const [newContact, setNewContact] = createSignal({
      email: "",
      firstName: "",
      lastName: "",
      selectedLists: [] as string[],
    });
    const [newListName, setNewListName] = createSignal("");
    const [showNewListInput, setShowNewListInput] = createSignal(false);

    const handleListToggle = (listId: string) => {
      if (listId === "all") return; // Can't toggle "All Contacts"

      setNewContact(prev => ({
        ...prev,
        selectedLists: prev.selectedLists.includes(listId)
          ? prev.selectedLists.filter(id => id !== listId)
          : [...prev.selectedLists, listId],
      }));
    };

    const handleAddNewList = () => {
      if (newListName().trim()) {
        // In a real app, this would create the list via API
        console.log("Creating new list:", newListName);
        setNewListName("");
        setShowNewListInput(false);
      }
    };

    return (
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Add New Contact</h3>
            <button
              onClick={() => setShowAddContact(false)}
              class="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={newContact().email}
                onChange={e => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="contact@example.com"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={newContact().firstName}
                  onChange={e => setNewContact(prev => ({ ...prev, firstName: e.target.value }))}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={newContact().lastName}
                  onChange={e => setNewContact(prev => ({ ...prev, lastName: e.target.value }))}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Subscriber Lists</label>
              <div class="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {subscriberLists()?.map(list => (
                  <div class="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`list-${list.id}`}
                      checked={list.id === "all" || newContact().selectedLists.includes(list.id)}
                      disabled={list.id === "all"}
                      onChange={() => handleListToggle(list.id)}
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      for={`list-${list.id}`}
                      class="text-sm text-gray-700 flex-1"
                    >
                      {list.name}
                      {list.id === "all" && <span class="text-gray-400 ml-1">(automatic)</span>}
                    </label>
                  </div>
                ))}
              </div>

              <div class="mt-3">
                {!showNewListInput ? (
                  <button
                    onClick={() => setShowNewListInput(true)}
                    class="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <Plus class="w-4 h-4" />
                    <span>Create new list</span>
                  </button>
                ) : (
                  <div class="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newListName()}
                      onChange={e => setNewListName(e.target.value)}
                      placeholder="List name"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={handleAddNewList}
                      class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowNewListInput(false);
                        setNewListName("");
                      }}
                      class="px-3 py-2 text-gray-600 hover:text-gray-800 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowAddContact(false)}
              class="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Contact</button>
          </div>
        </div>
      </div>
    );
  };

  const AddListModal = () => {
    const [listData, setListData] = createSignal({
      name: "",
      description: "",
    });

    return (
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-6 w-full max-w-md">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Create New List</h3>
            <button
              onClick={() => setShowAddList(false)}
              class="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">List Name</label>
              <input
                type="text"
                value={listData().name}
                onChange={e => setListData(prev => ({ ...prev, name: e.target.value }))}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Product Updates"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={listData().description}
                onChange={e => setListData(prev => ({ ...prev, description: e.target.value }))}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Brief description of this list..."
              />
            </div>
          </div>

          <div class="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowAddList(false)}
              class="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create List</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div class="h-full flex bg-gray-50">
      {/* Lists Sidebar */}
      <div class="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900">Subscriber Lists</h2>
            <button
              onClick={() => setShowAddList(true)}
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
      <div class="flex-1 flex flex-col">
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
              onClick={() => setShowAddContact(true)}
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
        <div class="flex-1 overflow-auto p-8">
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
          ) : (
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th class="text-left py-4 px-6 font-semibold text-gray-900">Contact</th>
                      <th class="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                      <th class="text-left py-4 px-6 font-semibold text-gray-900">Lists</th>
                      <th class="text-left py-4 px-6 font-semibold text-gray-900">Subscribed</th>
                      <th class="text-left py-4 px-6 font-semibold text-gray-900 whitespace-nowrap">Last Activity</th>
                      <th class="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    {filteredContacts().map(contact => (
                      <tr class="hover:bg-gray-50 transition-colors">
                        <td class="py-4 px-6">
                          <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span class="text-blue-600 font-medium">
                                {contact.firstName && contact.lastName
                                  ? contact.firstName[0].toUpperCase() + contact.lastName[0].toUpperCase()
                                  : contact.email[0].toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div class="font-medium text-gray-900">
                                {contact.firstName} {contact.lastName}
                              </div>
                              <div class="text-sm text-gray-500">{contact.email}</div>
                            </div>
                          </div>
                        </td>
                        <td class="py-4 px-6">
                          <TableCellChip
                            value={contact.status}
                            bgColor={getStatusBgColor(contact.status)}
                            textColor={getStatusTextColor(contact.status)}
                          />
                        </td>
                        <td class="py-4 px-6">
                          <div class="flex flex-col space-y-1">
                            {contact.listIds.map(listId => {
                              const list = subscriberLists()?.find(l => l.id === listId);
                              return list ? (
                                <div class="flex items-center justify-between">
                                  <div class="flex items-center space-x-2">
                                    <List class="w-3 h-3 text-gray-400" />
                                    <span class="text-sm text-gray-900">{list.name}</span>
                                  </div>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </td>
                        <td class="py-4 px-6 whitespace-nowrap">
                          <div class="flex items-center space-x-2">
                            <Calendar class="w-4 h-4 text-gray-400" />
                            <span class="text-sm text-gray-900">{contact.lastActivity}</span>
                          </div>
                        </td>
                        <td class="py-4 px-6 whitespace-nowrap">
                          <span class="text-sm text-gray-600">{contact.lastActivity}</span>
                        </td>
                        <td class="py-4 px-6">
                          <div class="flex items-center space-x-2">
                            <button class="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <Mail class="w-4 h-4" />
                            </button>
                            <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                              <Edit class="w-4 h-4" />
                            </button>
                            <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                              <Ellipsis class="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredContacts().length === 0 && (
            <div class="text-center py-12">
              <Users class="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
              <p class="text-gray-600 mb-6">
                {searchTerm() || selectedStatus() !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by adding your first contact."}
              </p>
              <button
                onClick={() => setShowAddContact(true)}
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Contact
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddContact() && <AddContactModal />}
      {showAddList() && <AddListModal />}
    </div>
  );
};

export default Contacts;
