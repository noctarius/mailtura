import React, { useState } from "react";
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
} from "lucide-react";
import { API_PERMISSION_DESCRIPTIONS, ApiKey, ApiPermission } from "../types/auth";
import { useAuth } from "../hooks/useAuth.tsx";

const ApiKeyManagement: React.FC = () => {
  const { tenant, hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  // Mock data - in real app this would come from API
  const apiKeys: ApiKey[] = [
    {
      id: "key-1",
      name: "Production API Key",
      key: "sk-live-1234567890abcdef1234567890abcdef12345678",
      tenantId: tenant?.id || "",
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
      tenantId: tenant?.id || "",
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
      tenantId: tenant?.id || "",
      permissions: ["view_analytics_api"],
      isActive: false,
      createdAt: "2024-01-10T14:20:00Z",
      createdBy: "analyst@acme.com",
    },
  ];

  const filteredKeys = apiKeys.filter(key => {
    const matchesSearch =
      key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      key.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" && key.isActive) ||
      (selectedStatus === "inactive" && !key.isActive);
    return matchesSearch && matchesStatus;
  });

  const toggleKeyVisibility = (keyId: string) => {
    const newVisibleKeys = new Set(visibleKeys);
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
    const [keyData, setKeyData] = useState({
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Create API Key</h3>
              <p className="text-sm text-gray-600 mt-1">Generate a new API key with specific permissions</p>
            </div>
            <button
              onClick={() => setShowCreateModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-96">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key Name *</label>
                <input
                  type="text"
                  value={keyData.name}
                  onChange={e => setKeyData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Production API Key"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Permissions *</label>
                <div className="space-y-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                  {Object.entries(API_PERMISSION_DESCRIPTIONS).map(([permission, description]) => (
                    <div
                      key={permission}
                      className="flex items-start space-x-3"
                    >
                      <input
                        type="checkbox"
                        id={`perm-${permission}`}
                        checked={keyData.permissions.includes(permission as ApiPermission)}
                        onChange={() => handlePermissionToggle(permission as ApiPermission)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={`perm-${permission}`}
                          className="text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          {permission.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                        </label>
                        <p className="text-xs text-gray-600 mt-1">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date (Optional)</label>
                <input
                  type="datetime-local"
                  value={keyData.expiresAt}
                  onChange={e => setKeyData(prev => ({ ...prev, expiresAt: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty for no expiration</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!keyData.name || keyData.permissions.length === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
          <p className="text-gray-600">You don't have permission to manage API keys.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">API Keys</h1>
            <p className="text-gray-600">Manage API keys and their permissions for programmatic access</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New API Key</span>
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
                placeholder="Search API keys..."
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
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {filteredKeys.length} of {apiKeys.length} API keys
          </div>
        </div>
      </div>

      {/* API Keys Table */}
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">API Key</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Permissions</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Last Used</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Created</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredKeys.map(apiKey => (
                  <tr
                    key={apiKey.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Key className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{apiKey.name}</div>
                          <div className="text-sm text-gray-500">by {apiKey.createdBy}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                          {visibleKeys.has(apiKey.id) ? apiKey.key : maskApiKey(apiKey.key)}
                        </code>
                        <button
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {visibleKeys.has(apiKey.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(apiKey.key)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {apiKey.permissions.slice(0, 2).map(permission => (
                          <span
                            key={permission}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                          >
                            {permission.replace(/_/g, " ")}
                          </span>
                        ))}
                        {apiKey.permissions.length > 2 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                            +{apiKey.permissions.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                          apiKey.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {apiKey.isActive ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        <span>{apiKey.isActive ? "Active" : "Inactive"}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">{getTimeSince(apiKey.lastUsedAt)}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{formatDate(apiKey.createdAt)}</span>
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

        {filteredKeys.length === 0 && (
          <div className="text-center py-12">
            <Key className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No API keys found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedStatus !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Create your first API key to start using the EmailFlow API."}
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create API Key
            </button>
          </div>
        )}
      </div>

      {/* Create API Key Modal */}
      {showCreateModal && <CreateApiKeyModal />}
    </div>
  );
};

export default ApiKeyManagement;
