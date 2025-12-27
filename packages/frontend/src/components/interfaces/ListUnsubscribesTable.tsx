import { ColumnDef } from "@tanstack/solid-table";
import { Unsubscribe } from "@mailtura/rpcmodel/api/index.js";
import { createMemo } from "solid-js";
import { DataTable } from "./DataTable.js";
import TableCellChip from "./TableCellChip.js";
import { List as ListIcon, Mail, Trash2 } from "lucide-solid";
import { getUnsubscribeSourceIcon } from "../../helpers/chip-icons.js";
import { sourceBgColor, sourceDisplay, sourceTextColor } from "./UnsubscribeTable.utils.js";

interface ListUnsubscribesTableProps {
  data: () => Unsubscribe[];
  listName: (id: string) => string;
  target: HTMLDivElement;
}

export function ListUnsubscribesTable(props: ListUnsubscribesTableProps) {
  const columns = createMemo<ColumnDef<Unsubscribe, any>[]>(() => [
    {
      id: "email",
      header: () => "Email Address",
      cell: info => (
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 rounded-full flex items-center justify-center bg-orange-100">
            <Mail class="w-4 h-4 text-orange-600" />
          </div>
          <span class="font-medium text-gray-900 overflow-clip-ellipsis">
            {info.row.original.email ?? info.row.original.contactId}
          </span>
        </div>
      ),
      minSize: 240,
      enableSorting: false,
    },
    {
      id: "lists",
      header: () => "List",
      cell: info => (
        <div class="space-y-1">
          {info.row.original.listIds.map(listId => (
            <div class="flex items-center space-x-2">
              <ListIcon class="w-3 h-3 text-gray-400" />
              <span class="text-sm text-gray-900">{props.listName(listId)}</span>
            </div>
          ))}
        </div>
      ),
      minSize: 260,
    },
    {
      id: "source",
      header: () => "Source",
      cell: info => (
        <TableCellChip
          value={sourceDisplay(info.row.original.source)}
          bgColor={sourceBgColor(info.row.original.source)}
          textColor={sourceTextColor(info.row.original.source)}
          icon={getUnsubscribeSourceIcon(sourceDisplay(info.row.original.source))}
        />
      ),
      minSize: 180,
    },
    {
      id: "actions",
      header: () => "Actions",
      cell: () => (
        <button class="p-2 text-gray-400 hover:text-red-600 transition-colors">
          <Trash2 class="w-4 h-4" />
        </button>
      ),
      minSize: 120,
      enableSorting: false,
    },
  ]);

  return (
    <DataTable<Unsubscribe>
      data={props.data}
      columnsDefinitions={columns}
      target={props.target}
    />
  );
}
