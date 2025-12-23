import type { AstNode, ComparisonNode } from "./where-clause-parser.js";

export type WhereComparison = {
  equals?: any;
  not?: any;
  gt?: any;
  gte?: any;
  lt?: any;
  lte?: any;
  in?: any;
  contains?: string;
  mode?: "insensitive";
};

export type WhereFilter<T extends WhereFilter<T>> = {
  AND?: T[];
  OR?: T[];
  NOT?: T | T[];
} & { [K in keyof T]?: WhereComparison & WhereFilter<T> };

export function transformAstToFilter<T extends WhereFilter<T>>(ast: AstNode): T {
  switch (ast.type) {
    case "comparison":
      return astNodeToComparison<T>(ast);
    case "logical":
      if (ast.op === "AND") {
        const baseLeft = transformAstToFilter<T>(ast.left);
        const left = "AND" in baseLeft ? baseLeft.AND! : [baseLeft];
        return { AND: [...left, transformAstToFilter<T>(ast.right)] } as T;
      } else {
        const baseLeft = transformAstToFilter<T>(ast.left);
        const left = "OR" in baseLeft ? baseLeft.OR! : [baseLeft];
        return { OR: [...left, transformAstToFilter<T>(ast.right)] } as T;
      }
    case "not":
      return { NOT: transformAstToFilter<T>(ast.child) } as T;
    case "group":
      return transformAstToFilter<T>(ast.child);
  }
}

const astNodeToComparison = <T extends WhereFilter<T>>(node: ComparisonNode): T => {
  const field = node.field as keyof T;

  // Map each operator to Prisma operator name
  let condition: any;
  switch (node.op) {
    case "=":
      condition = { equals: node.value };
      break;
    case "!=":
      condition = { not: node.value };
      break;
    case ">":
      condition = { gt: node.value };
      break;
    case ">=":
      condition = { gte: node.value };
      break;
    case "<":
      condition = { lt: node.value };
      break;
    case "<=":
      condition = { lte: node.value };
      break;
    case "IN":
      condition = { in: node.value };
      break;
    case "LIKE":
      condition = { contains: node.value };
      break;
    case "ILIKE":
      condition = { contains: node.value, mode: "insensitive" };
      break;
    default:
      throw new Error(`Unsupported operator ${node.op}`);
  }
  return { [field]: condition } as T;
};
