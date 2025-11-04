import { createSignal } from "solid-js";
import { ROLE_PERMISSIONS, UserRole } from "../../types/auth.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useUsersQuery } from "../../services/users/use-users-query.js";
import { useTenantsQuery } from "../../services/tenants/use-tenants-query.js";
import { useParams } from "@solidjs/router";
import { useTenantId } from "../../hooks/useTenantId.js";

type CreateUserDialogProps = {
  onClose: () => void;
};

export function CreateUserDialog(props: CreateUserDialogProps) {
  const params = useParams();
  const tenantId = useTenantId();

  const { user: currentUser } = useAuth();

  const usersQuery = useUsersQuery({ tenantId: () => params.tenantId || tenantId() });
  const tenantsQuery = useTenantsQuery();

  const [userData, setUserData] = createSignal({
    firstName: "",
    lastName: "",
    email: "",
    role: "user" as UserRole,
    tenantId: currentUser()?.role === "super_admin" ? "" : currentUser()?.tenantId || "",
    isActive: true,
    sendInvitation: true,
  });
  const [errors, setErrors] = createSignal<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!userData().firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!userData().lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!userData().email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData().email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (usersQuery.data?.some(u => u.email.toLowerCase() === userData().email.toLowerCase())) {
      newErrors.email = "This email address is already in use";
    }

    if (currentUser()?.role === "super_admin" && !userData().tenantId) {
      newErrors.tenantId = "Please select a tenant";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // In real app, this would create the user via API
    console.log("Creating user:", userData);
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      role: "user",
      tenantId: currentUser()?.role === "super_admin" ? "" : currentUser()?.tenantId || "",
      isActive: true,
      sendInvitation: true,
    });
    setErrors({});
    props.onClose();
  };

  const getAvailableRoles = (): UserRole[] => {
    if (currentUser()?.role === "super_admin") {
      return ["super_admin", "tenant_admin", "user", "viewer"];
    } else if (currentUser()?.role === "tenant_admin") {
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
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Create New User</h3>
            <p class="text-sm text-gray-600 mt-1">Add a new user to the system</p>
          </div>
          <button
            onClick={props.onClose}
            class="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div class="p-6 overflow-y-auto max-h-96">
          <div class="space-y-6">
            {/* Personal Information */}
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-4">Personal Information</h4>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={userData().firstName}
                    onChange={e => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                    class={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors().firstName ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="John"
                  />
                  {errors().firstName && <p class="text-red-600 text-sm mt-1">{errors().firstName}</p>}
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={userData().lastName}
                    onChange={e => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                    class={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors().lastName ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Doe"
                  />
                  {errors().lastName && <p class="text-red-600 text-sm mt-1">{errors().lastName}</p>}
                </div>
              </div>

              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={userData().email}
                  onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))}
                  class={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors().email ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="john.doe@example.com"
                />
                {errors().email && <p class="text-red-600 text-sm mt-1">{errors().email}</p>}
              </div>
            </div>

            {/* Account Settings */}
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-4">Account Settings</h4>

              {/* Tenant Selection (only for super admins) */}
              {currentUser()?.role === "super_admin" && (
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tenant *</label>
                  <select
                    value={userData().tenantId}
                    onChange={e => setUserData(prev => ({ ...prev, tenantId: e.target.value }))}
                    class={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors().tenantId ? "border-red-300" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select a tenant</option>
                    {tenantsQuery.data?.map(tenant => (
                      <option value={tenant.id}>{tenant.name}</option>
                    ))}
                  </select>
                  {errors().tenantId && <p class="text-red-600 text-sm mt-1">{errors().tenantId}</p>}
                </div>
              )}

              {/* Role Selection */}
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-3">Role *</label>
                <div class="space-y-3">
                  {getAvailableRoles().map(role => (
                    <div
                      onClick={() => setUserData(prev => ({ ...prev, role }))}
                      class={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        userData().role === role
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="role"
                            checked={userData().role === role}
                            onChange={() => setUserData(prev => ({ ...prev, role }))}
                            class="text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <h5 class="font-medium text-gray-900 capitalize">{role.replace("_", " ")}</h5>
                            <p class="text-sm text-gray-600">{getRoleDescription(role)}</p>
                          </div>
                        </div>
                        <div class="text-sm text-gray-500">{getPermissionCount(role)} permissions</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Status */}
              <div class="flex items-center justify-between mb-4">
                <div>
                  <label class="text-sm font-medium text-gray-700">Account Status</label>
                  <p class="text-sm text-gray-600">User can sign in and access the system</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userData().isActive}
                    onChange={e => setUserData(prev => ({ ...prev, isActive: e.target.checked }))}
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Send Invitation */}
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-sm font-medium text-gray-700">Send Invitation Email</label>
                  <p class="text-sm text-gray-600">Send setup instructions to the user's email</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userData().sendInvitation}
                    onChange={e => setUserData(prev => ({ ...prev, sendInvitation: e.target.checked }))}
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={props.onClose}
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  );
}
