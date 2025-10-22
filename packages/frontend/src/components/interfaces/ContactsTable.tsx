import { ColumnDef } from "@tanstack/solid-table";
import TableCellChip from "./TableCellChip.js";
import { Calendar, Ellipsis, Trash2, UserMinus } from "lucide-solid";
import { Contact } from "@mailtura/rpcmodel/lib/models/index.js";
import { getStatusBgColor, getStatusTextColor } from "./ContactsTable.utils.js";
import { VirtualizedTable } from "./VirtualizedTable.js";
import { createEffect, createMemo, createSelector, createSignal, onCleanup } from "solid-js";
import ContextMenu, { ContextMenuAction } from "./ContextMenu.js";
import { CreditCard as Edit } from "lucide-solid/icons/index";
import DeleteContactModal from "../modals/DeleteContactModal.js";
import { UiSideDrawer } from "../ui/UiSideDrawer.js";

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
  const [activeContextMenu, setActiveContextMenu] = createSignal<string | undefined>(undefined);
  const [deleteContact, setDeleteContact] = createSignal<Contact | undefined>(undefined);

  const contactsTableColumns = createMemo(() => {
    return [
      {
        id: "contact",
        header: "Contact",
        cell: info => (
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
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
        ),
        minSize: 300,
        enableSorting: true,
        sortingFn: "text",
      },
      {
        id: "status",
        header: () => "Status",
        cell: info => (
          <TableCellChip
            value={info.row.original.status}
            bgColor={getStatusBgColor(info.row.original.status)}
            textColor={getStatusTextColor(info.row.original.status)}
          />
        ),
      },
      {
        header: "Subscribed",
        cell: info => info.getValue(),
      },
      {
        accessorKey: "lastActivity",
        header: () => "Last Activity",
        cell: info => (
          <div class="flex items-center space-x-2">
            <Calendar class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-900">{info.getValue()}</span>
          </div>
        ),
      },
      {
        id: "actions",
        header: () => "Actions",
        cell: info => (
          <ContactsActions
            item={info.row.original}
            onClick={handleContextMenu}
            activeContextMenu={activeContextMenu}
            setActiveContextMenu={setActiveContextMenu}
            onContextMenuAction={handleContextMenuAction}
          />
        ),
      },
    ] as ColumnDef<Contact, any>[];
  });

  const handleContextMenuAction = (item: Contact, action: string) => {
    setActiveContextMenu(undefined);
    console.log("Action:", action, "Item:", item);
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
      <VirtualizedTable
        data={props.data}
        target={props.target}
        columnsDefinitions={contactsTableColumns}
      />
      {deleteContact() && (
        <DeleteContactModal
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
        <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Edit
            onClick={setEditOpen}
            class="w-4 h-4"
          />
        </button>
        <button
          onClick={e => props.onClick(e, props.item)}
          class="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
          aria-controls="drawer-example"
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
      {editOpen() && (
        <UiSideDrawer
          id={`edit-${props.item.id}`}
          opened={editOpen}
          onClose={() => setEditOpen(false)}
          title="Test Sheet"
        >
          <p class="mb-6 text-sm text-gray-500">
            Supercharge your hiring by taking advantage of our{" "}
            <a
              href="#"
              class="text-blue-600 underline hover:no-underline"
            >
              limited-time sale
            </a>{" "}
            for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design job
            board.
          </p>
          <div class="grid grid-cols-2 gap-4">
            <a
              href="#"
              class="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Learn more
            </a>
            <a
              href="#"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
            >
              Get access{" "}
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </UiSideDrawer>
      )}
    </>
  );
}
