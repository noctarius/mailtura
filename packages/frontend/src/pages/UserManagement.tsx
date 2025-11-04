import {
  Building2,
  Calendar,
  CreditCard,
  Ellipsis,
  Funnel,
  Loader,
  Mail,
  Plus,
  RefreshCcwIcon,
  Search,
  Shield,
  Trash2,
  User as UserIcon,
} from "lucide-solid";
import { createMemo, createSignal } from "solid-js";
import { useTenantsQuery } from "../services/tenants/use-tenants-query.js";
import { useUsersQuery } from "../services/users/use-users-query.js";
import { useTenantId } from "../hooks/useTenantId.js";
import { useParams } from "@solidjs/router";
import { ContextMenuAction } from "../components/interfaces/ContextMenu.js";
import { getRoleColorClasses, getStatusColorClasses } from "../components/interfaces/UsersTable.utils.js";
import { CreateUserDialog } from "../components/modals/CreateUserDialog.js";

const contextMenuActions: ContextMenuAction[] = [
  {
    action: "reset-password",
    icon: RefreshCcwIcon,
    label: "Reset Password",
  },
  {
    action: "delete",
    icon: Trash2,
    label: "Delete Contact",
  },
];

const UserManagement = () => {
  const params = useParams();
  const tenantId = useTenantId();

  const [searchTerm, setSearchTerm] = createSignal("");
  const [selectedRole, setSelectedRole] = createSignal("all");
  const [selectedStatus, setSelectedStatus] = createSignal("all");
  const [showCreateModal, setShowCreateModal] = createSignal(false);

  const usersQuery = useUsersQuery({ tenantId: () => params.tenantId || tenantId() });
  const tenantsQuery = useTenantsQuery();

  const isLoading = createMemo(() => usersQuery.isLoading || tenantsQuery.isLoading);

  const filteredUsers = createMemo(() => {
    if (!usersQuery.data) return [];
    return usersQuery.data.filter(user => {
      const matchesSearch =
        user.email.toLowerCase().includes(searchTerm().toLowerCase()) ||
        user.firstName?.toLowerCase().includes(searchTerm().toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm().toLowerCase());
      const matchesRole = selectedRole() === "all" || user.role === selectedRole();
      const matchesStatus =
        selectedStatus() === "all" ||
        (selectedStatus() === "active" && user.isActive) ||
        (selectedStatus() === "inactive" && !user.isActive);
      return matchesSearch && matchesRole && matchesStatus;
    });
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatLastLogin = (dateString?: string) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else {
      return `${diffInDays} days ago`;
    }
  };

  const getTenantName = (tenantId: string) => {
    return tenantsQuery.data?.find(tenant => tenant.id === tenantId)?.name ?? "Unknown";
  };

  return (
    <div class="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div class="bg-white border-b border-gray-200 p-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
            <p class="text-gray-600">Manage users, roles, and permissions</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus class="w-5 h-5" />
            <span>New User</span>
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
                placeholder="Search users..."
                value={searchTerm()}
                onChange={e => setSearchTerm(e.target.value)}
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
            </div>

            <div class="flex items-center space-x-2">
              <Funnel class="w-5 h-5 text-gray-400" />
              <select
                value={selectedRole()}
                onChange={e => setSelectedRole(e.target.value)}
                class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="super_admin">Super Admin</option>
                <option value="tenant_admin">Tenant Admin</option>
                <option value="user">User</option>
                <option value="viewer">Viewer</option>
              </select>

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
            {filteredUsers().length} of {usersQuery.data?.length} users
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div class="flex-1 overflow-auto p-8">
        {isLoading() ? (
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div class="flex flex-col items-center justify-center space-y-4">
              <div class="relative">
                <Loader class="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <div class="text-center">
                <h3 class="text-lg font-medium text-gray-900 mb-2">Loading Users</h3>
                <p class="text-gray-600">Please wait while we fetch your user data...</p>
              </div>
              {/* Loading skeleton */}
              <div class="w-full max-w-4xl mt-8 space-y-4">
                {[...Array(5)].map(() => (
                  <div class="animate-pulse">
                    <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div class="flex-1 space-y-2">
                        <div class="h-4 bg-gray-300 rounded w-1/4"></div>
                        <div class="h-3 bg-gray-300 rounded w-1/3"></div>
                      </div>
                      <div class="flex space-x-2">
                        <div class="h-6 bg-gray-300 rounded-full w-16"></div>
                        <div class="h-6 bg-gray-300 rounded-full w-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="text-left py-4 px-6 font-semibold text-gray-900">User</th>
                    <th class="text-left py-4 px-6 font-semibold text-gray-900">Role</th>
                    <th class="text-left py-4 px-6 font-semibold text-gray-900">Tenant</th>
                    <th class="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                    <th class="text-left py-4 px-6 font-semibold text-gray-900">Last Login</th>
                    <th class="text-left py-4 px-6 font-semibold text-gray-900">Created</th>
                    <th class="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  {filteredUsers().map(user => (
                    <tr class="hover:bg-gray-50 transition-colors">
                      <td class="py-4 px-6">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span class="text-blue-600 font-medium">
                              {user.firstName?.charAt(0)}
                              {user.lastName?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div class="font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div class="text-sm text-gray-500 flex items-center space-x-1">
                              <Mail class="w-3 h-3" />
                              <span>{user.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="py-4 px-6">
                        <div class="flex items-center space-x-2">
                          <span
                            class={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColorClasses(user.role)}`}
                          >
                            <Shield class="w-3 h-3" />
                            <span class="capitalize">{user.role.replace("_", " ")}</span>
                          </span>
                        </div>
                      </td>
                      <td class="py-4 px-6">
                        <div class="flex items-center space-x-2">
                          <Building2 class="w-4 h-4 text-gray-400" />
                          <span class="text-sm text-gray-900">{getTenantName(user.tenantId)}</span>
                        </div>
                      </td>
                      <td class="py-4 px-6">
                        <span
                          class={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColorClasses(user.isActive)}`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td class="py-4 px-6">
                        <span class="text-sm text-gray-900">{formatLastLogin(user.lastLoginAt)}</span>
                      </td>
                      <td class="py-4 px-6">
                        <div class="flex items-center space-x-2">
                          <Calendar class="w-4 h-4 text-gray-400" />
                          <span class="text-sm text-gray-900">{formatDate(user.createdAt)}</span>
                        </div>
                      </td>
                      <td class="py-4 px-6">
                        <div class="flex items-center space-x-2">
                          <button class="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <CreditCard class="w-4 h-4" />
                          </button>
                          <button class="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 class="w-4 h-4" />
                          </button>
                          <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Ellipsis class="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredUsers().length === 0 && (
          <div class="text-center py-12">
            <UserIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p class="text-gray-600 mb-6">
              {searchTerm() || selectedRole() !== "all" || selectedStatus() !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by creating your first user."}
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create User
            </button>
          </div>
        )}
      </div>

      {/* Create User Modal */}
      {showCreateModal() && <CreateUserDialog onClose={() => setShowCreateModal(false)} />}
    </div>
  );
};

export default UserManagement;
