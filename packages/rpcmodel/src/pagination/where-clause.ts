import type { AstNode } from "./where-clause-parser.js";
import type { Cursor } from "./pagination.js";
import { transformAstToFilter, type WhereFilter } from "./where-clause-transformer.js";

export function whereClause<T extends WhereFilter<T>>(
  ast?: AstNode,
  cursor?: Cursor,
  ...blockedProperties: string[]
): T {
  const baseWhereClause = ast ? transformAstToFilter<T>(ast, blockedProperties ?? []) : ({} as T);
  if (cursor && cursor.id) {
    const operator = paginationOperator(cursor);
    if (Array.isArray(cursor.id)) {
      return {
        AND: [baseWhereClause, cursor.id.map(id => ({ id: { [operator]: id } }))],
      } as T;
    } else if (typeof cursor.id === "string") {
      return {
        AND: [baseWhereClause, { id: { [operator]: cursor.id } }],
      } as T;
    }
  }
  return baseWhereClause;
}

const paginationOperator = (cursor: Cursor) => {
  switch (cursor.type) {
    case "next":
      return "gt";
    case "previous":
      return "lt";
    case "current":
      return "gte";
    case "last":
      return "";
    default:
      return "";
  }
};
