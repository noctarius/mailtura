import { Activity as ActivityIcon, Calendar, Eye, Filter, MousePointer, Search, User } from "lucide-solid";
import TableCellChip from "../components/interfaces/TableCellChip.tsx";
import { TailwindBgColor } from "../helpers/tailwind-bg-colors.ts";
import { TailwindTextColor } from "../helpers/tailwind-text-colors.ts";
import { formatDateTime } from "../helpers/format-date-time.ts";
import { getTimeSince } from "../helpers/time-since.ts";
import { getActivityStatusIcon } from "../helpers/chip-icons.js";
import { createSignal } from "solid-js";

interface SentMessage {
  id: number;
  receiverEmail: string;
  campaignName: string;
  sendName: string;
  status: "delivered" | "pending" | "bounced" | "failed" | "opened" | "clicked";
  sentAt: string;
  lastEventReceived: string;
  lastEventType: string;
  opens: number;
  clicks: number;
  subject: string;
}

const Activity = () => {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [selectedStatus, setSelectedStatus] = createSignal("all");
  const [selectedCampaign, setSelectedCampaign] = createSignal("all");

  const sentMessages: SentMessage[] = [
    {
      id: 1,
      receiverEmail: "john.doe@example.com",
      campaignName: "Welcome Series - New Users",
      sendName: "Welcome Email #1",
      status: "clicked",
      sentAt: "2024-01-25 14:30:00",
      lastEventReceived: "2025-10-4 15:45:00",
      lastEventType: "clicked",
      opens: 3,
      clicks: 2,
      subject: "Welcome to EmailFlow!",
    },
    {
      id: 2,
      receiverEmail: "jane.smith@example.com",
      campaignName: "Black Friday Promotion",
      sendName: "Early Bird Special",
      status: "opened",
      sentAt: "2024-01-25 09:15:00",
      lastEventReceived: "2024-01-25 10:22:00",
      lastEventType: "opened",
      opens: 1,
      clicks: 0,
      subject: "🔥 50% Off Everything - Limited Time!",
    },
    {
      id: 3,
      receiverEmail: "bob.wilson@example.com",
      campaignName: "Product Update Newsletter",
      sendName: "January Updates",
      status: "delivered",
      sentAt: "2024-01-25 08:00:00",
      lastEventReceived: "2024-01-25 08:01:00",
      lastEventType: "delivered",
      opens: 0,
      clicks: 0,
      subject: "New Features This Month",
    },
    {
      id: 4,
      receiverEmail: "alice.brown@example.com",
      campaignName: "Cart Abandonment Recovery",
      sendName: "Don't forget your items",
      status: "pending",
      sentAt: "2024-01-25 16:45:00",
      lastEventReceived: "2024-01-25 16:45:00",
      lastEventType: "queued",
      opens: 0,
      clicks: 0,
      subject: "Complete your purchase - 10% off",
    },
    {
      id: 5,
      receiverEmail: "charlie.davis@example.com",
      campaignName: "Welcome Series - New Users",
      sendName: "Welcome Email #2",
      status: "bounced",
      sentAt: "2024-01-25 12:20:00",
      lastEventReceived: "2024-01-25 12:21:00",
      lastEventType: "bounced",
      opens: 0,
      clicks: 0,
      subject: "Getting started with your account",
    },
    {
      id: 6,
      receiverEmail: "emma.johnson@example.com",
      campaignName: "Monthly Newsletter",
      sendName: "January Newsletter",
      status: "failed",
      sentAt: "2024-01-25 07:30:00",
      lastEventReceived: "2024-01-25 07:31:00",
      lastEventType: "failed",
      opens: 0,
      clicks: 0,
      subject: "Monthly Roundup - January 2024",
    },
    {
      id: 7,
      receiverEmail: "david.lee@example.com",
      campaignName: "Product Update Newsletter",
      sendName: "Feature Announcement",
      status: "clicked",
      sentAt: "2024-01-24 15:00:00",
      lastEventReceived: "2024-01-24 16:30:00",
      lastEventType: "clicked",
      opens: 2,
      clicks: 1,
      subject: "Introducing our new dashboard",
    },
    {
      id: 8,
      receiverEmail: "sarah.white@example.com",
      campaignName: "Black Friday Promotion",
      sendName: "Flash Sale Alert",
      status: "opened",
      sentAt: "2024-01-24 11:15:00",
      lastEventReceived: "2024-01-24 14:22:00",
      lastEventType: "opened",
      opens: 4,
      clicks: 0,
      subject: "Flash Sale: 24 hours only!",
    },
  ];

  const campaigns = Array.from(new Set(sentMessages.map(msg => msg.campaignName)));

  const getStatusBgColor = (status: string): TailwindBgColor => {
    switch (status) {
      case "delivered":
        return "bg-green-100";
      case "opened":
        return "bg-blue-100";
      case "clicked":
        return "bg-purple-100";
      case "pending":
        return "bg-yellow-100";
      case "bounced":
        return "bg-orange-100";
      case "failed":
        return "bg-red-100";
      default:
        return "bg-gray-100";
    }
  };

  const getStatusTextColor = (status: string): TailwindTextColor => {
    switch (status) {
      case "delivered":
        return "text-green-800";
      case "opened":
        return "text-blue-800";
      case "clicked":
        return "text-purple-800";
      case "pending":
        return "text-yellow-800";
      case "bounced":
        return "text-orange-800";
      case "failed":
        return "text-red-800";
      default:
        return "text-gray-800";
    }
  };

  const filteredMessages = sentMessages.filter(message => {
    const matchesSearch =
      message.receiverEmail.toLowerCase().includes(searchTerm().toLowerCase()) ||
      message.campaignName.toLowerCase().includes(searchTerm().toLowerCase()) ||
      message.sendName.toLowerCase().includes(searchTerm().toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm().toLowerCase());

    const matchesStatus = selectedStatus() === "all" || message.status === selectedStatus();
    const matchesCampaign = selectedCampaign() === "all" || message.campaignName === selectedCampaign();

    return matchesSearch && matchesStatus && matchesCampaign;
  });

  return (
    <div class="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div class="bg-white border-b border-gray-200 p-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Activity</h1>
            <p class="text-gray-600">Track all sent messages and their delivery status</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-600">
              {filteredMessages.length} of {sentMessages.length} messages
            </div>
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
                placeholder="Search messages, emails, campaigns..."
                value={searchTerm()}
                onChange={e => setSearchTerm(e.target.value)}
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-96"
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
                <option value="delivered">Delivered</option>
                <option value="opened">Opened</option>
                <option value="clicked">Clicked</option>
                <option value="pending">Pending</option>
                <option value="bounced">Bounced</option>
                <option value="failed">Failed</option>
              </select>

              <select
                value={selectedCampaign()}
                onChange={e => setSelectedCampaign(e.target.value)}
                class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Campaigns</option>
                {campaigns.map(campaign => (
                  <option
                    value={campaign}
                  >
                    {campaign}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div class="flex-1 overflow-auto p-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Message</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Sent At</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Last Event</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Opens</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Clicks</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                {filteredMessages.map(message => (
                  <tr
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="py-4 px-6">
                      <TableCellChip
                        value={message.status}
                        bgColor={getStatusBgColor(message.status)}
                        textColor={getStatusTextColor(message.status)}
                        icon={getActivityStatusIcon(message.status)}
                      />
                    </td>
                    <td class="py-4 px-6">
                      <div class="space-y-1">
                        <div class="flex items-center space-x-2">
                          <User class="w-4 h-4 text-gray-400" />
                          <span class="font-medium text-gray-900">{message.receiverEmail}</span>
                        </div>
                        <div class="text-sm text-gray-600">{message.subject}</div>
                        <div class="flex items-center space-x-2 text-xs text-gray-500">
                          <span class="bg-gray-100 px-2 py-1 rounded">{message.campaignName}</span>
                          <span>•</span>
                          <span>{message.sendName}</span>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 px-6">
                      <div class="flex items-center space-x-2">
                        <Calendar class="w-4 h-4 text-gray-400" />
                        <div>
                          <div class="text-sm text-gray-900">{formatDateTime(message.sentAt)}</div>
                          <div class="text-xs text-gray-500">{getTimeSince(message.sentAt, true)}</div>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 px-6">
                      <div>
                        <div class="text-sm text-gray-900 capitalize">{message.lastEventType}</div>
                        <div class="text-xs text-gray-500">{getTimeSince(message.lastEventReceived, true)}</div>
                      </div>
                    </td>
                    <td class="py-4 px-6">
                      <div class="flex items-center space-x-2">
                        <Eye class="w-4 h-4 text-blue-500" />
                        <span class="text-sm font-medium text-gray-900">{message.opens}</span>
                      </div>
                    </td>
                    <td class="py-4 px-6">
                      <div class="flex items-center space-x-2">
                        <MousePointer class="w-4 h-4 text-purple-500" />
                        <span class="text-sm font-medium text-gray-900">{message.clicks}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredMessages.length === 0 && (
          <div class="text-center py-12">
            <ActivityIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
            <p class="text-gray-600 mb-6">
              {searchTerm() || selectedStatus() !== "all" || selectedCampaign() !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Messages will appear here once you start sending campaigns."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity;
