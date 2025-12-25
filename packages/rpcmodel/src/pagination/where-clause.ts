import type { AstNode } from "./where-clause-parser.js";
import type { Cursor, OrderBy } from "./pagination.js";
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
    } else if (typeof cursor.id === "object") {
      // Object-shaped cursor: contains field values and optional _order map describing sort directions
      const values = cursor.id as Record<string, any>;
      const { _order, ...fields } = values as Record<string, any>;
      const orderBy: Record<string, "asc" | "desc"> | undefined = _order as any;

      // Ensure id is used as final tie-breaker; remove blocked properties
      blockedProperties?.forEach(prop => delete (fields as any)[prop]);
      // Build lexicographic keyset predicate based on sort order; fallback to id-only if no order

      if (!orderBy || Object.keys(orderBy).length === 0) {
        return {
          AND: [baseWhereClause, { id: { [operator]: (fields as any).id } }],
        } as T;
      }
      return buildComplexKeyset<T>(orderBy, fields, cursor, baseWhereClause);
    }
  }
  return baseWhereClause;
}

const buildComplexKeyset = <T extends WhereFilter<T>>(
  orderBy: OrderBy,
  fields: Record<string, any>,
  cursor: Cursor,
  baseWhereClause: T
): T => {
  const sortKeys = Object.keys(orderBy).filter(k => k !== "id");
  const clauses: any[] = [];

  // Build OR of progressive equality on earlier keys and comparison on current key
  const prefixEquals = (upto: number) => {
    if (upto <= 0) return [] as any[];
    return sortKeys.slice(0, upto).map(k => ({ [k]: { equals: (fields as any)[k] } }));
  };

  for (let i = 0; i < sortKeys.length; i++) {
    const key = sortKeys[i]!;
    const cmp = comparator(key, orderBy, cursor);
    const orBranch = {
      AND: [...prefixEquals(i), { [key]: { [cmp]: (fields as any)[key] } }],
    };
    clauses.push(orBranch);
  }

  // Final tie-breaker on id when all sort fields equal
  const idComparator = cursor.type === "previous" ? "lt" : "gt";
  clauses.push({ AND: [...prefixEquals(sortKeys.length), { id: { [idComparator]: (fields as any).id } }] });

  return {
    AND: [baseWhereClause, { OR: clauses }],
  } as T;
};

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

const comparator = (key: string, orderBy: OrderBy, cursor: Cursor) => {
  // For previous cursor we move backwards: invert comparison relative to asc/desc
  const direction = orderBy[key] ?? "asc";
  if (cursor.type === "next" || cursor.type === "current") {
    return direction === "asc" ? "gt" : "lt";
  } else if (cursor.type === "previous") {
    return direction === "asc" ? "lt" : "gt";
  } else if (cursor.type === "last") {
    // last fetches in reverse order, but we don't have anchor values; fallback
    return direction === "asc" ? "lt" : "gt";
  }
  return direction === "asc" ? "gt" : "lt";
};
