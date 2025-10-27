import { Building2, Edit, Eye, Filter, MoreHorizontal, Plus, Search, Settings, Users } from "lucide-solid";
import { createSignal } from "solid-js";
import { Tenant } from "@mailtura/rpcmodel/lib/models/index.js";

interface Tentant0 extends Tenant {
  domain: string;
  isActive: boolean;
  userCount: number;
  settings: {
    maxUsers: number;
    features: string[];
    customBranding?: {
      companyName: string;
      primaryColor: string;
    };
  };
}

const TenantManagement = () => {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [selectedStatus, setSelectedStatus] = createSignal("all");
  const [_showCreateModal, setShowCreateModal] = createSignal(false);

  // Mock data - in real app this would come from API
  const tenants: Tentant0[] = [
    {
      id: "tenant-1",
      name: "Acme Corporation",
      domain: "acme.com",
      isActive: true,
      createdAt: "2024-01-01",
      createdBy: "api",
      userCount: 15,
      settings: {
        maxUsers: 50,
        features: ["campaigns", "analytics", "templates"],
        customBranding: {
          companyName: "Acme Corporation",
          primaryColor: "#3b82f6",
        },
      },
    },
    {
      id: "tenant-2",
      name: "TechStart Inc",
      domain: "techstart.io",
      isActive: true,
      createdAt: "2024-01-15",
      createdBy: "api",
      userCount: 8,
      settings: {
        maxUsers: 25,
        features: ["campaigns", "templates"],
      },
    },
    {
      id: "tenant-3",
      name: "Global Enterprises",
      domain: "global-ent.com",
      isActive: false,
      createdAt: "2024-01-20",
      createdBy: "api",
      userCount: 3,
      settings: {
        maxUsers: 100,
        features: ["campaigns", "analytics", "templates", "advanced_reporting"],
      },
    },
  ];

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm().toLowerCase()) ||
      tenant.domain.toLowerCase().includes(searchTerm().toLowerCase());
    const matchesStatus =
      selectedStatus() === "all" ||
      (selectedStatus() === "active" && tenant.isActive) ||
      (selectedStatus() === "inactive" && !tenant.isActive);
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div class="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div class="bg-white border-b border-gray-200 p-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Tenant Management</h1>
            <p class="text-gray-600">Manage organizations and their settings</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus class="w-5 h-5" />
            <span>New Tenant</span>
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
                placeholder="Search tenants..."
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
            {filteredTenants.length} of {tenants.length} tenants
          </div>
        </div>
      </div>

      {/* Tenants Table */}
      <div class="flex-1 overflow-auto p-8">
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
                {filteredTenants.map(tenant => (
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="py-4 px-6">
                      <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 class="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div class="font-medium text-gray-900">{tenant.name}</div>
                          <div class="text-sm text-gray-500">{tenant.domain}</div>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 px-6">
                      <span
                        class={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tenant.isActive)}`}
                      >
                        {tenant.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td class="py-4 px-6">
                      <div class="flex items-center space-x-2">
                        <Users class="w-4 h-4 text-gray-400" />
                        <span class="text-sm text-gray-900">
                          {tenant.userCount} / {tenant.settings.maxUsers}
                        </span>
                      </div>
                    </td>
                    <td class="py-4 px-6">
                      <div class="flex flex-wrap gap-1">
                        {tenant.settings.features.slice(0, 2).map(feature => (
                          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                            {feature}
                          </span>
                        ))}
                        {tenant.settings.features.length > 2 && (
                          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                            +{tenant.settings.features.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td class="py-4 px-6">
                      <span class="text-sm text-gray-900">{formatDate(tenant.createdAt)}</span>
                    </td>
                    <td class="py-4 px-6">
                      <div class="flex items-center space-x-2">
                        <button class="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye class="w-4 h-4" />
                        </button>
                        <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Edit class="w-4 h-4" />
                        </button>
                        <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Settings class="w-4 h-4" />
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

        {filteredTenants.length === 0 && (
          <div class="text-center py-12">
            <Building2 class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No tenants found</h3>
            <p class="text-gray-600 mb-6">
              {searchTerm() || selectedStatus() !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by creating your first tenant."}
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Tenant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantManagement;
