import { Copy, CreditCard as Edit, Filter, MoreHorizontal, Plus, Search, Send, Users } from "lucide-react";
import React, { useMemo, useState } from "react";
import TableCellProgressBar from "../components/interfaces/TableCellProgressBar.tsx";
import TableCellChip from "../components/interfaces/TableCellChip.tsx";
import { TailwindTextColor } from "../helpers/tailwind-text-colors.ts";
import { TailwindBgColor } from "../helpers/tailwind-bg-colors.ts";
import { getCampaignStatusIcon } from "../helpers/chip-icons.js";
import { useCampaignQuery } from "../services/use-campaigns-query.js";
import { formatDateTime } from "../helpers/format-date-time.js";

const Campaigns: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: loadedCampaigns, isLoading } = useCampaignQuery({
    tenantId: "0199e407-dd7f-7dfb-81fc-f39d09316def",
  });

  const campaignsRates = [
    {
      id: "0199e418-3e65-71db-87db-9709f5b6bf92",
      deliveryRate: 98.2,
      openRate: 24.1,
      clickRate: 3.8,
    },
    {
      id: "0199e41d-a200-7e4e-be23-ce12000b4fea",
      deliveryRate: 0,
      openRate: 0,
      clickRate: 0,
    },
    {
      id: "0199e427-9b08-7c52-9267-2d599bdf0f9a",
      deliveryRate: 98.1,
      openRate: 24.0,
      clickRate: 3.8,
    },
    {
      id: "0199e42a-f506-7bdc-be6a-22bbbdd8abb5",
      deliveryRate: 98.0,
      openRate: 24.0,
      clickRate: 4.1,
    },
    {
      id: "0199e42b-94b5-7512-a8f8-f334a119d2f3",
      deliveryRate: 0,
      openRate: 0,
      clickRate: 0,
    },
  ];

  const getStatusBgColor = (status: string): TailwindBgColor => {
    switch (status) {
      case "Active":
        return "bg-green-100";
      case "Scheduled":
        return "bg-blue-100";
      case "Completed":
        return "bg-gray-100";
      case "Draft":
        return "bg-yellow-100";
      case "Paused":
        return "bg-orange-100";
      default:
        return "bg-gray-100";
    }
  };

  const getStatusTextColor = (status: string): TailwindTextColor => {
    switch (status) {
      case "Active":
        return "text-green-800";
      case "Scheduled":
        return "text-blue-800";
      case "Completed":
        return "text-gray-800";
      case "Draft":
        return "text-yellow-800";
      case "Paused":
        return "text-orange-800";
      default:
        return "text-gray-800";
    }
  };

  const campaigns = useMemo(
    () =>
      (loadedCampaigns || []).map(campaign => {
        const campaignRate = campaignsRates.find(rate => rate.id === campaign.id);
        return {
          ...campaign,
          ...campaignRate,
        };
      }),
    [loadedCampaigns, isLoading]
  );

  const filteredCampaigns = useMemo(
    () =>
      (campaigns || []).filter(campaign => {
        const matchesStatus = selectedStatus === "all" || campaign.status === selectedStatus;
        const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
      }),
    [campaigns, isLoading, selectedStatus, searchTerm]
  );

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
            {filteredCampaigns.length} of {campaigns?.length || 0} campaigns
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
                        <div className="text-sm text-gray-500">Created {formatDateTime(campaign.createdAt)}</div>
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
                        {campaign.status === "Scheduled" ? campaign.scheduledFor !== undefined ? formatDateTime(campaign.scheduledFor) : null : formatDateTime(campaign.createdAt)}
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
