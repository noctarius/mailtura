import {
  Calendar,
  CreditCard as Edit,
  Filter,
  List,
  Loader,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { TailwindBgColor } from "../helpers/tailwind-bg-colors.ts";
import { TailwindTextColor } from "../helpers/tailwind-text-colors.ts";
import { useContactsQuery } from "../services/use-contacts-query.js";
import TableCellChip from "../components/interfaces/TableCellChip.js";

interface SubscriberList {
  id: string;
  name: string;
  description: string;
  contactCount: number;
  createdAt: string;
}

const Contacts: React.FC = () => {
  const { data: contacts, isLoading } = useContactsQuery({ tenantId: "0199c2c0-7c5e-761d-8b61-f9384f5126ed" });

  const [selectedList, setSelectedList] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddContact, setShowAddContact] = useState(false);
  const [showAddList, setShowAddList] = useState(false);

  const subscriberLists: SubscriberList[] = [
    {
      id: "all",
      name: "All Contacts",
      description: "All contacts in your database",
      contactCount: 15847,
      createdAt: "2024-01-01",
    },
    {
      id: "newsletter",
      name: "Newsletter Subscribers",
      description: "Users subscribed to weekly newsletter",
      contactCount: 12456,
      createdAt: "2024-01-15",
    },
    {
      id: "customers",
      name: "Customers",
      description: "Active paying customers",
      contactCount: 3891,
      createdAt: "2024-01-10",
    },
    {
      id: "trial-users",
      name: "Trial Users",
      description: "Users on free trial",
      contactCount: 2847,
      createdAt: "2024-01-20",
    },
    {
      id: "vip",
      name: "VIP Members",
      description: "Premium tier customers",
      contactCount: 456,
      createdAt: "2024-01-25",
    },
  ];

  /*const contacts: Contact[] = [
    {
      id: 1,
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      status: "subscribed",
      subscribedAt: "2024-01-15",
      lastActivity: "2 hours ago",
      lists: ["newsletter", "customers"],
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
      status: "subscribed",
      subscribedAt: "2024-01-20",
      lastActivity: "1 day ago",
      lists: ["newsletter", "trial-users"],
    },
    {
      id: 3,
      email: "bob.wilson@example.com",
      firstName: "Bob",
      lastName: "Wilson",
      status: "unsubscribed",
      subscribedAt: "2024-01-10",
      lastActivity: "1 week ago",
      lists: ["customers", "vip"],
    },
    {
      id: 4,
      email: "alice.brown@example.com",
      firstName: "Alice",
      lastName: "Brown",
      status: "subscribed",
      subscribedAt: "2024-01-25",
      lastActivity: "3 hours ago",
      lists: ["newsletter", "customers", "vip"],
    },
    {
      id: 5,
      email: "charlie.davis@example.com",
      firstName: "Charlie",
      lastName: "Davis",
      status: "bounced",
      subscribedAt: "2024-01-12",
      lastActivity: "2 days ago",
      lists: ["trial-users"],
    },
  ];*/

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

  const filteredContacts =
    contacts?.filter(contact => {
      const matchesList = selectedList === "all" || contact.listIds.includes(selectedList);
      const matchesSearch =
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesList && matchesSearch;
    }) || [];

  const AddContactModal = () => {
    const [newContact, setNewContact] = useState({
      email: "",
      firstName: "",
      lastName: "",
      selectedLists: [] as string[],
    });
    const [newListName, setNewListName] = useState("");
    const [showNewListInput, setShowNewListInput] = useState(false);

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
      if (newListName.trim()) {
        // In a real app, this would create the list via API
        console.log("Creating new list:", newListName);
        setNewListName("");
        setShowNewListInput(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Add New Contact</h3>
            <button
              onClick={() => setShowAddContact(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={newContact.email}
                onChange={e => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="contact@example.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={newContact.firstName}
                  onChange={e => setNewContact(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={newContact.lastName}
                  onChange={e => setNewContact(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subscriber Lists</label>
              <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {subscriberLists.map(list => (
                  <div
                    key={list.id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id={`list-${list.id}`}
                      checked={list.id === "all" || newContact.selectedLists.includes(list.id)}
                      disabled={list.id === "all"}
                      onChange={() => handleListToggle(list.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`list-${list.id}`}
                      className="text-sm text-gray-700 flex-1"
                    >
                      {list.name}
                      {list.id === "all" && <span className="text-gray-400 ml-1">(automatic)</span>}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-3">
                {!showNewListInput ? (
                  <button
                    onClick={() => setShowNewListInput(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create new list</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newListName}
                      onChange={e => setNewListName(e.target.value)}
                      placeholder="List name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={handleAddNewList}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowNewListInput(false);
                        setNewListName("");
                      }}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowAddContact(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Contact</button>
          </div>
        </div>
      </div>
    );
  };

  const AddListModal = () => {
    const [listData, setListData] = useState({
      name: "",
      description: "",
    });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Create New List</h3>
            <button
              onClick={() => setShowAddList(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">List Name</label>
              <input
                type="text"
                value={listData.name}
                onChange={e => setListData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Product Updates"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={listData.description}
                onChange={e => setListData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Brief description of this list..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowAddList(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create List</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Lists Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Subscriber Lists</h2>
            <button
              onClick={() => setShowAddList(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {subscriberLists.map(list => (
              <div
                key={list.id}
                onClick={() => setSelectedList(list.id)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedList === list.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50 border border-transparent"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <List className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{list.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{list.contactCount.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600">{list.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {subscriberLists.find(list => list.id === selectedList)?.name || "Contacts"}
              </h1>
              <p className="text-gray-600">Manage your contacts and subscriber lists </p>
            </div>
            <button
              onClick={() => setShowAddContact(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <UserPlus className="w-5 h-5" />
              <span>Add Contact</span>
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="subscribed">Subscribed</option>
                  <option value="unsubscribed">Unsubscribed</option>
                  <option value="bounced">Bounced</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              {filteredContacts.length} of {contacts?.length || 0} contacts
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="flex-1 overflow-auto p-8">
          {isLoading ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Contacts</h3>
                  <p className="text-gray-600">Please wait while we fetch your contact data...</p>
                </div>
                {/* Loading skeleton */}
                <div className="w-full max-w-4xl mt-8 space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse"
                    >
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                          <div className="h-6 bg-gray-300 rounded-full w-20"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Contact</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Lists</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Subscribed</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900 whitespace-nowrap">
                        Last Activity
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredContacts.map(contact => (
                      <tr
                        key={contact.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium">
                                {contact.firstName && contact.lastName
                                  ? contact.firstName[0].toUpperCase() + contact.lastName[0].toUpperCase()
                                  : contact.email[0].toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {contact.firstName} {contact.lastName}
                              </div>
                              <div className="text-sm text-gray-500">{contact.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <TableCellChip
                            value={contact.status}
                            bgColor={getStatusBgColor(contact.status)}
                            textColor={getStatusTextColor(contact.status)}
                          />
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col space-y-1">
                            {contact.listIds.map(listId => {
                              const list = subscriberLists.find(l => l.id === listId);
                              return list ? (
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <List className="w-3 h-3 text-gray-400" />
                                    <span className="text-sm text-gray-900">{list.name}</span>
                                  </div>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">{contact.lastActivity}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{contact.lastActivity}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <Mail className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                              <MoreHorizontal className="w-4 h-4" />
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

          {filteredContacts.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by adding your first contact."}
              </p>
              <button
                onClick={() => setShowAddContact(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Contact
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddContact && <AddContactModal />}
      {showAddList && <AddListModal />}
    </div>
  );
};

export default Contacts;
