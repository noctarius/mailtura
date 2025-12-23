import type { Cursor } from "./pagination.js";

export function sortClause(sort?: Record<string, "asc" | "desc">, cursor?: Cursor): Record<string, "asc" | "desc"> {
  const reverseSort = cursor?.type === "previous" || cursor?.type === "last";
  const orderBy = sort && Object.keys(sort).length > 0 ? sort : ({ id: "asc" } as Record<string, "asc" | "desc">);
  return !reverseSort
    ? orderBy
    : Object.keys(orderBy).reduce(
        (acc, key) => {
          const order = orderBy[key];
          return {
            ...acc,
            [key]: order === "asc" ? "desc" : "asc",
          };
        },
        {} as Record<string, "asc" | "desc">
      );
}
