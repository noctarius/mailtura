import { Funnel, Loader, Plus, Search, User as UserIcon } from "lucide-solid";
import { createMemo, createSignal } from "solid-js";
import { useUsersQuery } from "../services/users/use-users-query.js";
import { useTenantId } from "../hooks/useTenantId.js";
import { useParams } from "@solidjs/router";
import { CreateUserDialog } from "../components/modals/CreateUserDialog.js";
import { UsersTable } from "../components/interfaces/UsersTable.js";

const UserManagement = () => {
  const [usersTable, setUsersTable] = createSignal<HTMLDivElement>();

  const params = useParams();
  const tenantId = useTenantId();

  const selectedTenantId = createMemo(() => params.tenantId || tenantId());

  const [searchTerm, setSearchTerm] = createSignal("");
  const [selectedRole, setSelectedRole] = createSignal("all");
  const [selectedStatus, setSelectedStatus] = createSignal("all");
  const [showCreateModal, setShowCreateModal] = createSignal(false);

  const usersQuery = useUsersQuery({ tenantId: selectedTenantId });

  const filteredUsers = createMemo(() => {
    if (!usersQuery.data) return [];
    return usersQuery.data.filter(user => {
      const matchesSearch =
        user.email.toLowerCase().includes(searchTerm().toLowerCase()) ||
        user.firstName?.toLowerCase().includes(searchTerm().toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm().toLowerCase());
      const matchesRole = selectedRole() === "all" || user.roleId === selectedRole();
      const matchesStatus =
        selectedStatus() === "all" ||
        (selectedStatus() === "active" && user.active) ||
        (selectedStatus() === "inactive" && !user.active);
      return matchesSearch && matchesRole && matchesStatus;
    });
  });

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
        {usersQuery.isLoading ? (
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
        ) : filteredUsers().length > 0 ? (
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-1 flex-col min-h-0">
            <div
              ref={setUsersTable}
              class="overflow-auto relative rounded-xl"
              style={{ "scroll-behavior": "smooth", "min-height": "100%" }}
            >
              {usersTable() && selectedTenantId() !== undefined && (
                <UsersTable
                  tenantId={() => selectedTenantId()!}
                  data={filteredUsers}
                  target={usersTable()!}
                />
              )}
            </div>
          </div>
        ) : (
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
      {showCreateModal() && (
        <CreateUserDialog
          tenantId={() => selectedTenantId()!}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default UserManagement;
