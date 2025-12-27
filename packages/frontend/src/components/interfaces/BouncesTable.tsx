import { ColumnDef } from "@tanstack/solid-table";
import { Bounce } from "@mailtura/rpcmodel/api/index.js";
import { createMemo } from "solid-js";
import { DataTable } from "./DataTable.js";
import TableCellChip from "./TableCellChip.js";
import { Calendar, Mail, Trash2, TriangleAlert } from "lucide-solid";
import { formatDateTime } from "../../helpers/format-date-time.js";
import { getBounceTypeBgColor, getBounceTypeTextColor } from "./BouncesTable.utils.js";

interface BouncesTableProps {
  data: () => Bounce[];
  target: HTMLDivElement;
}

export function BouncesTable(props: BouncesTableProps) {
  const columns = createMemo<ColumnDef<Bounce, any>[]>(() => [
    {
      id: "email",
      header: () => "Email Address",
      cell: info => (
        <>
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
              <Mail class="w-4 h-4 text-gray-600" />
            </div>
            <span class="font-medium text-gray-900 overflow-clip-ellipsis">
              {info.row.original.email ?? info.row.original.contactId}
            </span>
          </div>
        </>
      ),
      minSize: 240,
      enableSorting: false,
    },
    {
      id: "type",
      header: () => "Bounce Type",
      cell: info => (
        <>
          <TableCellChip
            value={`${info.row.original.bounceType} Bounce`}
            bgColor={getBounceTypeBgColor(info.row.original.bounceType)}
            textColor={getBounceTypeTextColor(info.row.original.bounceType)}
            icon={<TriangleAlert class="w-3 h-3" />}
          />
        </>
      ),
      minSize: 140,
    },
    {
      id: "reason",
      header: () => "Reason",
      cell: info => (
        <>
          <span class="text-sm text-gray-900">{info.row.original.reason}</span>
        </>
      ),
      minSize: 320,
    },
    {
      id: "bouncedAt",
      header: () => "Bounced Date",
      cell: info => (
        <>
          <div class="flex items-center space-x-2 p-2">
            <Calendar class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-900">{formatDateTime(info.row.original.bouncedAt)}</span>
          </div>
        </>
      ),
      minSize: 220,
    },
    {
      id: "actions",
      header: () => "Actions",
      cell: () => (
        <>
          <button class="p-2 text-gray-400 hover:text-red-600 transition-colors">
            <Trash2 class="w-4 h-4" />
          </button>
        </>
      ),
      minSize: 120,
      enableSorting: false,
    },
  ]);

  return (
    <DataTable<Bounce>
      data={props.data}
      columnsDefinitions={columns}
      target={props.target}
    />
  );
}
