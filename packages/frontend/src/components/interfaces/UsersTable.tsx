import { User } from "@mailtura/rpcmodel/lib/models/index.js";
import ContextMenu, { ContextMenuAction } from "./ContextMenu.js";
import { useAuth } from "../../hooks/useAuth.js";
import { createEffect, createMemo, createSelector, createSignal, onCleanup } from "solid-js";
import { VirtualizedTable } from "./VirtualizedTable.js";
import { CreditCard as Edit } from "lucide-solid/icons/index";
import { Building2, Calendar, Ellipsis, Mail, Mailbox, RefreshCcwIcon, Shield, ShieldBan, Trash2 } from "lucide-solid";
import DeleteUserDialog from "../modals/DeleteUserDialog.js";
import { ColumnDef } from "@tanstack/solid-table";
import { formatDateTime } from "../../helpers/format-date-time.js";
import TableCellChip from "./TableCellChip.js";
import { getRoleBgColor, getRoleTextColor, getStatusBgColor, getStatusTextColor } from "./UsersTable.utils.js";
import { useTenantsQuery } from "../../services/tenants/use-tenants-query.js";
import { getTimeSince } from "../../helpers/time-since.js";
import { EditUserDrawer } from "../modals/EditUserDrawer.js";
import { useRolesQuery } from "../../services/roles/use-roles-query.js";

interface UsersTableProps {
  tenantId: () => string;
  data: () => User[];
  target: HTMLDivElement;
}

