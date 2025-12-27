import { ColumnDef } from "@tanstack/solid-table";
import TableCellChip from "./TableCellChip.js";
import { Calendar, Ellipsis, Trash2, UserMinus } from "lucide-solid";
import { Contact } from "@mailtura/rpcmodel/api/index.js";
import { getStatusBgColor, getStatusTextColor } from "./ContactsTable.utils.js";
import { DataTable } from "./DataTable.js";
import { createEffect, createMemo, createSelector, createSignal, onCleanup } from "solid-js";
import ContextMenu, { ContextMenuAction } from "./ContextMenu.js";
import { CreditCard as Edit } from "lucide-solid/icons/index";
import DeleteContactDialog from "../modals/DeleteContactDialog.js";
import { formatDateTime } from "../../helpers/format-date-time.js";
import { EditContactDrawer } from "../modals/EditContactDrawer.js";
import { useAuth } from "../../hooks/useAuth.js";

const contextMenuActions: ContextMenuAction[] = [
  {
    action: "delete",
    icon: Trash2,
    label: "Delete Contact",
  },
  {
    action: "unsubscribe",
    icon: UserMinus,
    label: "Unsubscribe Contact",
  },
];

interface ContactsTableProps {
  data: () => Contact[];
  target: HTMLDivElement;
}

export function ContactsTable(props: ContactsTableProps) {
  const auth = useAuth();
  const canManageContacts = () => auth.hasPermission("manage::contacts");

  const [activeContextMenu, setActiveContextMenu] = createSignal<string | undefined>(undefined);
  const [deleteContact, setDeleteContact] = createSignal<Contact | undefined>(undefined);

  const contactsTableColumns = createMemo<ColumnDef<Contact, any>[]>(() => {
    return [
      {
        id: "contact",
        header: () => "Contact",
        cell: info => (
          <>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 min-h-10 min-w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <p class="text-blue-600 font-medium overflow-clip-ellipsis">
                  {info.row.original.firstName && info.row.original.lastName
                    ? info.row.original.firstName[0].toUpperCase() + info.row.original.lastName[0].toUpperCase()
                    : info.row.original.email[0].toUpperCase()}
                </p>
              </div>
              <div>
                <div class="font-medium text-gray-900">
                  {info.row.original.firstName} {info.row.original.lastName}
                </div>
                <div class="text-sm text-gray-500">{info.row.original.email}</div>
              </div>
            </div>
          </>
        ),
        minSize: 300,
        enableSorting: true,
        sortingFn: "text",
      },
      {
        id: "status",
        header: () => "Status",
        cell: info => (
          <>
            <div class="pt-2 pm-2">
              <TableCellChip
                value={info.row.original.status}
                bgColor={getStatusBgColor(info.row.original.status)}
                textColor={getStatusTextColor(info.row.original.status)}
              />
            </div>
          </>
        ),
      },
      {
        id: "lastUpdate",
        header: () => "Last Update",
        cell: info => (
          <>
            <div class="flex items-center space-x-2 p-2">
              <Calendar class="w-4 h-4 text-gray-400" />
              <span class="text-sm text-gray-900">
                {formatDateTime(info.row.original.updatedAt ?? info.row.original.createdAt)}
              </span>
            </div>
          </>
        ),
      },
      {
        id: "actions",
        header: () => "Actions",
        cell: info =>
          canManageContacts() && (
            <>
              <ContactsActions
                item={info.row.original}
                onClick={handleContextMenu}
                activeContextMenu={activeContextMenu}
                setActiveContextMenu={setActiveContextMenu}
                onContextMenuAction={handleContextMenuAction}
              />
            </>
          ),
      },
    ];
  });

  const handleContextMenuAction = (item: Contact, action: string) => {
    setActiveContextMenu(undefined);
    if (action === "delete") {
      setDeleteContact(item);
    }
  };

  const handleContextMenu = (e: MouseEvent, row: Contact) => {
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
      <DataTable
        data={props.data}
        target={props.target}
        columnsDefinitions={contactsTableColumns}
      />
      {deleteContact() && (
        <DeleteContactDialog
          contact={deleteContact}
          onClose={() => setDeleteContact(undefined)}
        />
      )}
    </>
  );
}

interface ContactsActionsProps {
  item: Contact;
  onClick: (e: MouseEvent, item: Contact) => void;
  activeContextMenu: () => string | undefined;
  setActiveContextMenu(value: string | undefined): void;
  onContextMenuAction: (item: Contact, action: string) => void;
}

function ContactsActions(props: ContactsActionsProps) {
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
          aria-controls="user-actions"
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
            actions={() => contextMenuActions}
            onAction={props.onContextMenuAction}
          />
        ) : null}
      </div>
      <EditContactDrawer
        contact={() => props.item}
        onClose={() => setEditOpen(false)}
        isVisible={editOpen}
      />
    </>
  );
}
