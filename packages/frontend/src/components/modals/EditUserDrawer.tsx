import { UiSideDrawer } from "../ui/UiSideDrawer.js";
import { Pen } from "lucide-solid";
import { useQueryClient } from "@tanstack/solid-query";
import { useTenantId } from "../../hooks/useTenantId.js";
import { createFormSpec, FormSubmitHandler } from "../../forms/index.js";
import { UpdateUser } from "@mailtura/rpcmodel/lib/models/request-response.js";
import { useUpdateMutation } from "../../services/adapters/useUpdateMutation.js";
import { UiForm } from "../../forms/UiForm.js";
import { UiButton } from "../ui/UiButton.js";
import { User } from "@mailtura/rpcmodel/lib/models/index.js";
import { userKeys } from "../../services/users/keys.js";
import { useRolesQuery } from "../../services/roles/use-roles-query.js";
import { createMemo } from "solid-js";

interface EditUserDrawerProps {
  user: () => User;
  onClose: () => void;
  isVisible: () => boolean;
}

// FIXME: Adjust form properties to be updated
export function EditUserDrawer(props: EditUserDrawerProps) {
  return (
    <UiSideDrawer
      id={`edit-${props.user().id}`}
      show={props.isVisible}
      onClose={props.onClose}
      title={`Update contact ${props.user().email}`}
      titleIcon={Pen}
    >
      <UserEditForm
        user={props.user}
        onClose={props.onClose}
      />
    </UiSideDrawer>
  );
}

interface UserEditFormProps {
  user: () => User;
  onClose: () => void;
}

function UserEditForm(props: UserEditFormProps) {
  const queryClient = useQueryClient();
  const tenantId = useTenantId();

  const rolesQuery = useRolesQuery({ tenantId });
  const roles = createMemo(() =>
    (rolesQuery.data || []).map(role => {
      return {
        label: role.name,
        value: role.id,
      };
    })
  );

  const updateUserForm = createFormSpec<typeof UpdateUser>(
    UpdateUser,
    {
      firstName: {
        label: "First Name",
        type: "text",
      },
      lastName: {
        label: "Last Name",
        type: "text",
      },
      roleId: {
        label: "Role",
        type: "select",
        options: roles,
      },
    },
    ["firstName", "lastName", "roleId"],
    {
      firstName: props.user().firstName,
      lastName: props.user().lastName,
      roleId: props.user().roleId,
    }
  );

  const updateUser = useUpdateMutation("/api/v1/tenants/{tenant_id}/users/{user_id}/", {
    tenant_id: tenantId,
    user_id: () => props.user().id,
  });

  const handleUpdateUser: FormSubmitHandler<UpdateUser> = async values => {
    if (values.firstName && values.firstName.trim().length === 0) {
      values.firstName = undefined;
    }

    if (values.lastName && values.lastName.trim().length === 0) {
      values.lastName = undefined;
    }

    return new Promise((resolve, reject) => {
      updateUser.mutate(values, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: userKeys.users(tenantId()) });
          props.onClose();
          resolve(undefined);
        },
        onError: error => {
          console.error("Error updating user:", error);
          reject(error);
        },
      });
    });
  };

  return (
    <>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            disabled
            value={props.user().email}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <UiForm
          form={() => updateUserForm}
          onSubmit={handleUpdateUser}
          onCancel={props.onClose}
        />
      </div>

      <div class="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
        <UiButton
          text="Cancel"
          loading={() => updateUser.isPending}
          onClick={props.onClose}
          primary={false}
        />
        <UiButton
          text="Update User"
          loading={() => updateUser.isPending}
          onClick={updateUserForm.submitForm}
        />
      </div>
    </>
  );
}
