import { Copy, CreditCard as Edit, Filter, MoreHorizontal, Plus, Search, Send, Users } from "lucide-solid";
import TableCellProgressBar from "../components/interfaces/TableCellProgressBar.tsx";
import TableCellChip from "../components/interfaces/TableCellChip.tsx";
import { TailwindTextColor } from "../helpers/tailwind-text-colors.ts";
import { TailwindBgColor } from "../helpers/tailwind-bg-colors.ts";
import { getCampaignStatusIcon } from "../helpers/chip-icons.js";
import { useCampaignQuery } from "../services/use-campaigns-query.js";
import { formatDateTime } from "../helpers/format-date-time.js";
import { createMemo, createSignal } from "solid-js";

const Campaigns = () => {
  const [selectedStatus, setSelectedStatus] = createSignal("all");
  const [searchTerm, setSearchTerm] = createSignal("");

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

  const campaigns = createMemo(
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

  const filteredCampaigns = createMemo(
    () =>
      (campaigns() || []).filter(campaign => {
        const matchesStatus = selectedStatus() === "all" || campaign.status === selectedStatus();
        const matchesSearch = campaign.name.toLowerCase().includes(searchTerm().toLowerCase());
        return matchesStatus && matchesSearch;
      }),
    [campaigns, isLoading, selectedStatus, searchTerm]
  );

  return (
    <div class="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div class="bg-white border-b border-gray-200 p-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Campaigns</h1>
            <p class="text-gray-600">Create, manage, and monitor your email campaigns</p>
          </div>
          <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus class="w-5 h-5" />
            <span>New Campaign</span>
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
                placeholder="Search campaigns..."
                value={searchTerm()}
                onChange={e => setSearchTerm(e.target.value)}
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
            </div>

            <div class="flex items-center space-x-2">
              <Filter class="w-5 h-5 text-gray-400" />
              <select
                value={selectedStatus()}
                onChange={e => setSelectedStatus(e.target.value)}
                class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          <div class="text-sm text-gray-600">
            {filteredCampaigns.length} of {campaigns?.length || 0} campaigns
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div class="flex-1 overflow-auto p-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Campaign</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Type</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Recipients</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Delivery Rate</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Open Rate</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Click Rate</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Last Activity</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                {filteredCampaigns().map(campaign => (
                  <tr
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="py-4 px-6">
                      <div>
                        <div class="font-medium text-gray-900">{campaign.name}</div>
                        <div class="text-sm text-gray-500">Created {formatDateTime(campaign.createdAt)}</div>
                      </div>
                    </td>
                    <td class="py-4 px-6">
                      <TableCellChip
                        value={campaign.status}
                        bgColor={getStatusBgColor(campaign.status)}
                        textColor={getStatusTextColor(campaign.status)}
                        icon={getCampaignStatusIcon(campaign.status)}
                      />
                    </td>
                    <td class="py-4 px-6">
                      <span class="text-sm text-gray-900">{campaign.type}</span>
                    </td>
                    <td class="py-4 px-6">
                      <div class="flex items-center space-x-2">
                        <Users class="w-4 h-4 text-gray-400" />
                        <span class="text-sm text-gray-900">{campaign.recipients.toLocaleString()}</span>
                      </div>
                    </td>
                    <td class="py-4 px-6">
                      <TableCellProgressBar
                        value={campaign.deliveryRate}
                        color="bg-green-500"
                      />
                    </td>
                    <td class="py-4 px-6">
                      <TableCellProgressBar
                        value={campaign.openRate}
                        color="bg-blue-500"
                      />
                    </td>
                    <td class="py-4 px-6">
                      <TableCellProgressBar
                        value={campaign.clickRate}
                        color="bg-purple-500"
                      />
                    </td>
                    <td class="py-4 px-6">
                      <span class="text-sm text-gray-600">
                        {campaign.status === "Scheduled"
                          ? campaign.scheduledFor !== undefined
                            ? formatDateTime(campaign.scheduledFor)
                            : null
                          : formatDateTime(campaign.createdAt)}
                      </span>
                    </td>
                    <td class="py-4 px-6">
                      <div class="flex items-center space-x-2">
                        <button class="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit class="w-4 h-4" />
                        </button>
                        <button class="p-2 text-gray-400 hover:text-green-600 transition-colors">
                          <Copy class="w-4 h-4" />
                        </button>
                        <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreHorizontal class="w-4 h-4" />
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
          <div class="text-center py-12">
            <Send class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p class="text-gray-600 mb-6">
              {searchTerm() || selectedStatus() !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by creating your first email campaign."}
            </p>
            <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Create Campaign
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
