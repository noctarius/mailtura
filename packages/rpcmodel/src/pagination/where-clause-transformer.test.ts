import type { AstNode } from "./where-clause-parser.js";
import { transformAstToFilter } from "./where-clause-transformer.js";

describe("where clause and order by mapping (unit)", () => {
  test("transform null check", () => {
    const ast: AstNode = { type: "comparison", field: "deletedAt", op: "=", value: null };
    const mapped = transformAstToFilter(ast, []);
    expect(mapped).toEqual({ deleted_at: { isNull: true } });
  });

  test("transform not-null check", () => {
    const ast: AstNode = { type: "comparison", field: "deletedAt", op: "!=", value: null };
    const mapped = transformAstToFilter(ast, []);
    expect(mapped).toEqual({ deleted_at: { not: { isNull: true } } });
  });

  test("group multiple OR into one", () => {
    const ast: AstNode = {
      type: "logical",
      op: "OR",
      left: {
        type: "logical",
        op: "OR",
        left: {
          type: "logical",
          op: "OR",
          left: { type: "comparison", field: "country", op: "=", value: "US" },
          right: { type: "comparison", field: "country", op: "=", value: "CA" },
        },
        right: { type: "comparison", field: "country", op: "=", value: "IN" },
      },
      right: { type: "comparison", field: "country", op: "=", value: "DE" },
    };

    const mapped = transformAstToFilter(ast, []);
    expect(mapped).toEqual({
      OR: [
        { country: { equals: "US" } },
        { country: { equals: "CA" } },
        { country: { equals: "IN" } },
        { country: { equals: "DE" } },
      ],
    });
  });

  test("group multiple AND into one", () => {
    const ast: AstNode = {
      type: "logical",
      op: "AND",
      left: {
        type: "logical",
        op: "AND",
        left: {
          type: "logical",
          op: "AND",
          left: { type: "comparison", field: "country", op: "=", value: "US" },
          right: { type: "comparison", field: "country", op: "=", value: "CA" },
        },
        right: { type: "comparison", field: "country", op: "=", value: "IN" },
      },
      right: { type: "comparison", field: "country", op: "=", value: "DE" },
    };

    const mapped = transformAstToFilter(ast, []);
    expect(mapped).toEqual({
      AND: [
        { country: { equals: "US" } },
        { country: { equals: "CA" } },
        { country: { equals: "IN" } },
        { country: { equals: "DE" } },
      ],
    });
  });

  test("prevent blocked properties from being mapped (OR)", () => {
    const ast: AstNode = {
      type: "logical",
      op: "OR",
      left: { type: "comparison", field: "country", op: "=", value: "US" },
      right: { type: "comparison", field: "blockedProperty", op: "=", value: "IN" },
    };

    expect(() => transformAstToFilter(ast, ["blockedProperty"])).toThrow(/blockedProperty/);
    expect(() => transformAstToFilter(ast, ["blocked_property"])).toThrow(/blockedProperty/);

    const ast2: AstNode = {
      type: "logical",
      op: "OR",
      left: { type: "comparison", field: "country", op: "=", value: "US" },
      right: { type: "comparison", field: "blocked_property", op: "=", value: "IN" },
    };

    expect(() => transformAstToFilter(ast2, ["blockedProperty"])).toThrow(/blocked_property/);
    expect(() => transformAstToFilter(ast2, ["blocked_property"])).toThrow(/blocked_property/);
  });

  test("prevent blocked properties from being mapped (AND)", () => {
    const ast: AstNode = {
      type: "logical",
      op: "AND",
      left: { type: "comparison", field: "country", op: "=", value: "US" },
      right: { type: "comparison", field: "blockedProperty", op: "=", value: "IN" },
    };

    expect(() => transformAstToFilter(ast, ["blockedProperty"])).toThrow(/blockedProperty/);
    expect(() => transformAstToFilter(ast, ["blocked_property"])).toThrow(/blockedProperty/);

    const ast2: AstNode = {
      type: "logical",
      op: "AND",
      left: { type: "comparison", field: "country", op: "=", value: "US" },
      right: { type: "comparison", field: "blocked_property", op: "=", value: "IN" },
    };

    expect(() => transformAstToFilter(ast2, ["blockedProperty"])).toThrow(/blocked_property/);
    expect(() => transformAstToFilter(ast2, ["blocked_property"])).toThrow(/blocked_property/);
  });

  test("prevent blocked properties from being mapped", () => {
    const ast: AstNode = { type: "comparison", field: "blockedProperty", op: "=", value: "IN" };

    expect(() => transformAstToFilter(ast, ["blockedProperty"])).toThrow(/blockedProperty/);
    expect(() => transformAstToFilter(ast, ["blocked_property"])).toThrow(/blockedProperty/);

    const ast2: AstNode = {
      type: "comparison",
      field: "blocked_property",
      op: "=",
      value: "IN",
    };

    expect(() => transformAstToFilter(ast2, ["blockedProperty"])).toThrow(/blocked_property/);
    expect(() => transformAstToFilter(ast2, ["blocked_property"])).toThrow(/blocked_property/);
  });
});
