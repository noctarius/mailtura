import { Column } from "@tanstack/solid-table";

export function calculateColumnWidths<
  Data,
  Value = unknown,
  ColumSpec extends Column<Data, Value> = Column<Data, Value>,
>(containerWidth: number, columns: ColumSpec[]): Record<string, number> {
  const result: Record<string, number> = {};

  // Step 1: calculate base sizes for percent columns
  let usedWidth = 0;
  const flexibleColumns: ColumSpec[] = [];

  for (const column of columns) {
    if (column.columnDef.meta?.widthPercent !== undefined) {
      const ideal = (column.columnDef.meta.widthPercent / 100) * containerWidth;
      const clamped = Math.min(column.columnDef.maxSize ?? Infinity, Math.max(column.columnDef.minSize ?? 0, ideal));
      result[column.id] = clamped;
      usedWidth += clamped;
    } else {
      flexibleColumns.push(column);
    }
  }

  // Step 2: determine remaining width for flexible columns
  let remaining = containerWidth - usedWidth;
  if (remaining < 0) remaining = 0; // prevent overflow

  // Step 3: distribute remaining width evenly to flexible columns
  let remainingCols = flexibleColumns.length;

  if (remainingCols > 0) {
    // initial even share
    let evenShare = remaining / remainingCols;

    // Track columns that are already capped
    const capped: Set<string> = new Set();

    let changed = true;
    while (changed && remainingCols > 0) {
      changed = false;
      for (const column of flexibleColumns) {
        if (capped.has(column.id)) continue;
        const width = evenShare;
        if (column.columnDef.minSize && width < column.columnDef.minSize) {
          result[column.id] = column.columnDef.minSize;
          capped.add(column.id);
          changed = true;
        } else if (column.columnDef.maxSize && width > column.columnDef.maxSize) {
          result[column.id] = column.columnDef.maxSize;
          capped.add(column.id);
          changed = true;
        } else {
          result[column.id] = width;
        }
      }

      // Recompute remaining width and even share
      const cappedWidth = Array.from(capped).reduce((sum, id) => sum + result[id], 0);
      const uncappedCols = flexibleColumns.filter(c => !capped.has(c.id));
      remaining = containerWidth - usedWidth - cappedWidth;
      remainingCols = uncappedCols.length;
      evenShare = remainingCols > 0 ? remaining / remainingCols : 0;
    }
  }

  // Step 4: final normalization (due to rounding errors)
  const total = Object.values(result).reduce((a, b) => a + b, 0);
  const diff = containerWidth - total;

  if (Math.abs(diff) > 0.5 && columns.length > 0) {
    // Adjust last column to ensure perfect total width
    const last = columns[columns.length - 1].id;
    result[last] = (result[last] ?? 0) + diff;
  }
  return result;
}
