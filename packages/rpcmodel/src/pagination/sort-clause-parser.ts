export function parseSortParameter(sort: string): Record<string, "asc" | "desc"> {
  const fields = sort.split(",");
  const tokens = fields
    .map(t =>
      t
        .trim()
        .split(":")
        .map(s => s?.trim())
    )
    .filter(([key, order]) => !!key && (order === "asc" || order === "desc")) as [string, "asc" | "desc"][];
  console.log(sort, fields, tokens);

  return tokens.reduce(
    (acc, [key, order]) => {
      if (order !== "asc" && order !== "desc") throw new Error("Invalid sort order");
      return {
        ...acc,
        [key]: order,
      };
    },
    {} as Record<string, "asc" | "desc">
  );
}
