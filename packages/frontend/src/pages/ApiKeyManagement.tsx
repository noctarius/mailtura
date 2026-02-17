import {
  Calendar,
  CheckCircle,
  CircleAlert,
  Copy,
  Eye,
  EyeOff,
  Funnel,
  Key,
  Plus,
  Search,
  Shield,
  Trash2,
} from "lucide-solid";
import { createMemo, createSignal } from "solid-js";
import { useAuth } from "../hooks/useAuth.tsx";
import TableCellChip from "../components/interfaces/TableCellChip.js";
import { useTenantId } from "../hooks/useTenantId.js";
import { useApiKeysQuery } from "../services/api-keys/use-api-keys-query.js";
import { useApi } from "../hooks/useApi.js";
import { useMutation, useQueryClient } from "@tanstack/solid-query";
import { apiKeyKeys } from "../services/api-keys/keys.js";
import { toast } from "solid-toast";
import DeleteApiKeyDialog from "../components/modals/DeleteApiKeyDialog.js";
import { ApiKey } from "@mailtura/rpcmodel/api/index.js";
import CreateApiKeyDialog, { CreateApiKeyPayload } from "../components/modals/CreateApiKeyDialog.js";
import { getTimeSince } from "../helpers/time-since.js";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const maskApiKey = (value: string) => {
  if (value.length <= 12) return value;
  return value.substring(0, 12) + "••••••••••••••••••••••••••••••••••••••••";
};

const formatPermission = (permission: string) => {
  return permission
    .replace(/::/g, " ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
};

const errorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) return error.message;
  return fallback;
};

const ApiKeyManagement = () => {
  const { hasPermission } = useAuth();
  const tenantId = useTenantId();
  const client = useApi();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = createSignal("");
  const [selectedStatus, setSelectedStatus] = createSignal("all");
  const [showCreateModal, setShowCreateModal] = createSignal(false);
  const [visibleKeys, setVisibleKeys] = createSignal<Set<string>>(new Set());
  const [selectedApiKey, setSelectedApiKey] = createSignal<ApiKey | undefined>(undefined);

  const apiKeysQuery = useApiKeysQuery({ tenantId });

  const createApiKeyMutation = useMutation(() => ({
    mutationFn: async (payload: CreateApiKeyPayload) => {
      if (!tenantId()) throw new Error("Tenant is not available");

      const response = await client.POST("/api/v1/tenants/{tenant_id}/api-keys/", {
        params: {
          path: {
            tenant_id: tenantId()!,
          },
        },
        body: payload,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: apiKeyKeys.apiKeys(tenantId() ?? undefined) });
      toast.success("API key created");
    },
  }));

  const createApiKey = (payload: CreateApiKeyPayload) => {
    return new Promise<void>((resolve, reject) => {
      createApiKeyMutation.mutate(payload, {
        onSuccess: () => resolve(),
        onError: error => reject(error),
      });
    });
  };

  const filteredKeys = createMemo(() => {
    return (apiKeysQuery.data ?? []).filter(key => {
      const search = searchTerm().trim().toLowerCase();
      const matchesSearch =
        search.length === 0 ||
        key.name.toLowerCase().includes(search) ||
        key.createdBy.toLowerCase().includes(search) ||
        key.permissions.some(permission => permission.toLowerCase().includes(search));

      const matchesStatus =
        selectedStatus() === "all" ||
        (selectedStatus() === "active" && key.active) ||
        (selectedStatus() === "inactive" && !key.active);

      return matchesSearch && matchesStatus;
    });
  });

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const next = new Set(prev);
      if (next.has(keyId)) next.delete(keyId);
      else next.add(keyId);
      return next;
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("API key copied");
    } catch {
      toast.error("Failed to copy API key");
    }
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

      <div class="bg-white border-b border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <Search class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search API keys..."
                value={searchTerm()}
                onInput={e => setSearchTerm(e.currentTarget.value)}
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
            </div>

            <div class="flex items-center space-x-2">
              <Funnel class="w-5 h-5 text-gray-400" />
              <select
                value={selectedStatus()}
                onChange={e => setSelectedStatus(e.currentTarget.value)}
                class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div class="text-sm text-gray-600">
            {filteredKeys().length} of {(apiKeysQuery.data ?? []).length} API keys
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-auto p-8">
        {apiKeysQuery.isLoading ? (
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-600">
            Loading API keys...
          </div>
        ) : apiKeysQuery.isError ? (
          <div class="bg-white rounded-xl shadow-sm border border-red-200 p-12 text-center text-red-700">
            {errorMessage(apiKeysQuery.error, "Failed to load API keys.")}
          </div>
        ) : (
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
                  {filteredKeys().map(apiKey => (
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
                          <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono whitespace-pre-wrap break-all max-w-md block">
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
                              value={formatPermission(permission)}
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
                          value={apiKey.active ? "Active" : "Inactive"}
                          bgColor={apiKey.active ? "bg-green-100" : "bg-red-100"}
                          textColor={apiKey.active ? "text-green-800" : "text-red-800"}
                          icon={apiKey.active ? <CheckCircle class="w-3 h-3" /> : <CircleAlert class="w-3 h-3" />}
                        />
                      </td>
                      <td class="py-4 px-6">
                        <span class="text-sm text-gray-900">
                          {apiKey.lastUsedAt ? getTimeSince(apiKey.lastUsedAt) : "Never"}
                        </span>
                      </td>
                      <td class="py-4 px-6">
                        <div class="flex items-center space-x-2">
                          <Calendar class="w-4 h-4 text-gray-400" />
                          <span class="text-sm text-gray-900">{formatDate(apiKey.createdAt)}</span>
                        </div>
                      </td>
                      <td class="py-4 px-6">
                        <button
                          onClick={() => setSelectedApiKey(apiKey)}
                          class="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredKeys().length === 0 && (
              <div class="text-center py-12">
                <Key class="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 class="text-lg font-medium text-gray-900 mb-2">No API keys found</h3>
                <p class="text-gray-600 mb-6">
                  {searchTerm() || selectedStatus() !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "Create your first API key to start using the Mailtura API."}
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
        )}
      </div>

      {showCreateModal() && (
        <CreateApiKeyDialog
          onClose={() => setShowCreateModal(false)}
          onCreate={createApiKey}
          isPending={() => createApiKeyMutation.isPending}
        />
      )}
      {selectedApiKey() && (
        <DeleteApiKeyDialog
          apiKey={selectedApiKey}
          onClose={() => setSelectedApiKey(undefined)}
        />
      )}
    </div>
  );
};

export default ApiKeyManagement;
