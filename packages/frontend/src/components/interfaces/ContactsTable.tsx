import { ColumnDef, createColumnHelper } from "@tanstack/solid-table";
import TableCellChip from "./TableCellChip.js";
import { Calendar, Ellipsis, Mail } from "lucide-solid";
import { CreditCard as Edit } from "lucide-solid/icons/index";
import { Contact } from "@mailtura/rpcmodel/lib/models/index.js";
import { getStatusBgColor, getStatusTextColor } from "./ContactsTable.utils.js";
import { VirtualizedTable } from "./VirtualizedTable.js";
import { createMemo } from "solid-js";

interface ContactsTableProps {
  data: () => Contact[];
  target: HTMLDivElement;
}

export function ContactsTable(props: ContactsTableProps) {
  const contactsTableColumns = createMemo<ColumnDef<Contact, any>[]>(() => {
    const columnHelper = createColumnHelper<Contact>();
    return [
      columnHelper.display({
        id: "contact",
        header: () => "Contact",
        cell: info => (
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-blue-600 font-medium">
                {info.row.original.firstName && info.row.original.lastName
                  ? info.row.original.firstName[0].toUpperCase() + info.row.original.lastName[0].toUpperCase()
                  : info.row.original.email[0].toUpperCase()}
              </span>
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
      }),
      columnHelper.accessor("status", {
        id: "status",
        header: () => "Status",
        cell: info => (
          <TableCellChip
            value={info.getValue()}
            bgColor={getStatusBgColor(info.getValue())}
            textColor={getStatusTextColor(info.getValue())}
          />
        ),
      }),
      {
        accessorKey: "subscribed",
        header: "Subscribed",
        cell: info => info.getValue(),
      },
      columnHelper.accessor("lastActivity", {
        id: "lastActivity",
        header: () => "Last Activity",
        cell: info => (
          <div class="flex items-center space-x-2">
            <Calendar class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-900">{info.getValue()}</span>
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: () => "Actions",
        cell: info => (
          <div class="flex items-center space-x-2">
            <button class="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <Mail class="w-4 h-4" />
            </button>
            <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Edit class="w-4 h-4" />
            </button>
            <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Ellipsis class="w-4 h-4" />
            </button>
          </div>
        ),
      }),
    ];
  });

  return (
    <VirtualizedTable
      data={props.data}
      target={props.target}
      columnsDefinitions={contactsTableColumns}
    />
  );
}
