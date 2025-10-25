import { ColumnDef } from "@tanstack/solid-table";
import TableCellChip from "./TableCellChip.js";
import { Calendar, Ellipsis, Pen, Trash2, UserMinus } from "lucide-solid";
import { Contact } from "@mailtura/rpcmodel/lib/models/index.js";
import { getStatusBgColor, getStatusTextColor } from "./ContactsTable.utils.js";
import { VirtualizedTable } from "./VirtualizedTable.js";
import { createEffect, createMemo, createSelector, createSignal, onCleanup } from "solid-js";
import ContextMenu, { ContextMenuAction } from "./ContextMenu.js";
import { CreditCard as Edit } from "lucide-solid/icons/index";
import DeleteContactModal from "../modals/DeleteContactModal.js";
import { UiSideDrawer } from "../ui/UiSideDrawer.js";
import { UpdateContact } from "@mailtura/rpcmodel/lib/models/request-response.js";
import { useUpdateMutation } from "../../services/adapters/useUpdateMutation.js";
import { useQueryClient } from "@tanstack/solid-query";
import { useTenantId } from "../../hooks/useTenantId.js";
import { subscriberListKeys } from "../../services/subscriber-lists/keys.js";
import { UiButton } from "../ui/UiButton.js";
import { useSubscriberListsQuery } from "../../services/subscriber-lists/use-subscriber-lists-query.js";
import { createFormSpec, FormSubmitHandler } from "../../forms/index.js";
import { UiForm } from "../../forms/UiForm.js";

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
          <div class="p-2">
            <TableCellChip
              value={info.row.original.status}
              bgColor={getStatusBgColor(info.row.original.status)}
              textColor={getStatusTextColor(info.row.original.status)}
            />
          </div>
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
          <div class="flex items-center space-x-2 p-2">
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
        <button
          onClick={() => setEditOpen(true)}
          class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Edit class="w-4 h-4" />
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
      <UiSideDrawer
        id={`edit-${props.item.id}`}
        show={editOpen}
        onClose={() => setEditOpen(false)}
        title={`Update contact ${props.item.email}`}
        titleIcon={Pen}
      >
        <ContactEditForm
          contact={() => props.item}
          onClose={() => setEditOpen(false)}
        />
      </UiSideDrawer>
    </>
  );
}

interface ContactEditFormProps {
  contact: () => Contact;
  onClose: () => void;
}

function ContactEditForm(props: ContactEditFormProps) {
  const queryClient = useQueryClient();
  const tenantId = useTenantId();

  const subscriberListsQuery = useSubscriberListsQuery({ tenantId });
  const subscriberLists = () => (subscriberListsQuery.data || []).toSort((a, b) => a.name.localeCompare(b.name));

  const subscriberListOptions = createMemo(() =>
    subscriberLists().map(list => {
      return {
        label: list.name,
        value: list.id,
        description: list.description,
      };
    })
  );

  const updateContactForm = createFormSpec<typeof UpdateContact>(
    UpdateContact,
    {
      firstName: {
        label: "First Name",
        type: "text",
      },
      lastName: {
        label: "Last Name",
        type: "text",
      },
      listIds: {
        label: "Subscription",
        type: "checkbox",
        options: subscriberListOptions,
      },
    },
    ["firstName", "lastName", "listIds"],
    {
      firstName: props.contact().firstName,
      lastName: props.contact().lastName,
      listIds: props.contact().listIds,
    }
  );

  const updateContact = useUpdateMutation("/api/v1/tenants/{tenant_id}/contacts/{contact_id}/", {
    tenant_id: tenantId,
    contact_id: () => props.contact().id,
  });

  const handleUpdateContact: FormSubmitHandler<UpdateContact> = async values => {
    if (values.firstName && values.firstName.trim().length === 0) {
      values.firstName = undefined;
    }

    if (values.lastName && values.lastName.trim().length === 0) {
      values.lastName = undefined;
    }

    return new Promise((resolve, reject) => {
      updateContact.mutate(values, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["contacts", tenantId()] });
          await queryClient.invalidateQueries({ queryKey: subscriberListKeys.lists(tenantId()) });
          for (const listId of values.listIds || []) {
            await queryClient.invalidateQueries({ queryKey: subscriberListKeys.subscribers(tenantId(), listId) });
          }
          props.onClose();
          resolve(undefined);
        },
        onError: error => {
          console.error("Error updating contact:", error);
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
            value={props.contact().email}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <UiForm
          form={() => updateContactForm}
          onSubmit={handleUpdateContact}
          onCancel={props.onClose}
        />
      </div>

      <div class="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
        <UiButton
          text="Cancel"
          loading={() => updateContact.isPending}
          onClick={props.onClose}
          primary={false}
        />
        <UiButton
          text="Update Contact"
          loading={() => updateContact.isPending}
          onClick={updateContactForm.submitForm}
        />
      </div>
    </>
  );
}