export function UsersTable(props: UsersTableProps) {
  const auth = useAuth();
  const canManageUsers = () => auth.hasPermission("manage::users");

  const tenantsQuery = useTenantsQuery();
  const rolesQuery = useRolesQuery({ tenantId: props.tenantId });

  const [activeContextMenu, setActiveContextMenu] = createSignal<string | undefined>(undefined);
  const [deleteUser, setDeleteUser] = createSignal<User | undefined>(undefined);

  const getTenantName = (tenantId: string) => {
    return tenantsQuery.data?.find(tenant => tenant.id === tenantId)?.name ?? "Unknown";
  };

  const usersTableColumns = createMemo<ColumnDef<User, any>[]>(() => {
    return [
      {
        id: "user",
        header: () => "User",
        cell: info => (
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 min-h-10 min-w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-blue-600 font-medium">
                {info.row.original.firstName?.charAt(0)}
                {info.row.original.lastName?.charAt(0)}
              </span>
            </div>
            <div>
              <div class="font-medium text-gray-900">
                {info.row.original.firstName} {info.row.original.lastName}
              </div>
              <div class="text-sm text-gray-500 flex items-center space-x-1">
                <Mail class="w-3 h-3" />
                <span>{info.row.original.email}</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "role",
        header: () => "Role",
        cell: info => {
          const role = (rolesQuery.data || []).find(role => role.id === info.row.original.roleId);
          return (
            <TableCellChip
              icon={<Shield class="w-3 h-3" />}
              value={role?.name.replace("_", " ") ?? ""}
              textColor={getRoleTextColor(role?.name ?? "")}
              bgColor={getRoleBgColor(role?.name ?? "")}
            />
          );
        },
      },
      {
        id: "tenant",
        header: () => "Tenant",
        cell: info => (
          <div class="flex items-center space-x-2">
            <Building2 class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-900 capitalize">{getTenantName(info.row.original.tenantId)}</span>
          </div>
        ),
      },
      {
        id: "status",
        header: () => "Status",
        cell: info => (
          <TableCellChip
            value={info.row.original.active ? "Active" : "Inactive"}
            textColor={getStatusTextColor(info.row.original.active)}
            bgColor={getStatusBgColor(info.row.original.active)}
          />
        ),
      },
      {
        id: "lastLogin",
        header: () => "Last Login",
        cell: info => (
          <span class="text-sm text-gray-900">
            {info.row.original.lastLoginAt ? getTimeSince(info.row.original.lastLoginAt) : "Never"}
          </span>
        ),
      },
      {
        id: "lastUpdate",
        header: () => "Last Update",
        cell: info => (
          <div class="flex items-center space-x-2 p-2">
            <Calendar class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-900">
              {formatDateTime(info.row.original.updatedAt ?? info.row.original.createdAt)}
            </span>
          </div>
        ),
      },
      {
        id: "actions",
        header: () => "Actions",
        cell: info =>
          canManageUsers() && (
            <UsersActions
              item={info.row.original}
              onClick={handleContextMenu}
              activeContextMenu={activeContextMenu}
              setActiveContextMenu={setActiveContextMenu}
              onContextMenuAction={handleContextMenuAction}
            />
          ),
      },
    ];
  });

  const handleContextMenuAction = (item: User, action: string) => {
    setActiveContextMenu(undefined);
    if (action === "delete") {
      setDeleteUser(item);
    }
  };

  const handleContextMenu = (e: MouseEvent, row: User) => {
    e.stopPropagation();
    setActiveContextMenu(row.id === activeContextMenu() ? undefined : row.id);
  };

  createEffect(() => {
    const handleClickOutside = () => {
      setActiveContextMenu(undefined);
    };

    if (activeContextMenu() !== undefined) {
      document.addEventListener("click", handleClickOutside);
      onCleanup(() => document.removeEventListener("click", handleClickOutside));
    }
  });

  return (
    <>
      <VirtualizedTable
        data={props.data}
        columnsDefinitions={usersTableColumns}
        target={props.target}
      />
      {deleteUser() && (
        <DeleteUserDialog
          user={deleteUser}
          onClose={() => setDeleteUser(undefined)}
        />
      )}
    </>
  );
}

interface UsersActionsProps {
  item: User;
  onClick: (e: MouseEvent, item: User) => void;
  activeContextMenu: () => string | undefined;
  setActiveContextMenu(value: string | undefined): void;
  onContextMenuAction: (item: User, action: string) => void;
}

function UsersActions(props: UsersActionsProps) {
  const [ellipsisRef, setEllipsisRef] = createSignal<HTMLButtonElement | undefined>(undefined);
  const [editOpen, setEditOpen] = createSignal(false);
  const isActive = createSelector(props.activeContextMenu);

  return (
    <>
      <div class="flex items-center space-x-2 relative">
        <button
          onClick={() => setEditOpen(true)}
          class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Edit class="w-4 h-4" />
        </button>
        <button
          onClick={e => props.onClick(e, props.item)}
          class="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
          aria-controls="contact-actions"
        >
          <Ellipsis
            ref={setEllipsisRef}
            class="w-4 h-4"
          />
        </button>
        {isActive(props.item.id) ? (
          <ContextMenu
            header={item => <p class="overflow-clip-ellipsis">Email: {item.email}</p>}
            onClose={() => {
              if (props.activeContextMenu() === props.item.id) {
                props.setActiveContextMenu(undefined);
              }
            }}
            target={ellipsisRef}
            item={props.item}
            actions={() => createContextMenu(props.item)}
            onAction={props.onContextMenuAction}
          />
        ) : null}
      </div>
      <EditUserDrawer
        user={() => props.item}
        onClose={() => setEditOpen(false)}
        isVisible={editOpen}
      />
    </>
  );
}

const createContextMenu = (user: User): ContextMenuAction[] => {
  const contextMenuActions: ContextMenuAction[] = [
    {
      action: "delete",
      icon: Trash2,
      label: "Delete Contact",
    },
    {
      action: "reset-password",
      icon: RefreshCcwIcon,
      label: "Reset Password",
    },
  ];

  if (user.active) {
    contextMenuActions.push({
      action: "lock",
      icon: ShieldBan,
      label: "Lock User",
    });
  } else {
    contextMenuActions.push({
      action: "unlock",
      icon: Shield,
      label: "Unlock User",
    });
  }

  if (user.emailVerified) {
    contextMenuActions.push(
      {
        action: "verify-email",
        icon: Mail,
        label: "Verify Email",
      },
      {
        action: "resend-verification-email",
        icon: Mailbox,
        label: "Resend Verification Email",
      }
    );
  }

  return contextMenuActions;
};
