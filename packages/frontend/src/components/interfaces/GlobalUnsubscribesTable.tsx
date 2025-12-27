import { ColumnDef } from "@tanstack/solid-table";
import { Unsubscribe } from "@mailtura/rpcmodel/api/index.js";
import { createMemo } from "solid-js";
import { DataTable } from "./DataTable.js";
import TableCellChip from "./TableCellChip.js";
import { Calendar, Mail, Trash2 } from "lucide-solid";
import { formatDateTime } from "../../helpers/format-date-time.js";
import { getUnsubscribeSourceIcon } from "../../helpers/chip-icons.js";

interface GlobalUnsubscribesTableProps {
  data: () => Unsubscribe[];
  target: HTMLDivElement;
}

const sourceDisplay = (source: string) => {
  switch (source) {
    case "UnsubscribeLink":
      return "Unsubscribe Link";
    case "ManualAddition":
      return "Manual Addition";
    case "Api":
      return "API Request";
    case "Bounce":
      return "Bounce";
    default:
      return "Other";
  }
};

const sourceBgColor = (source: string) => {
  switch (source) {
    case "UnsubscribeLink":
      return "bg-blue-100";
    case "ManualAddition":
      return "bg-gray-100";
    case "Api":
      return "bg-indigo-100";
    case "Bounce":
      return "bg-red-100";
    default:
      return "bg-gray-100";
  }
};

const sourceTextColor = (source: string) => {
  switch (source) {
    case "UnsubscribeLink":
      return "text-blue-800";
    case "ManualAddition":
      return "text-gray-800";
    case "Api":
      return "text-indigo-800";
    case "Bounce":
      return "text-red-800";
    default:
      return "text-gray-800";
  }
};

export function GlobalUnsubscribesTable(props: GlobalUnsubscribesTableProps) {
  const columns = createMemo<ColumnDef<Unsubscribe, any>[]>(() => [
    {
      id: "email",
      header: () => "Email Address",
      cell: info => (
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
            <Mail class="w-4 h-4 text-gray-600" />
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
      id: "unsubscribedAt",
      header: () => "Unsubscribed Date",
      cell: info => (
        <div class="flex items-center space-x-2 p-2">
          <Calendar class="w-4 h-4 text-gray-400" />
          <span class="text-sm text-gray-900">{formatDateTime(info.row.original.unsubscribedAt)}</span>
        </div>
      ),
      minSize: 220,
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
