export{}
declare global {
  interface Array<T> {
    toSort(sorter: (a: T, b: T) => number): Array<T>;
  }
}
