import {
  ColumnDef,
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  Table,
} from "@tanstack/solid-table";
import { createEffect, createSignal, Index, onMount } from "solid-js";
import { calculateColumnWidths } from "./DataTable.utils.js";
import { makeResizeObserver } from "@solid-primitives/resize-observer";
import { Dynamic } from "solid-js/web";
import { Key } from "@solid-primitives/keyed";

interface DataTableProps<Data extends { id: string }> {
  data: () => Data[];
  columnsDefinitions: () => ColumnDef<Data, any>[];
  target: HTMLDivElement;
}

export function DataTable<Data extends { id: string }>(props: DataTableProps<Data>) {
  const [data, setData] = createSignal<Data[]>([]);

  createEffect(() => {
    setData(props.data());
  });

  const table = createSolidTable<Data>({
    get data() {
      return data();
    },
    get columns() {
      return props.columnsDefinitions();
    },
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
    enableColumnResizing: true,
    getRowId: row => row.id,
  });

  const observer = makeResizeObserver(entries => {
    const containerWidth = entries[0].contentRect.width;
    updateColumnSizingCallback(containerWidth);
  });

  const updateColumnSizingCallback = (containerWidth: number) => {
    if (containerWidth <= 0) return;

    const columns = table.getAllColumns();
    if (columns.length === 0) return;

    table.setColumnSizing(() => calculateColumnWidths<Data>(containerWidth, columns));
  };

  onMount(() => {
    observer.observe(props.target);
  });

  return (
    <table style={{ display: "grid" }}>
      <thead
        class="bg-gray-50 border-b border-gray-200"
        style={{
          "display": "grid",
          "position": "sticky",
          "top": 0,
          "z-index": 1,
        }}
      >
        <Index each={table.getHeaderGroups()}>
          {headerGroup => (
            <tr
              id={headerGroup().id}
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              <Index each={headerGroup().headers}>
                {header => (
                  <th
                    id={header().id}
                    class="text-left py-4 px-6 font-semibold text-gray-900 whitespace-nowrap"
                    style={{
                      display: "flex",
                      width: `${header().getSize()}px`,
                    }}
                  >
                    <div
                      class={`content-evenly ${header().column.getCanSort() ? "cursor-pointer select-none" : ""}`}
                      onClick={() => header().column.getToggleSortingHandler()}
                    >
                      <span>
                        {header().isPlaceholder
                          ? null
                          : flexRender(header().column.columnDef.header, header().getContext())}
                      </span>
                      <span class="text-end">
                        {{
                          asc: "🔼",
                          desc: "🔽",
                        }[header().column.getIsSorted() as string] ?? null}
                      </span>
                    </div>
                  </th>
                )}
              </Index>
            </tr>
          )}
        </Index>
      </thead>
      <TableBody
        data={data}
        table={table}
        target={props.target}
      />
    </table>
  );
}

interface TableBodyProps<Data> {
  table: Table<Data>;
  data: () => Data[];
  target: HTMLDivElement;
}

function TableBody<Data extends { id: string }>(props: TableBodyProps<Data>) {
  return (
    <tbody
      class="divide-y divide-gray-200"
      style={{
        display: "grid",
        height: "100%",
        position: "relative",
      }}
    >
      <Key
        each={props.table.getRowModel().rows}
        by={item => item.original.id}
      >
        {row => {
          return <TableRow row={row} />;
        }}
      </Key>
    </tbody>
  );
}

interface TableRowProps<Data extends { id: string }> {
  row: () => Row<Data>;
}

function TableRow<Data extends { id: string }>(props: TableRowProps<Data>) {
  return (
    <tr
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <Index each={props.row().getVisibleCells()}>
        {cell => {
          return (
            <td
              id={cell().id}
              class="py-4 px-6"
              style={{
                width: `${cell().column.getSize()}px`,
              }}
            >
              <Dynamic
                component={cell().column.columnDef.cell}
                {...cell().getContext()}
              />
            </td>
          );
        }}
      </Index>
    </tr>
  );
}
