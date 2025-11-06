import { createMemo } from "solid-js";
import { useUser } from "../../hooks/useUser.js";
import { useRolesQuery } from "../../services/roles/use-roles-query.js";
import { hasPermission } from "@mailtura/backend/src/auth/index.js";
import { useCreateMutation } from "../../services/adapters/useCreateMutation.js";
import { createFormSpec, FormSubmitHandler } from "../../forms/index.js";
import { CreateUser } from "@mailtura/rpcmodel/lib/models/request-response.js";
import { userKeys } from "../../services/users/keys.js";
import { useQueryClient } from "@tanstack/solid-query";
import { SubmitHandler } from "@modular-forms/solid";
import { Static, Type } from "typebox";

const CreateUserForm = Type.Omit(CreateUser, ["permissions"]);
type CreateUserForm = Static<typeof CreateUserForm>

type CreateUserDialogProps = {
  tenantId: () => string;
  onClose: () => void;
};

export function CreateUserDialog(props: CreateUserDialogProps) {
  const queryClient = useQueryClient();
  const user = useUser();

  const rolesQuery = useRolesQuery({ tenantId: props.tenantId });

  const createUser = useCreateMutation("/api/v1/tenants/{tenant_id}/users/", {
    tenant_id: props.tenantId,
  });

  const newUserForm = createFormSpec<typeof CreateUserForm>(
    CreateUserForm,
    {
      email: {
        label: "Email",
        type: "email",
        required: true,
      },
      firstName: {
        label: "First Name",
        type: "text",
        required: true,
      },
      lastName: {
        label: "Last Name",
        type: "text",
        required: true,
      },
      roleId: {
        label: "Role",
        type: "select",
        options: () =>
          getAvailableRoles().map(role => ({
            label: role.name.replace("_", " "),
            value: role.id,
            description: role.description ?? getRoleDescription(role.name),
          })),
        required: true,
      },
      isActive: {
        label: "Account Status",
        type: "toggle",
        defaultValue: true,
        required: true,
      },
      sendInvitationEmail: {
        label: "Send Invitation Email",
        type: "toggle",
        defaultValue: true,
        required: true,
      },
    },
    [],
    {
      isActive: true,
      sendInvitationEmail: true,
    }
  );

  const onSubmit: SubmitHandler<CreateUserForm> = async (values, event) => {
    event.preventDefault();
    try {
      await handleCreateUser(values);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCreateUser: FormSubmitHandler<CreateUserForm> = async values => {
    return new Promise((resolve, reject) => {
      createUser.mutate(
        {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          roleId: values.roleId,
          permissions: rolesQuery.data?.find(role => role.id === values.roleId)?.permissions ?? [],
          isActive: values.isActive,
          sendInvitationEmail: values.sendInvitationEmail,
        },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: userKeys.users(props.tenantId()) });
            props.onClose();
            resolve(undefined);
          },
          onError: error => {
            console.error("Error updating user:", error);
            reject(error);
          },
        }
      );
    });
  };

  const getAvailableRoles = createMemo(() => {
    const creator = user();
    if (!creator) return [];
    if (hasPermission("manage::tenants", creator)) {
      return rolesQuery.data ?? [];
    } else {
      return (rolesQuery.data ?? []).filter(role => !role.permissions.includes("manage::tenants"));
    }
  });

  const getRoleDescription = (role: string) => {
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

  const getPermissionCount = (roleId: string) => {
    return (rolesQuery.data ?? []).find(role => role.id === roleId)?.permissions.length || 0;
  };

  const Form = newUserForm.Form;
  const Field = newUserForm.Field;

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

        <Form onSubmit={onSubmit}>
          <div class="p-6 overflow-y-auto max-h-96">
            <div class="space-y-6">
              {/* Personal Information */}
              <div>
                <h4 class="text-md font-medium text-gray-900 mb-4">Personal Information</h4>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <Field
                      name="firstName"
                      type="string"
                    >
                      {(field, props) => {
                        return (
                          <>
                            <label
                              class={`block text-sm font-medium text-gray-700 mb-2 ${field.error ? "text-red-500" : ""}`}
                            >
                              First Name <span class="text-red-500">*</span>
                            </label>
                            <input
                              {...props}
                              value={field.value}
                              class={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                field.error ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder="John"
                            />
                            {field.error && <p class="text-red-500 text-sm mt-1">{field.error}</p>}
                          </>
                        );
                      }}
                    </Field>
                  </div>
                  <div>
                    <Field
                      name="lastName"
                      type="string"
                    >
                      {(field, props) => {
                        return (
                          <>
                            <label
                              class={`block text-sm font-medium text-gray-700 mb-2 ${field.error ? "text-red-500" : ""}`}
                            >
                              Last Name <span class="text-red-500">*</span>
                            </label>
                            <input
                              {...props}
                              value={field.value}
                              class={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                field.error ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder="Doe"
                            />
                            {field.error && <p class="text-red-500 text-sm mt-1">{field.error}</p>}
                          </>
                        );
                      }}
                    </Field>
                  </div>
                </div>

                <div class="mt-4">
                  <Field
                    name="email"
                    type="string"
                  >
                    {(field, props) => {
                      return (
                        <>
                          <label
                            class={`block text-sm font-medium text-gray-700 mb-2 ${field.error ? "text-red-500" : ""}`}
                          >
                            Email Address <span class="text-red-500">*</span>
                          </label>
                          <input
                            {...props}
                            value={field.value}
                            class={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              field.error ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="john.doe@example.com"
                          />
                          {field.error && <p class="text-red-500 text-sm mt-1">{field.error}</p>}
                        </>
                      );
                    }}
                  </Field>
                </div>
              </div>

              {/* Account Settings */}
              <div>
                <h4 class="text-md font-medium text-gray-900 mb-4">Account Settings</h4>
                {/* Role Selection */}
                <div class="mb-4">
                  <Field
                    name="roleId"
                    type="string"
                  >
                    {(field, props) => {
                      const fieldSpec = newUserForm.getField("roleId");
                      return (
                        <>
                          <label class="block text-sm font-medium text-gray-700 mb-3">Role *</label>
                          <div class="space-y-3">
                            {(fieldSpec.options ? fieldSpec.options() : []).map(item => (
                              <div
                                onClick={() => newUserForm.updateField("roleId", item.value)}
                                class={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                  field.value === item.value
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <div class="flex items-center justify-between">
                                  <div class="flex items-center space-x-3">
                                    <input
                                      {...props}
                                      type="radio"
                                      name="role"
                                      checked={field.value === item.value}
                                      class="text-blue-600 focus:ring-blue-500"
                                    />
                                    <div>
                                      <h5 class="font-medium text-gray-900 capitalize">
                                        {item.label.replace("_", " ")}
                                      </h5>
                                      <p class="text-sm text-gray-600">{item.description ?? ""}</p>
                                    </div>
                                  </div>
                                  <div class="text-sm text-gray-500">{getPermissionCount(item.value)} permissions</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    }}
                  </Field>
                </div>

                {/* Account Status */}
                <div class="flex items-center justify-between mb-4">
                  <Field
                    name="isActive"
                    type="boolean"
                  >
                    {(field, props) => {
                      return (
                        <>
                          <div>
                            <label class="text-sm font-medium text-gray-700">Account Status</label>
                            <p class="text-sm text-gray-600">User can sign in and access the system</p>
                          </div>
                          <label class="relative inline-flex items-center cursor-pointer">
                            <input
                              {...props}
                              checked={field.value}
                              type="checkbox"
                              class="sr-only peer"
                            />
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </>
                      );
                    }}
                  </Field>
                </div>

                {/* Send Invitation */}
                <div class="flex items-center justify-between">
                  <Field
                    name="sendInvitationEmail"
                    type="boolean"
                  >
                    {(field, props) => {
                      return (
                        <>
                          <div>
                            <label class="text-sm font-medium text-gray-700">Send Invitation Email</label>
                            <p class="text-sm text-gray-600">Send setup instructions to the user's email</p>
                          </div>
                          <label class="relative inline-flex items-center cursor-pointer">
                            <input
                              {...props}
                              checked={field.value}
                              type="checkbox"
                              class="sr-only peer"
                            />
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </>
                      );
                    }}
                  </Field>
                </div>
              </div>
            </div>
          </div>
        </Form>

        <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={props.onClose}
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={newUserForm.submitForm}
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  );
}
