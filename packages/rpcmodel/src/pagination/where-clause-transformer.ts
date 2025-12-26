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

export function transformAstToFilter<T extends WhereFilter<T>>(ast: AstNode, blockedProperties: string[]): T {
  return transformAstNode<T>(ast, blockedProperties.map(transformPropertyName));
}

const transformAstNode = <T extends WhereFilter<T>>(ast: AstNode, blockedProperties: string[]): T => {
  switch (ast.type) {
    case "comparison":
      return astNodeToComparison<T>(ast, blockedProperties);
    case "logical":
      if (ast.op === "AND") {
        const baseLeft = transformAstNode<T>(ast.left, blockedProperties);
        const left = "AND" in baseLeft ? baseLeft.AND! : [baseLeft];
        return { AND: [...left, transformAstNode<T>(ast.right, blockedProperties)] } as T;
      } else {
        const baseLeft = transformAstNode<T>(ast.left, blockedProperties);
        const left = "OR" in baseLeft ? baseLeft.OR! : [baseLeft];
        return { OR: [...left, transformAstNode<T>(ast.right, blockedProperties)] } as T;
      }
    case "not":
      return { NOT: transformAstNode<T>(ast.child, blockedProperties) } as T;
    case "group":
      return transformAstNode<T>(ast.child, blockedProperties);
  }
};

const astNodeToComparison = <T extends WhereFilter<T>>(node: ComparisonNode, blockedProperties: string[]): T => {
  const field = node.field as keyof T;
  const fieldName = transformPropertyName(field.toString());
  if (blockedProperties.includes(fieldName)) {
    throw new Error(`Access to property ${field.toString()} is blocked`);
  }

  // Map each operator to Prisma operator name
  let condition: any;
  switch (node.op) {
    case "=":
      if (node.value === null) {
        condition = { isNull: true };
      } else {
        condition = { equals: node.value };
      }
      break;
    case "!=":
      if (node.value === null) {
        condition = { not: { isNull: true } };
      } else {
        condition = { not: { equals: node.value } };
      }
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
    case "CONTAINS":
      condition = { has: node.value };
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
  return { [fieldName]: condition } as T;
};

const transformPropertyName = (name: string) => name.replace(/([A-Z])/g, "_$1").toLowerCase();
