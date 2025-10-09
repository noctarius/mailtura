import {
  AlertTriangle,
  Calendar,
  Download,
  Filter,
  Mail,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import TableCellChip from "../components/interfaces/TableCellChip.tsx";
import { TailwindBgColor } from "../helpers/tailwind-bg-colors.ts";
import { TailwindTextColor } from "../helpers/tailwind-text-colors.ts";
import { getTimeSince } from "../helpers/time-since.ts";
import { formatDateTime } from "../helpers/format-date-time.ts";

interface Bounce {
  id: number;
  email: string;
  bouncedAt: string;
  reason: string;
  bounceType: "hard" | "soft";
  campaignName?: string;
}

const Bounces: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCampaign, setSelectedCampaign] = useState("all");

  const bounces: Bounce[] = [
    {
      id: 1,
      email: "invalid@nonexistentdomain.com",
      bouncedAt: "2024-01-25 14:30:00",
      reason: "Domain does not exist",
      bounceType: "hard",
    },
    {
      id: 2,
      email: "full.mailbox@example.com",
      bouncedAt: "2024-01-24 09:15:00",
      reason: "Mailbox full",
      bounceType: "soft",
    },
    {
      id: 3,
      email: "blocked@spamfilter.com",
      bouncedAt: "2024-01-23 16:45:00",
      reason: "Blocked by spam filter",
      bounceType: "soft",
    },
    {
      id: 4,
      email: "nouser@example.com",
      bouncedAt: "2024-01-22 11:20:00",
      reason: "User unknown",
      bounceType: "hard",
    },
    {
      id: 5,
      email: "temporary.issue@example.com",
      bouncedAt: "2024-01-21 08:30:00",
      reason: "Temporary delivery failure",
      bounceType: "soft",
    },
    {
      id: 6,
      email: "disabled@oldcompany.com",
      bouncedAt: "2024-01-20 15:10:00",
      reason: "Account disabled",
      bounceType: "hard",
    },
    {
      id: 7,
      email: "quota.exceeded@example.com",
      bouncedAt: "2024-01-19 12:45:00",
      reason: "Quota exceeded",
      bounceType: "soft",
    },
    {
      id: 8,
      email: "invalid.format@",
      bouncedAt: "2024-01-18 10:20:00",
      reason: "Invalid email format",
      bounceType: "hard",
    },
  ];

  const campaigns = Array.from(new Set(bounces.map(bounce => bounce.campaignName).filter(Boolean)));

  const getBounceTypeBgColor = (type: string): TailwindBgColor => {
    switch (type) {
      case "hard":
        return "bg-red-100";
      case "soft":
        return "bg-yellow-100";
      default:
        return "bg-gray-100";
    }
  };

  const getBounceTypeTextColor = (type: string): TailwindTextColor => {
    switch (type) {
      case "hard":
        return "text-red-800";
      case "soft":
        return "text-yellow-800";
      default:
        return "text-gray-800";
    }
  };

  const filteredBounces = bounces.filter(bounce => {
    const matchesSearch =
      bounce.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bounce.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bounce.campaignName && bounce.campaignName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "all" || bounce.bounceType === selectedType;
    const matchesCampaign = selectedCampaign === "all" || bounce.campaignName === selectedCampaign;
    return matchesSearch && matchesType && matchesCampaign;
  });

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bounces</h1>
            <p className="text-gray-600">Manage bounced email addresses and delivery failures</p>
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
                placeholder="Search email addresses, reasons, or campaigns..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-96"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="hard">Hard Bounces</option>
                <option value="soft">Soft Bounces</option>
              </select>

              <select
                value={selectedCampaign}
                onChange={e => setSelectedCampaign(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Campaigns</option>
                {campaigns.map(campaign => (
                  <option
                    key={campaign}
                    value={campaign}
                  >
                    {campaign}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {filteredBounces.length} of {bounces.length} bounces
          </div>
        </div>
      </div>

      {/* Bounces Table */}
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Email Address</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Bounce Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Reason</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Bounced Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBounces.map(bounce => (
                  <tr
                    key={bounce.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${bounce.bounceType === "hard" ? "bg-red-100" : "bg-yellow-100"}`}
                        >
                          <Mail
                            className={`w-4 h-4 ${bounce.bounceType === "hard" ? "text-red-600" : "text-yellow-600"}`}
                          />
                        </div>
                        <span className="font-medium text-gray-900">{bounce.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <TableCellChip
                        value={`${bounce.bounceType} Bounce`}
                        bgColor={getBounceTypeBgColor(bounce.bounceType)}
                        textColor={getBounceTypeTextColor(bounce.bounceType)}
                        icon={<AlertTriangle className="w-3 h-3" />}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">{bounce.reason}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-900">
                            {formatDateTime(bounce.bouncedAt)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getTimeSince(bounce.bouncedAt)}
                          </div>
                        </div>
                      </div>
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

        {filteredBounces.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bounces found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedType !== "all" || selectedCampaign !== "all"
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
