import { Calendar, Download, Filter, Mail, Plus, Search, Trash2 } from "lucide-solid";
import TableCellChip from "../components/interfaces/TableCellChip.tsx";
import { getTimeSince } from "../helpers/time-since.ts";
import { formatDateTime } from "../helpers/format-date-time.ts";
import { getUnsubscribeSourceIcon } from "../helpers/chip-icons.js";
import { createSignal } from "solid-js";

interface GlobalUnsubscribe {
  id: number;
  email: string;
  unsubscribedAt: string;
  source: string;
}

const GlobalUnsubscribes = () => {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [selectedSource, setSelectedSource] = createSignal("all");

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
    const matchesSearch = item.email.toLowerCase().includes(searchTerm().toLowerCase());
    const matchesSource = selectedSource() === "all" || item.source === selectedSource();
    return matchesSearch && matchesSource;
  });

  return (
    <div class="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div class="bg-white border-b border-gray-200 p-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Global Unsubscribes</h1>
            <p class="text-gray-600">Manage globally unsubscribed email addresses</p>
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
                placeholder="Search email addresses..."
                value={searchTerm()}
                onChange={e => setSearchTerm(e.target.value)}
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
            </div>

            <div class="flex items-center space-x-2">
              <Filter class="w-5 h-5 text-gray-400" />
              <select
                value={selectedSource()}
                onChange={e => setSelectedSource(e.target.value)}
                class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Sources</option>
                {sources.map(source => (
                  <option value={source}>{source}</option>
                ))}
              </select>
            </div>
          </div>

          <div class="text-sm text-gray-600">
            {filteredUnsubscribes.length} of {globalUnsubscribes.length} unsubscribes
          </div>
        </div>
      </div>

      {/* Unsubscribes Table */}
      <div class="flex-1 overflow-auto p-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Email Address</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Unsubscribed Date</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Source</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                {filteredUnsubscribes.map(item => (
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="py-4 px-6">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <Mail class="w-4 h-4 text-red-600" />
                        </div>
                        <span class="font-medium text-gray-900">{item.email}</span>
                      </div>
                    </td>
                    <td class="py-4 px-6">
                      <div class="flex items-center space-x-2">
                        <Calendar class="w-4 h-4 text-gray-400" />
                        <div>
                          <div class="text-sm text-gray-900">{formatDateTime(item.unsubscribedAt)}</div>
                          <div class="text-xs text-gray-500">{getTimeSince(item.unsubscribedAt)}</div>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 px-6">
                      <TableCellChip
                        value={item.source}
                        bgColor={"bg-gray-100"}
                        textColor={"text-gray-800"}
                        icon={getUnsubscribeSourceIcon(item.source)}
                      />
                    </td>
                    <td class="py-4 px-6">
                      <button class="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUnsubscribes.length === 0 && (
          <div class="text-center py-12">
            <Mail class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No unsubscribes found</h3>
            <p class="text-gray-600 mb-6">
              {searchTerm() || selectedSource() !== "all"
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
