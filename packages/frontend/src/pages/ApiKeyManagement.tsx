import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Copy,
  Eye,
  EyeOff,
  Filter,
  Key,
  Plus,
  Search,
  Shield,
  Trash2,
} from "lucide-solid";
import { API_PERMISSION_DESCRIPTIONS, ApiKey, ApiPermission } from "../types/auth";
import { useAuth } from "../hooks/useAuth.tsx";
import TableCellChip from "../components/interfaces/TableCellChip.js";
import { createSignal } from "solid-js";
import { useTenantId } from "../hooks/useTenantId.js";

const ApiKeyManagement = () => {
  const { hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = createSignal("");
  const [selectedStatus, setSelectedStatus] = createSignal("all");
  const [showCreateModal, setShowCreateModal] = createSignal(false);
  const [visibleKeys, setVisibleKeys] = createSignal<Set<string>>(new Set());

  const tenantId = useTenantId();

  // Mock data - in real app this would come from API
  const apiKeys: ApiKey[] = [
    {
      id: "key-1",
      name: "Production API Key",
      key: "sk-live-1234567890abcdef1234567890abcdef12345678",
      tenantId: tenantId() || "",
      permissions: ["send_emails", "manage_campaigns_api", "view_analytics_api"],
      isActive: true,
      createdAt: "2024-01-15T10:30:00Z",
      lastUsedAt: "2024-01-25T14:22:00Z",
      createdBy: "admin@acme.com",
    },
    {
      id: "key-2",
      name: "Development API Key",
      key: "sk-test-abcdef1234567890abcdef1234567890abcdef12",
      tenantId: tenantId() || "",
      permissions: ["send_emails", "manage_contacts_api"],
      isActive: true,
      createdAt: "2024-01-20T09:15:00Z",
      lastUsedAt: "2024-01-24T16:45:00Z",
      createdBy: "dev@acme.com",
    },
    {
      id: "key-3",
      name: "Analytics Only Key",
      key: "sk-live-fedcba0987654321fedcba0987654321fedcba09",
      tenantId: tenantId() || "",
      permissions: ["view_analytics_api"],
      isActive: false,
      createdAt: "2024-01-10T14:20:00Z",
      createdBy: "analyst@acme.com",
    },
  ];

  const filteredKeys = apiKeys.filter(key => {
    const matchesSearch =
      key.name.toLowerCase().includes(searchTerm().toLowerCase()) ||
      key.createdBy.toLowerCase().includes(searchTerm().toLowerCase());
    const matchesStatus =
      selectedStatus() === "all" ||
      (selectedStatus() === "active" && key.isActive) ||
      (selectedStatus() === "inactive" && !key.isActive);
    return matchesSearch && matchesStatus;
  });

  const toggleKeyVisibility = (keyId: string) => {
    const newVisibleKeys = new Set(visibleKeys());
    if (newVisibleKeys.has(keyId)) {
      newVisibleKeys.delete(keyId);
    } else {
      newVisibleKeys.add(keyId);
    }
    setVisibleKeys(newVisibleKeys);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeSince = (dateString?: string) => {
    if (!dateString) return "Never";
    const now = new Date();
    const eventTime = new Date(dateString);
    const diffInDays = Math.floor((now.getTime() - eventTime.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else {
      return `${diffInDays} days ago`;
    }
  };

  const maskApiKey = (key: string) => {
    return key.substring(0, 12) + "••••••••••••••••••••••••••••••••••••••••";
  };

  const CreateApiKeyModal = () => {
    const [keyData, setKeyData] = createSignal({
      name: "",
      permissions: [] as ApiPermission[],
      expiresAt: "",
    });

    const handlePermissionToggle = (permission: ApiPermission) => {
      setKeyData(prev => ({
        ...prev,
        permissions: prev.permissions.includes(permission)
          ? prev.permissions.filter(p => p !== permission)
          : [...prev.permissions, permission],
      }));
    };

    const handleSubmit = () => {
      // In real app, this would create the API key via API
      console.log("Creating API key:", keyData);
      setShowCreateModal(false);
      setKeyData({ name: "", permissions: [], expiresAt: "" });
    };

    return (
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Create API Key</h3>
              <p class="text-sm text-gray-600 mt-1">Generate a new API key with specific permissions</p>
            </div>
            <button
              onClick={() => setShowCreateModal(false)}
              class="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div class="p-6 overflow-y-auto max-h-96">
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">API Key Name *</label>
                <input
                  type="text"
                  value={keyData.name}
                  onChange={e => setKeyData(prev => ({ ...prev, name: e.target.value }))}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Production API Key"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Permissions *</label>
                <div class="space-y-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                  {Object.entries(API_PERMISSION_DESCRIPTIONS).map(([permission, description]) => (
                    <div class="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id={`perm-${permission}`}
                        checked={keyData().permissions.includes(permission as ApiPermission)}
                        onChange={() => handlePermissionToggle(permission as ApiPermission)}
                        class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div class="flex-1">
                        <label
                          for={`perm-${permission}`}
                          class="text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          {permission.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                        </label>
                        <p class="text-xs text-gray-600 mt-1">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Expiration Date (Optional)</label>
                <input
                  type="datetime-local"
                  value={keyData().expiresAt}
                  onChange={e => setKeyData(prev => ({ ...prev, expiresAt: e.target.value }))}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p class="text-xs text-gray-500 mt-1">Leave empty for no expiration</p>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => setShowCreateModal(false)}
              class="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!keyData.name || keyData().permissions.length === 0}
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Create API Key
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!hasPermission("manage::api-keys")) {
    return (
      <div class="h-full flex items-center justify-center bg-gray-50">
        <div class="text-center">
          <Shield class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
          <p class="text-gray-600">You don't have permission to manage API keys.</p>
        </div>
      </div>
    );
  }

  return (
    <div class="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div class="bg-white border-b border-gray-200 p-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">API Keys</h1>
            <p class="text-gray-600">Manage API keys and their permissions for programmatic access</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus class="w-5 h-5" />
            <span>New API Key</span>
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
                placeholder="Search API keys..."
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
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div class="text-sm text-gray-600">
            {filteredKeys.length} of {apiKeys.length} API keys
          </div>
        </div>
      </div>

      {/* API Keys Table */}
      <div class="flex-1 overflow-auto p-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Name</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">API Key</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Permissions</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Last Used</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Created</th>
                  <th class="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                {filteredKeys.map(apiKey => (
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="py-4 px-6">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Key class="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div class="font-medium text-gray-900">{apiKey.name}</div>
                          <div class="text-sm text-gray-500">by {apiKey.createdBy}</div>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 px-6">
                      <div class="flex items-center space-x-2">
                        <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                          {visibleKeys().has(apiKey.id) ? apiKey.key : maskApiKey(apiKey.key)}
                        </code>
                        <button
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {visibleKeys().has(apiKey.id) ? <EyeOff class="w-4 h-4" /> : <Eye class="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(apiKey.key)}
                          class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Copy class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td class="py-4 px-6">
                      <div class="flex flex-wrap gap-1">
                        {apiKey.permissions.slice(0, 2).map(permission => (
                          <TableCellChip
                            value={permission.replace(/_/g, " ")}
                            bgColor="bg-blue-100"
                            textColor="text-blue-800"
                          />
                        ))}
                        {apiKey.permissions.length > 2 && (
                          <TableCellChip
                            value={`+${apiKey.permissions.length - 2} more`}
                            bgColor="bg-gray-100"
                            textColor="text-gray-700"
                          />
                        )}
                      </div>
                    </td>
                    <td class="py-4 px-6">
                      <TableCellChip
                        value={apiKey.isActive ? "Active" : "Inactive"}
                        bgColor={apiKey.isActive ? "bg-green-100" : "bg-red-100"}
                        textColor={apiKey.isActive ? "text-green-800" : "text-red-800"}
                        icon={apiKey.isActive ? <CheckCircle class="w-3 h-3" /> : <AlertCircle class="w-3 h-3" />}
                      />
                    </td>
                    <td class="py-4 px-6">
                      <span class="text-sm text-gray-900">{getTimeSince(apiKey.lastUsedAt)}</span>
                    </td>
                    <td class="py-4 px-6">
                      <div class="flex items-center space-x-2">
                        <Calendar class="w-4 h-4 text-gray-400" />
                        <span class="text-sm text-gray-900">{formatDate(apiKey.createdAt)}</span>
                      </div>
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

        {filteredKeys.length === 0 && (
          <div class="text-center py-12">
            <Key class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No API keys found</h3>
            <p class="text-gray-600 mb-6">
              {searchTerm() || selectedStatus() !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Create your first API key to start using the EmailFlow API."}
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create API Key
            </button>
          </div>
        )}
      </div>

      {/* Create API Key Modal */}
      {showCreateModal() && <CreateApiKeyModal />}
    </div>
  );
};

export default ApiKeyManagement;
