import '@tanstack/solid-table'

export{}
declare global {
  interface Array<T> {
    toSort(sorter: (a: T, b: T) => number): Array<T>;
  }
}

declare module '@tanstack/solid-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    widthPercent: number
  }
}
