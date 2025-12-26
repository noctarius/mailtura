import { Funnel, Plus, Search, User as UserIcon } from "lucide-solid";
import { createEffect, createMemo, createSignal } from "solid-js";
import { useUsersQuery } from "../services/users/use-users-query.js";
import { useTenantId } from "../hooks/useTenantId.js";
import { useParams } from "@solidjs/router";
import { CreateUserDialog } from "../components/modals/CreateUserDialog.js";
import { UsersTable } from "../components/interfaces/UsersTable.js";
import { TableLoading } from "../components/interfaces/TableLoading.js";
import { debounce } from "lodash";
import { TablePagination } from "../components/interfaces/TablePagination.js";

const UserManagement = () => {
  const [usersTable, setUsersTable] = createSignal<HTMLDivElement>();

  const params = useParams();
  const tenantId = useTenantId();

  const selectedTenantId = createMemo(() => params.tenantId || tenantId());

  const [searchTerm, setSearchTerm] = createSignal("");
  const [selectedRole, setSelectedRole] = createSignal("all");
  const [selectedStatus, setSelectedStatus] = createSignal("all");
  const [showCreateModal, setShowCreateModal] = createSignal(false);
  const [pageCursor, setPageCursor] = createSignal<string | undefined>(undefined);

  const updateSearchTerm = debounce((searchTerm: string) => setSearchTerm(searchTerm), 250);

  const filterQuery = createMemo(() => {
    const filterTerm = searchTerm();
    if (filterTerm.trim().length === 0) return undefined;
    return `email ILIKE "%${filterTerm}%" OR firstName ILIKE "%${filterTerm}%" OR lastName ILIKE "%${filterTerm}%"`;
  });

  createEffect(() => {
    filterQuery();
    setPageCursor(undefined);
  });

  const usersQuery = useUsersQuery({ tenantId: selectedTenantId, query: filterQuery, cursor: pageCursor });

  const filteredUsers = createMemo(() => {
    if (!usersQuery.data?.data) return [];
    return usersQuery.data?.data.filter(user => {
      const matchesRole = selectedRole() === "all" || user.roleId === selectedRole();
      const matchesStatus =
        selectedStatus() === "all" ||
        (selectedStatus() === "active" && user.active) ||
        (selectedStatus() === "inactive" && !user.active);
      return matchesRole && matchesStatus;
    });
  });

  const pagination = createMemo(() => {
    return usersQuery.data?.metadata;
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
                onChange={e => updateSearchTerm(e.target.value)}
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
            {filteredUsers().length} of {usersQuery.data?.data.length} users
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div class="pl-8 pr-8 pt-8 pb-3 flex flex-1 flex-col min-h-0">
        {usersQuery.isLoading ? (
          <TableLoading
            title="Loading Users"
            text="Please wait while we fetch your user data..."
          />
        ) : filteredUsers().length > 0 ? (
          <>
            <div class="flex flex-row min-h-0 relative">
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-1 flex-col min-h-0">
                <div
                  ref={setUsersTable}
                  class="overflow-auto relative rounded-xl min-h-100 scroll-smooth"
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
            </div>
            <TablePagination
              pagination={pagination}
              onPageChange={setPageCursor}
            />
          </>
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
