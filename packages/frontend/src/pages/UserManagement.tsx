import React, { useState } from "react";
import {
  Building2,
  Calendar,
  CreditCard as Edit,
  Filter,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  Trash2,
  User as UserIcon,
} from "lucide-react";
import { ROLE_PERMISSIONS, User, UserRole } from "../types/auth";
import { useAuth } from "../hooks/useAuth.tsx";

const UserManagement: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data - in real app this would come from API
  const users: User[] = [
    {
      id: "user-1",
      email: "admin@acme.com",
      firstName: "John",
      lastName: "Admin",
      role: "tenant_admin",
      tenantId: "tenant-1",
      permissions: [
        "manage::users",
        "manage::campaigns",
        "manage::templates",
        "manage::contacts",
        "manage::reports",
        "manage::settings",
        "manage::suppressions",
        "manage::api-keys",
        "manage::integrations",
        "manage::logs",
        "manage::webhooks",
      ],
      isActive: true,
      createdAt: "2024-01-01",
      lastLoginAt: "2024-01-25T14:30:00Z",
    },
    {
      id: "user-2",
      email: "user@acme.com",
      firstName: "Jane",
      lastName: "User",
      role: "user",
      tenantId: "tenant-1",
      permissions: [
        "manage::campaigns",
        "manage::templates",
        "manage::contacts",
        "view::reports",
        "view::suppressions",
        "view::logs",
      ],
      isActive: true,
      createdAt: "2024-01-05",
      lastLoginAt: "2024-01-24T09:15:00Z",
    },
    {
      id: "user-3",
      email: "viewer@acme.com",
      firstName: "Bob",
      lastName: "Viewer",
      role: "viewer",
      tenantId: "tenant-1",
      permissions: ["view::reports"],
      isActive: true,
      createdAt: "2024-01-10",
    },
    {
      id: "user-4",
      email: "inactive@acme.com",
      firstName: "Alice",
      lastName: "Inactive",
      role: "user",
      tenantId: "tenant-1",
      permissions: [
        "manage::campaigns",
        "manage::templates",
        "manage::contacts",
        "view::reports",
        "view::suppressions",
        "view::logs",
      ],
      isActive: false,
      createdAt: "2024-01-15",
      lastLoginAt: "2024-01-20T16:45:00Z",
    },
  ];

  const tenants = [
    { id: "tenant-1", name: "Acme Corporation" },
    { id: "tenant-2", name: "TechStart Inc" },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" && user.isActive) ||
      (selectedStatus === "inactive" && !user.isActive);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "super_admin":
        return "bg-purple-100 text-purple-800";
      case "tenant_admin":
        return "bg-blue-100 text-blue-800";
      case "user":
        return "bg-green-100 text-green-800";
      case "viewer":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
    return tenants.find(t => t.id === tenantId)?.name || "Unknown";
  };

  const CreateUserModal = () => {
    const [userData, setUserData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      role: "user" as UserRole,
      tenantId: currentUser?.role === "super_admin" ? "" : currentUser?.tenantId || "",
      isActive: true,
      sendInvitation: true,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
      const newErrors: Record<string, string> = {};

      if (!userData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }

      if (!userData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }

      if (!userData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
        newErrors.email = "Please enter a valid email address";
      } else if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
        newErrors.email = "This email address is already in use";
      }

      if (currentUser?.role === "super_admin" && !userData.tenantId) {
        newErrors.tenantId = "Please select a tenant";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
      if (!validateForm()) return;

      // In real app, this would create the user via API
      console.log("Creating user:", userData);
      setShowCreateModal(false);
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        role: "user",
        tenantId: currentUser?.role === "super_admin" ? "" : currentUser?.tenantId || "",
        isActive: true,
        sendInvitation: true,
      });
      setErrors({});
    };

    const getAvailableRoles = (): UserRole[] => {
      if (currentUser?.role === "super_admin") {
        return ["super_admin", "tenant_admin", "user", "viewer"];
      } else if (currentUser?.role === "tenant_admin") {
        return ["tenant_admin", "user", "viewer"];
      }
      return ["user", "viewer"];
    };

    const getRoleDescription = (role: UserRole) => {
      switch (role) {
        case "super_admin":
          return "Full system access including tenant management";
        case "tenant_admin":
          return "Manage users and all features within tenant";
        case "user":
          return "Standard access to campaigns, templates, and contacts";
        case "viewer":
          return "Read-only access to analytics and activity";
        default:
          return "";
      }
    };

    const getPermissionCount = (role: UserRole) => {
      return ROLE_PERMISSIONS[role]?.length || 0;
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Create New User</h3>
              <p className="text-sm text-gray-600 mt-1">Add a new user to the system</p>
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
              {/* Personal Information */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={userData.firstName}
                      onChange={e => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.firstName ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={userData.lastName}
                      onChange={e => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.lastName ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Account Settings */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Account Settings</h4>

                {/* Tenant Selection (only for super admins) */}
                {currentUser?.role === "super_admin" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tenant *</label>
                    <select
                      value={userData.tenantId}
                      onChange={e => setUserData(prev => ({ ...prev, tenantId: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.tenantId ? "border-red-300" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select a tenant</option>
                      {tenants.map(tenant => (
                        <option
                          key={tenant.id}
                          value={tenant.id}
                        >
                          {tenant.name}
                        </option>
                      ))}
                    </select>
                    {errors.tenantId && <p className="text-red-600 text-sm mt-1">{errors.tenantId}</p>}
                  </div>
                )}

                {/* Role Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Role *</label>
                  <div className="space-y-3">
                    {getAvailableRoles().map(role => (
                      <div
                        key={role}
                        onClick={() => setUserData(prev => ({ ...prev, role }))}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          userData.role === role
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="role"
                              checked={userData.role === role}
                              onChange={() => setUserData(prev => ({ ...prev, role }))}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <div>
                              <h5 className="font-medium text-gray-900 capitalize">{role.replace("_", " ")}</h5>
                              <p className="text-sm text-gray-600">{getRoleDescription(role)}</p>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">{getPermissionCount(role)} permissions</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Account Status */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Account Status</label>
                    <p className="text-sm text-gray-600">User can sign in and access the system</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={userData.isActive}
                      onChange={e => setUserData(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Send Invitation */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Send Invitation Email</label>
                    <p className="text-sm text-gray-600">Send setup instructions to the user's email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={userData.sendInvitation}
                      onChange={e => setUserData(prev => ({ ...prev, sendInvitation: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
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
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">Manage users, roles, and permissions</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New User</span>
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="super_admin">Super Admin</option>
                <option value="tenant_admin">Tenant Admin</option>
                <option value="user">User</option>
                <option value="viewer">Viewer</option>
              </select>

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
            {filteredUsers.length} of {users.length} users
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">User</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Role</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Tenant</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Last Login</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Created</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map(user => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {user.firstName.charAt(0)}
                            {user.lastName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                        >
                          <Shield className="w-3 h-3" />
                          <span className="capitalize">{user.role.replace("_", " ")}</span>
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{getTenantName(user.tenantId)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.isActive)}`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">{formatLastLogin(user.lastLoginAt)}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{formatDate(user.createdAt)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedRole !== "all" || selectedStatus !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by creating your first user."}
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create User
            </button>
          </div>
        )}
      </div>

      {/* Create User Modal */}
      {showCreateModal && <CreateUserModal />}
    </div>
  );
};

export default UserManagement;
