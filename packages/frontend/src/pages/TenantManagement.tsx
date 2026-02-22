import { Building2, Eye, Funnel, Plus, Search, SquarePen, Trash2 } from "lucide-solid";
import { createEffect, createMemo, createSignal, Show } from "solid-js";
import { Tenant } from "@mailtura/rpcmodel/api/index.js";
import { A } from "@solidjs/router";
import { useTenantsQuery } from "../services/tenants/use-tenants-query.js";
import { TableLoading } from "../components/interfaces/TableLoading.js";
import { useApi } from "../hooks/useApi.js";
import { EditTenantDrawer } from "../components/modals/EditTenantDrawer.js";
import { CreateTenantDialog } from "../components/modals/CreateTenantDialog.js";
import { DeleteTenantDialog } from "../components/modals/DeleteTenantDialog.js";

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const TenantManagement = () => {
  const client = useApi();
  const [searchTerm, setSearchTerm] = createSignal("");
  const [showCreateDialog, setShowCreateDialog] = createSignal(false);
  const [editingTenant, setEditingTenant] = createSignal<Tenant | undefined>(undefined);
  const [deleteTenant, setDeleteTenant] = createSignal<Tenant | undefined>(undefined);
  const [userCountByTenant, setUserCountByTenant] = createSignal<Record<string, number>>({});

  const tenantsQuery = useTenantsQuery();

  const tenants = createMemo(() => tenantsQuery.data ?? []);

  createEffect(async () => {
    const tenantList = tenants();
    if (tenantList.length === 0) {
      setUserCountByTenant({});
      return;
    }

    const entries = await Promise.all(
      tenantList.map(async tenant => {
        const response = await client.GET("/api/v1/tenants/{tenant_id}/users/count", {
          params: {
            path: {
              tenant_id: tenant.id,
            },
          },
        });
        if (response.error) return [tenant.id, 0] as const;
        return [tenant.id, response.data] as const;
      })
    );
    setUserCountByTenant(Object.fromEntries(entries));
  });

  const filteredTenants = createMemo(() => {
    const term = searchTerm().trim().toLowerCase();
    if (term.length === 0) return tenants();
    return tenants().filter(
      tenant =>
        tenant.name.toLowerCase().includes(term) ||
        tenant.id.toLowerCase().includes(term) ||
        (tenant.customDomain ?? "").toLowerCase().includes(term)
    );
  });

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  return (
    <div class="h-full flex flex-col bg-gray-50">
      <div class="bg-white border-b border-gray-200 p-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Tenant Management</h1>
            <p class="text-gray-600">Manage organizations and tenant-scoped users</p>
          </div>
          <button
            onClick={() => setShowCreateDialog(true)}
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus class="w-5 h-5" />
            <span>New Tenant</span>
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
                placeholder="Search tenants by name or id..."
                value={searchTerm()}
                onInput={e => setSearchTerm(e.currentTarget.value)}
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
            </div>
            <div class="flex items-center space-x-2 text-sm text-gray-500">
              <Funnel class="w-4 h-4" />
              <span>{filteredTenants().length} tenant(s)</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-auto p-8">
        <Show
          when={!tenantsQuery.isLoading}
          fallback={
            <TableLoading
              title="Loading Tenants"
              text="Please wait while tenant data is being loaded..."
            />
          }
        >
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="text-left py-4 px-6 font-semibold text-gray-900">Tenant</th>
                    <th class="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                    <th class="text-left py-4 px-6 font-semibold text-gray-900">Users</th>
                    <th class="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                    <th class="text-left py-4 px-6 font-semibold text-gray-900">Created</th>
                    <th class="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  {filteredTenants().map(tenant => (
                    <tr class="hover:bg-gray-50 transition-colors">
                      <td class="py-4 px-6">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building2 class="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div class="font-medium text-gray-900">{tenant.name}</div>
                            <div class="text-sm text-gray-500">{tenant.customDomain ?? tenant.id}</div>
                          </div>
                        </div>
                      </td>
                      <td class="py-4 px-6">
                        <span
                          class={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tenant.active)}`}
                        >
                          {tenant.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td class="py-4 px-6">
                        <span class="text-sm text-gray-900">
                          {userCountByTenant()[tenant.id] ?? "-"} /{" "}
                          {tenant.maxUsers === 0 ? "Unlimited" : tenant.maxUsers}
                        </span>
                      </td>
                      <td class="py-4 px-6">
                        <div class="flex flex-wrap gap-1">
                          {tenant.features.slice(0, 2).map(feature => (
                            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                              {feature}
                            </span>
                          ))}
                          {tenant.features.length > 2 && (
                            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                              +{tenant.features.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td class="py-4 px-6">
                        <span class="text-sm text-gray-900">{formatDate(tenant.createdAt)}</span>
                      </td>
                      <td class="py-4 px-6">
                        <div class="flex items-center space-x-2">
                          <A
                            href={`/settings/tenant-management/${tenant.id}/user-management`}
                            class="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="View Users"
                          >
                            <Eye class="w-4 h-4" />
                          </A>
                          <button
                            onClick={() => setEditingTenant(tenant)}
                            class="p-2 text-gray-400 hover:text-gray-700 transition-colors"
                            title="Edit Tenant"
                          >
                            <SquarePen class="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTenant(tenant)}
                            class="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-400"
                            title="Delete Tenant"
                            disabled={tenant.name === "::system::"}
                          >
                            <Trash2 class="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredTenants().length === 0 && (
            <div class="text-center py-12">
              <Building2 class="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">No tenants found</h3>
              <p class="text-gray-600 mb-6">Try adjusting your search criteria or create a new tenant.</p>
              <button
                onClick={() => setShowCreateDialog(true)}
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Tenant
              </button>
            </div>
          )}
        </Show>
      </div>

      <Show when={showCreateDialog()}>
        <CreateTenantDialog onClose={() => setShowCreateDialog(false)} />
      </Show>

      <Show when={editingTenant()}>
        {tenant => (
          <EditTenantDrawer
            tenant={tenant}
            isVisible={() => !!editingTenant()}
            onClose={() => setEditingTenant(undefined)}
          />
        )}
      </Show>

      <Show when={!!deleteTenant()}>
        <DeleteTenantDialog
          tenant={deleteTenant}
          onClose={() => setDeleteTenant(undefined)}
        />
      </Show>
    </div>
  );
};

export default TenantManagement;
