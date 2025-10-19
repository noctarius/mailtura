import {
  ColumnDef,
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  Table,
} from "@tanstack/solid-table";
import { createVirtualizer, VirtualItem, Virtualizer } from "@tanstack/solid-virtual";
import { createEffect, createSignal, For, onCleanup, onMount } from "solid-js";
import { calculateColumnWidths } from "./VirtualizedTable.utils.js";

interface VirtualizedTableProps<Data> {
  data: () => Data[];
  columnsDefinitions: () => ColumnDef<Data, any>[];
  target: HTMLDivElement;
}

export function VirtualizedTable<Data>(props: VirtualizedTableProps<Data>) {
  const table = createSolidTable<Data>({
    get data() {
      return props.data();
    },
    columns: props.columnsDefinitions(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  const observer = new ResizeObserver(entries => {
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
    onCleanup(() => observer.disconnect());
  });

  createEffect(() => {
    table.setOptions(prev => ({
      ...prev,
      data: [...props.data()],
    }));
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
        <For each={table.getHeaderGroups()}>
          {headerGroup => (
            <tr
              id={headerGroup.id}
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              <For each={headerGroup.headers}>
                {header => (
                  <th
                    id={header.id}
                    class="text-left py-4 px-6 font-semibold text-gray-900 whitespace-nowrap"
                    style={{
                      display: "flex",
                      width: `${header.getSize()}px`,
                    }}
                  >
                    <div
                      class={`content-evenly ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}`}
                      onClick={() => header.column.getToggleSortingHandler()}
                    >
                      <span>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </span>
                      <span class="text-end">
                        {{
                          asc: "🔼",
                          desc: "🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </span>
                    </div>
                  </th>
                )}
              </For>
            </tr>
          )}
        </For>
      </thead>
      <TableBody
        data={props.data}
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

function TableBody<Data>(props: TableBodyProps<Data>) {
  const [virtualizer, setVirtualizer] = createSignal<Virtualizer<HTMLDivElement, HTMLTableRowElement>>();
  const [rows, setRows] = createSignal<Row<Data>[]>(props.table.getRowModel().rows);

  createEffect(() => {
    if (!props.target) return;

    const newVirtualizer = createVirtualizer<HTMLDivElement, HTMLTableRowElement>({
      count: props.data().length,
      estimateSize: () => 100,
      getScrollElement: () => props.target,
      measureElement:
        typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
          ? el => el?.getBoundingClientRect().height
          : undefined,
      overscan: 5,
    });

    setVirtualizer(newVirtualizer);
    setRows(props.table.getRowModel().rows);
  }, props.data);

  return (
    <tbody
      class="divide-y divide-gray-200"
      style={{
        display: "grid",
        height: `${virtualizer()?.getTotalSize() ?? 0}px`,
        position: "relative",
      }}
    >
      <For each={virtualizer()?.getVirtualItems()}>
        {virtualRow => {
          const row = rows()[virtualRow.index] as Row<Data>;
          return (
            <TableRow
              row={row}
              virtualRow={virtualRow}
              virtualizer={virtualizer()!}
            />
          );
        }}
      </For>
    </tbody>
  );
}

interface TableRowProps<Data> {
  row: Row<Data>;
  virtualRow: VirtualItem;
  virtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
}

function TableRow<Data>({ row, virtualRow, virtualizer }: TableRowProps<Data>) {
  return (
    <tr
      id={row.id}
      ref={node => {
        node.dataset.index = `${row.index}`;
        virtualizer.measureElement(node);
      }}
      style={{
        display: "flex",
        position: "absolute",
        transform: `translateY(${virtualRow.start}px)`,
        width: "100%",
      }}
    >
      <For each={row.getVisibleCells()}>
        {cell => {
          return (
            <td
              id={cell.id}
              class="py-4 px-6"
              style={{
                width: `${cell.column.getSize()}px`,
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        }}
      </For>
    </tr>
  );
}
