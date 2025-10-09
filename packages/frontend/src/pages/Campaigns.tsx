import { Copy, CreditCard as Edit, Filter, MoreHorizontal, Plus, Search, Send, Users } from "lucide-react";
import React, { useState } from "react";
import TableCellProgressBar from "../components/interfaces/TableCellProgressBar.tsx";
import TableCellChip from "../components/interfaces/TableCellChip.tsx";
import { TailwindTextColor } from "../helpers/tailwind-text-colors.ts";
import { TailwindBgColor } from "../helpers/tailwind-bg-colors.ts";
import { getCampaignStatusIcon } from "../helpers/chip-icons.js";

const Campaigns: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const campaigns = [
    {
      id: 1,
      name: "Welcome Series - New Users",
      status: "active",
      type: "Automated",
      recipients: 15234,
      sent: 12890,
      delivered: 12654,
      opened: 3045,
      clicked: 487,
      deliveryRate: 98.2,
      openRate: 24.1,
      clickRate: 3.8,
      createdAt: "2024-01-15",
      lastSent: "2 hours ago",
    },
    {
      id: 2,
      name: "Black Friday Promotion",
      status: "scheduled",
      type: "One-time",
      recipients: 45678,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      deliveryRate: 0,
      openRate: 0,
      clickRate: 0,
      createdAt: "2024-01-20",
      scheduledFor: "Nov 24, 2024 9:00 AM",
    },
    {
      id: 3,
      name: "Product Update Newsletter",
      status: "completed",
      type: "One-time",
      recipients: 28456,
      sent: 28456,
      delivered: 27923,
      opened: 6702,
      clicked: 1072,
      deliveryRate: 98.1,
      openRate: 24.0,
      clickRate: 3.8,
      createdAt: "2024-01-10",
      lastSent: "3 days ago",
    },
    {
      id: 4,
      name: "Cart Abandonment Recovery",
      status: "active",
      type: "Automated",
      recipients: 8934,
      sent: 7234,
      delivered: 7089,
      opened: 1702,
      clicked: 289,
      deliveryRate: 98.0,
      openRate: 24.0,
      clickRate: 4.1,
      createdAt: "2024-01-05",
      lastSent: "1 hour ago",
    },
    {
      id: 5,
      name: "Monthly Newsletter - December",
      status: "draft",
      type: "One-time",
      recipients: 0,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      deliveryRate: 0,
      openRate: 0,
      clickRate: 0,
      createdAt: "2024-01-22",
      lastSent: "Never",
    },
  ];

  const getStatusBgColor = (status: string): TailwindBgColor => {
    switch (status) {
      case "active":
        return "bg-green-100";
      case "scheduled":
        return "bg-blue-100";
      case "completed":
        return "bg-gray-100";
      case "draft":
        return "bg-yellow-100";
      case "paused":
        return "bg-orange-100";
      default:
        return "bg-gray-100";
    }
  };

  const getStatusTextColor = (status: string): TailwindTextColor => {
    switch (status) {
      case "active":
        return "text-green-800";
      case "scheduled":
        return "text-blue-800";
      case "completed":
        return "text-gray-800";
      case "draft":
        return "text-yellow-800";
      case "paused":
        return "text-orange-800";
      default:
        return "text-gray-800";
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesStatus = selectedStatus === "all" || campaign.status === selectedStatus;
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaigns</h1>
            <p className="text-gray-600">Create, manage, and monitor your email campaigns</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Campaign</span>
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
                placeholder="Search campaigns..."
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
                <option value="active">Active</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
                <option value="paused">Paused</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {filteredCampaigns.length} of {campaigns.length} campaigns
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Campaign</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Recipients</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Delivery Rate</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Open Rate</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Click Rate</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Last Activity</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCampaigns.map(campaign => (
                  <tr
                    key={campaign.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{campaign.name}</div>
                        <div className="text-sm text-gray-500">Created {campaign.createdAt}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <TableCellChip
                        value={campaign.status}
                        bgColor={getStatusBgColor(campaign.status)}
                        textColor={getStatusTextColor(campaign.status)}
                        icon={getCampaignStatusIcon(campaign.status)}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">{campaign.type}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{campaign.recipients.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <TableCellProgressBar
                        value={campaign.deliveryRate}
                        color="bg-green-500"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <TableCellProgressBar
                        value={campaign.openRate}
                        color="bg-blue-500"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <TableCellProgressBar
                        value={campaign.clickRate}
                        color="bg-purple-500"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">
                        {campaign.status === "scheduled" ? campaign.scheduledFor : campaign.lastSent}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                          <Copy className="w-4 h-4" />
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

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <Send className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedStatus !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by creating your first email campaign."}
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Create Campaign
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
