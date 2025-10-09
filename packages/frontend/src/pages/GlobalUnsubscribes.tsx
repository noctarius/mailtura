import { Calendar, Download, Filter, Mail, Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import TableCellChip from "../components/interfaces/TableCellChip.tsx";
import { getTimeSince } from "../helpers/time-since.ts";
import { formatDateTime } from "../helpers/format-date-time.ts";

interface GlobalUnsubscribe {
  id: number;
  email: string;
  unsubscribedAt: string;
  source: string;
}

const GlobalUnsubscribes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");

  const globalUnsubscribes: GlobalUnsubscribe[] = [
    {
      id: 1,
      email: "john.doe@example.com",
      unsubscribedAt: "2024-01-25 14:30:00",
      source: "Unsubscribe Link",
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      unsubscribedAt: "2024-01-24 09:15:00",
      source: "Manual Addition",
    },
    {
      id: 3,
      email: "bob.wilson@example.com",
      unsubscribedAt: "2024-01-23 16:45:00",
      source: "Unsubscribe Link",
    },
    {
      id: 4,
      email: "alice.brown@example.com",
      unsubscribedAt: "2024-01-22 11:20:00",
      source: "API Request",
    },
    {
      id: 5,
      email: "charlie.davis@example.com",
      unsubscribedAt: "2024-01-21 08:30:00",
      source: "Unsubscribe Link",
    },
    {
      id: 6,
      email: "emma.johnson@example.com",
      unsubscribedAt: "2024-01-20 15:10:00",
      source: "Manual Addition",
    },
    {
      id: 7,
      email: "david.lee@example.com",
      unsubscribedAt: "2024-01-19 12:45:00",
      source: "Unsubscribe Link",
    },
    {
      id: 8,
      email: "sarah.white@example.com",
      unsubscribedAt: "2024-01-18 10:20:00",
      source: "API Request",
    },
  ];

  const sources = Array.from(new Set(globalUnsubscribes.map(item => item.source)));

  const filteredUnsubscribes = globalUnsubscribes.filter(item => {
    const matchesSearch = item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = selectedSource === "all" || item.source === selectedSource;
    return matchesSearch && matchesSource;
  });

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Global Unsubscribes</h1>
            <p className="text-gray-600">Manage globally unsubscribed email addresses</p>
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
                placeholder="Search email addresses..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
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
            {filteredUnsubscribes.length} of {globalUnsubscribes.length} unsubscribes
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
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    Unsubscribed Date
                  </th>
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
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <Mail className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="font-medium text-gray-900">{item.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-900">
                            {formatDateTime(item.unsubscribedAt)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getTimeSince(item.unsubscribedAt)}
                          </div>
                        </div>
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
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No unsubscribes found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedSource !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Global unsubscribes will appear here when users opt out of all emails."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalUnsubscribes;
