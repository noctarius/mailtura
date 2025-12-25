import type { Cursor } from "./pagination.js";

export function sortClause(sort?: Record<string, "asc" | "desc">, cursor?: Cursor): Record<string, "asc" | "desc"> {
  const reverseSort = cursor?.type === "previous" || cursor?.type === "last";

  // Ensure deterministic ordering by always adding id as a tie-breaker if not explicitly provided
  const baseSort = (sort && Object.keys(sort).length > 0 ? sort : {}) as Record<string, "asc" | "desc">;
  const orderBy: Record<string, "asc" | "desc"> = {
    ...baseSort,
    ...(baseSort.id ? {} : { id: "asc" }),
  };

  return !reverseSort
    ? orderBy
    : Object.keys(orderBy).reduce(
        (acc, key) => {
          const order = orderBy[key];
          return {
            ...acc,
            [key]: (order === "asc" ? "desc" : "asc") as "asc" | "desc",
          };
        },
        {} as Record<string, "asc" | "desc">
      );
}
