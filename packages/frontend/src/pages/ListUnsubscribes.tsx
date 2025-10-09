import { Download, Filter, List, Mail, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import TableCellChip from "../components/interfaces/TableCellChip.tsx";
import { formatDateTime } from "../helpers/format-date-time.ts";

interface ListUnsubscribe {
  id: number;
  email: string;
  unsubscribedAt: string;
  lists: Array<{
    name: string;
    unsubscribedAt: string;
  }>;
  source: string;
}

const ListUnsubscribes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedList, setSelectedList] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");

  const listUnsubscribes: ListUnsubscribe[] = [
    {
      id: 1,
      email: "john.doe@example.com",
      unsubscribedAt: "2024-01-25 14:30:00", // Most recent unsubscribe
      lists: [
        { name: "Newsletter Subscribers", unsubscribedAt: "2024-01-25 14:30:00" },
        { name: "Product Updates", unsubscribedAt: "2024-01-20 10:15:00" },
      ],
      source: "Unsubscribe Link",
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      unsubscribedAt: "2024-01-24 09:15:00",
      lists: [{ name: "Product Updates", unsubscribedAt: "2024-01-24 09:15:00" }],
      source: "Manual Addition",
    },
    {
      id: 3,
      email: "bob.wilson@example.com",
      unsubscribedAt: "2024-01-23 16:45:00",
      lists: [
        { name: "Newsletter Subscribers", unsubscribedAt: "2024-01-23 16:45:00" },
        { name: "VIP Members", unsubscribedAt: "2024-01-18 14:20:00" },
        { name: "Trial Users", unsubscribedAt: "2024-01-15 09:30:00" },
      ],
      source: "Unsubscribe Link",
    },
    {
      id: 4,
      email: "alice.brown@example.com",
      unsubscribedAt: "2024-01-22 11:20:00",
      lists: [{ name: "VIP Members", unsubscribedAt: "2024-01-22 11:20:00" }],
      source: "API Request",
    },
    {
      id: 5,
      email: "charlie.davis@example.com",
      unsubscribedAt: "2024-01-21 08:30:00",
      lists: [
        { name: "Trial Users", unsubscribedAt: "2024-01-21 08:30:00" },
        { name: "Newsletter Subscribers", unsubscribedAt: "2024-01-19 16:45:00" },
      ],
      source: "Unsubscribe Link",
    },
    {
      id: 6,
      email: "emma.johnson@example.com",
      unsubscribedAt: "2024-01-20 15:10:00",
      lists: [{ name: "Product Updates", unsubscribedAt: "2024-01-20 15:10:00" }],
      source: "Manual Addition",
    },
    {
      id: 7,
      email: "david.lee@example.com",
      unsubscribedAt: "2024-01-19 12:45:00",
      lists: [{ name: "Newsletter Subscribers", unsubscribedAt: "2024-01-19 12:45:00" }],
      source: "Unsubscribe Link",
    },
    {
      id: 8,
      email: "sarah.white@example.com",
      unsubscribedAt: "2024-01-18 10:20:00",
      lists: [
        { name: "Customers", unsubscribedAt: "2024-01-18 10:20:00" },
        { name: "VIP Members", unsubscribedAt: "2024-01-16 11:30:00" },
      ],
      source: "API Request",
    },
  ];

  const lists = Array.from(
    new Set(listUnsubscribes.flatMap(item => item.lists.map(list => list.name)))
  );
  const sources = Array.from(new Set(listUnsubscribes.map(item => item.source)));

  const filteredUnsubscribes = listUnsubscribes.filter(item => {
    const matchesSearch =
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lists.some(list => list.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesList =
      selectedList === "all" || item.lists.some(list => list.name === selectedList);
    const matchesSource = selectedSource === "all" || item.source === selectedSource;
    return matchesSearch && matchesList && matchesSource;
  });

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">List Unsubscribes</h1>
            <p className="text-gray-600">Manage list-specific unsubscribed email addresses</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Email</span>
            </button>
          </div>
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
                placeholder="Search email addresses or lists..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedList}
                onChange={e => setSelectedList(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Lists</option>
                {lists.map(list => (
                  <option
                    key={list}
                    value={list}
                  >
                    {list}
                  </option>
                ))}
              </select>

              <select
                value={selectedSource}
                onChange={e => setSelectedSource(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Sources</option>
                {sources.map(source => (
                  <option
                    key={source}
                    value={source}
                  >
                    {source}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {filteredUnsubscribes.length} of {listUnsubscribes.length} unsubscribes
          </div>
        </div>
      </div>

      {/* Unsubscribes Table */}
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Email Address</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">List</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Source</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUnsubscribes.map(item => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <Mail className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="font-medium text-gray-900">{item.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        {item.lists.map((list, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2">
                              <List className="w-3 h-3 text-gray-400" />
                              <span className="text-sm text-gray-900">{list.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {formatDateTime(list.unsubscribedAt)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <TableCellChip
                        value={item.source}
                        bgColor={"bg-gray-100"}
                        textColor={"text-gray-800"}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUnsubscribes.length === 0 && (
          <div className="text-center py-12">
            <List className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No list unsubscribes found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedList !== "all" || selectedSource !== "all"
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
