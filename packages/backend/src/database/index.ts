import type { AstNode, ComparisonNode } from "@mailtura/rpcmodel/api/where-clause-parser.js";

interface BasePrismaWhereInput<T extends BasePrismaWhereInput<T>> {
  AND?: T | T[];
  OR?: T[];
  NOT?: T | T[];
}

export function whereAstToPrisma<T extends BasePrismaWhereInput<T>>(ast: AstNode): T {
  switch (ast.type) {
    case "comparison":
      return comparisonToPrisma<T>(ast);
    case "logical":
      if (ast.op === "AND") {
        return { AND: [whereAstToPrisma<T>(ast.left), whereAstToPrisma<T>(ast.right)] } as T;
      } else {
        return { OR: [whereAstToPrisma<T>(ast.left), whereAstToPrisma<T>(ast.right)] } as T;
      }
    case "not":
      return { NOT: whereAstToPrisma<T>(ast.child) } as T;
    case "group":
      return whereAstToPrisma<T>(ast.child);
  }
}

const comparisonToPrisma = <T extends BasePrismaWhereInput<T>>(node: ComparisonNode): T => {
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

  // Build something like { age: { gte: 18 } }
  return {
    [field]: condition,
  } as T;
};
