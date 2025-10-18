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
import { createSignal, For, onMount } from "solid-js";

interface VirtualizedTableProps<Data> {
  data: () => Data[];
  columnsDefinitions: ColumnDef<Data, any>[];
  targetElement: HTMLDivElement;
}

export function VirtualizedTable<Data>(props: VirtualizedTableProps<Data>) {
  const table = createSolidTable<Data>({
    get data() {
      return props.data();
    },
    columns: props.columnsDefinitions,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
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
              id={`header-group-${headerGroup.id}`}
              style={{ display: "flex", width: "100%" }}
            >
              <For each={headerGroup.headers}>
                {header => (
                  <th
                    id={`header-${header.id}`}
                    class="text-left py-4 px-6 font-semibold text-gray-900 whitespace-nowrap"
                    style={{
                      display: "flex",
                      width: `${header.getSize()}%`,
                    }}
                  >
                    <div
                      {...{
                        class: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                )}
              </For>
            </tr>
          )}
        </For>
      </thead>
      <TableBody
        table={table}
        targetElement={props.targetElement}
      />
    </table>
  );
}

interface TableBodyProps<Data> {
  table: Table<Data>;
  targetElement: HTMLDivElement;
}

function TableBody<Data>({ table, targetElement }: TableBodyProps<Data>) {
  const { rows } = table.getRowModel();

  const [virtualizer, setVirtualizer] = createSignal<Virtualizer<HTMLDivElement, HTMLTableRowElement>>();

  onMount(() => {
    if (!targetElement) return;

    const v = createVirtualizer<HTMLDivElement, HTMLTableRowElement>({
      count: table.getRowModel().rows.length,
      estimateSize: () => 100,
      getScrollElement: () => targetElement,
      measureElement:
        typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
          ? el => el?.getBoundingClientRect().height
          : undefined,
      overscan: 5,
    });

    setVirtualizer(v);
  });

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
          const row = rows[virtualRow.index] as Row<Data>;
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
      id={`row-${row.id}`}
      data-index={virtualRow.index} //needed for dynamic row height measurement
      ref={node => virtualizer.measureElement(node)} //measure dynamic row height
      style={{
        display: "flex",
        position: "absolute",
        transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
        width: "100%",
      }}
    >
      <For each={row.getVisibleCells()}>
        {cell => (
          <td
            id={cell.id}
            class="py-4 px-6"
            style={{
              display: "flex",
              width: `${cell.column.getSize()}%`,
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        )}
      </For>
    </tr>
  );
}
