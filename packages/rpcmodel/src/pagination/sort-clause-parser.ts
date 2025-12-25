import type { OrderBy, SortOrder } from "./pagination.js";

export function parseSortParameter(sort: string): OrderBy {
  const fields = sort.split(",");
  const tokens = fields
    .map(t =>
      t
        .trim()
        .split(":")
        .map(s => s?.trim())
    )
    .filter(([key, order]) => !!key && (order === "asc" || order === "desc")) as [string, SortOrder][];

  return tokens.reduce((acc, [key, order]) => {
    if (order !== "asc" && order !== "desc") throw new Error("Invalid sort order");
    return {
      ...acc,
      [key]: order,
    };
  }, {} as OrderBy);
}
