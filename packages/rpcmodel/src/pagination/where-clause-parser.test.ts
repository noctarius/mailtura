import { parseQueryParameter } from "./where-clause-parser.js";

describe("query where-clause parser (unit)", () => {
  test("parses simple string equality", () => {
    const ast = parseQueryParameter('name = "John"');
    expect(ast).toEqual({ type: "comparison", field: "name", op: "=", value: "John" });
  });

  test("parses simple string not equality", () => {
    const ast = parseQueryParameter('name != "John"');
    expect(ast).toEqual({ type: "comparison", field: "name", op: "!=", value: "John" });
  });

  test("parses single quote text", () => {
    const ast = parseQueryParameter("name = 'John'");
    expect(ast).toEqual({ type: "comparison", field: "name", op: "=", value: "John" });
  });

  test("parses numeric comparison (>=)", () => {
    const ast = parseQueryParameter("age >= 18");
    expect(ast).toEqual({ type: "comparison", field: "age", op: ">=", value: 18 });
  });

  test("parses numeric comparison (<=)", () => {
    const ast = parseQueryParameter("age <= 18");
    expect(ast).toEqual({ type: "comparison", field: "age", op: "<=", value: 18 });
  });

  test("parses numeric comparison (>)", () => {
    const ast = parseQueryParameter("age > 18");
    expect(ast).toEqual({ type: "comparison", field: "age", op: ">", value: 18 });
  });

  test("parses numeric comparison (<)", () => {
    const ast = parseQueryParameter("age < 18");
    expect(ast).toEqual({ type: "comparison", field: "age", op: "<", value: 18 });
  });

  test("parses boolean value", () => {
    const ast = parseQueryParameter("active = true");
    expect(ast).toEqual({ type: "comparison", field: "active", op: "=", value: true });
  });

  test("parses null value", () => {
    const ast = parseQueryParameter("deletedAt = null");
    expect(ast).toEqual({ type: "comparison", field: "deletedAt", op: "=", value: null });
  });

  test("parses not null value", () => {
    const ast = parseQueryParameter("deletedAt != null");
    expect(ast).toEqual({ type: "comparison", field: "deletedAt", op: "!=", value: null });
  });

  test("parses CONTAINS values", () => {
    const ast = parseQueryParameter("name CONTAINS 'Jane'");
    expect(ast).toEqual({ type: "comparison", field: "name", op: "CONTAINS", value: "Jane" });
  });

  test("parses IN values", () => {
    const ast = parseQueryParameter("name IN('John', 'Jane')");
    expect(ast).toEqual({ type: "comparison", field: "name", op: "IN", value: ["John", "Jane"] });
  });

  test("parses LIKE startswith", () => {
    const ast = parseQueryParameter("name LIKE '%John'");
    expect(ast).toEqual({ type: "comparison", field: "name", op: "LIKE", value: "%John" });
  });

  test("parses LIKE endswith", () => {
    const ast = parseQueryParameter("name LIKE 'John%'");
    expect(ast).toEqual({ type: "comparison", field: "name", op: "LIKE", value: "John%" });
  });

  test("parses LIKE contains", () => {
    const ast = parseQueryParameter("name LIKE '%John%'");
    expect(ast).toEqual({ type: "comparison", field: "name", op: "LIKE", value: "%John%" });
  });

  test("parses ILIKE", () => {
    const ast = parseQueryParameter("name ILIKE '%John%'");
    expect(ast).toEqual({ type: "comparison", field: "name", op: "ILIKE", value: "%john%" });
  });

  test("parses AND logical", () => {
    const ast = parseQueryParameter('age >= 18 AND country = "US"');
    expect(ast).toEqual({
      type: "logical",
      op: "AND",
      left: { type: "comparison", field: "age", op: ">=", value: 18 },
      right: { type: "comparison", field: "country", op: "=", value: "US" },
    });
  });

  test("parses OR logical", () => {
    const ast = parseQueryParameter('country = "US" OR country = "CA"');
    expect(ast).toEqual({
      type: "logical",
      op: "OR",
      left: { type: "comparison", field: "country", op: "=", value: "US" },
      right: { type: "comparison", field: "country", op: "=", value: "CA" },
    });
  });

  test("parses two OR logicals", () => {
    const ast = parseQueryParameter('country = "US" OR country = "CA" OR country = "IN"');
    expect(ast).toEqual({
      type: "logical",
      op: "OR",
      left: {
        type: "logical",
        op: "OR",
        left: { type: "comparison", field: "country", op: "=", value: "US" },
        right: { type: "comparison", field: "country", op: "=", value: "CA" },
      },
      right: { type: "comparison", field: "country", op: "=", value: "IN" },
    });
  });

  test("parses more OR logicals", () => {
    const ast = parseQueryParameter('country = "US" OR country = "CA" OR country = "IN" OR country = "DE"');
    expect(ast).toEqual({
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
    });
  });

  test("parses NOT unary", () => {
    const ast = parseQueryParameter("NOT active = true");
    expect(ast).toEqual({
      type: "not",
      child: { type: "comparison", field: "active", op: "=", value: true },
    });
  });

  test("parses grouped expressions with precedence", () => {
    const q = 'age > 18 AND (country = "US" OR country = "CA")';
    const ast = parseQueryParameter(q);
    expect(ast).toEqual({
      type: "logical",
      op: "AND",
      left: { type: "comparison", field: "age", op: ">", value: 18 },
      right: {
        type: "group",
        child: {
          type: "logical",
          op: "OR",
          left: { type: "comparison", field: "country", op: "=", value: "US" },
          right: { type: "comparison", field: "country", op: "=", value: "CA" },
        },
      },
    });
  });

  test("handles escaped quotes inside strings", () => {
    const ast = parseQueryParameter('note = "He said \\"Hi\\""');
    expect(ast).toEqual({ type: "comparison", field: "note", op: "=", value: 'He said "Hi"' });
  });

  test("parses dotted field path", () => {
    const ast = parseQueryParameter('user.address.city = "NY"');
    expect(ast).toEqual({ type: "comparison", field: "user.address.city", op: "=", value: "NY" });
  });

  test("parses left-associative AND chain", () => {
    const ast = parseQueryParameter("a = 1 AND b = 2 AND c = 3");
    expect(ast).toEqual({
      type: "logical",
      op: "AND",
      left: {
        type: "logical",
        op: "AND",
        left: { type: "comparison", field: "a", op: "=", value: 1 },
        right: { type: "comparison", field: "b", op: "=", value: 2 },
      },
      right: { type: "comparison", field: "c", op: "=", value: 3 },
    });
  });

  test("parses left-associative OR chain", () => {
    const ast = parseQueryParameter("a = 1 OR b = 2 OR c = 3");
    expect(ast).toEqual({
      type: "logical",
      op: "OR",
      left: {
        type: "logical",
        op: "OR",
        left: { type: "comparison", field: "a", op: "=", value: 1 },
        right: { type: "comparison", field: "b", op: "=", value: 2 },
      },
      right: { type: "comparison", field: "c", op: "=", value: 3 },
    });
  });

  test("AND precedence over OR", () => {
    const ast = parseQueryParameter("a = 1 OR b = 2 AND c = 3");
    expect(ast).toEqual({
      type: "logical",
      op: "OR",
      left: { type: "comparison", field: "a", op: "=", value: 1 },
      right: {
        type: "logical",
        op: "AND",
        left: { type: "comparison", field: "b", op: "=", value: 2 },
        right: { type: "comparison", field: "c", op: "=", value: 3 },
      },
    });
  });

  test("NOT binding over AND", () => {
    const ast = parseQueryParameter("NOT a = 1 AND b = 2");
    expect(ast).toEqual({
      type: "logical",
      op: "AND",
      left: { type: "not", child: { type: "comparison", field: "a", op: "=", value: 1 } },
      right: { type: "comparison", field: "b", op: "=", value: 2 },
    });
  });

  test("NOT with grouping", () => {
    const ast = parseQueryParameter("NOT (a = 1 OR b = 2)");
    expect(ast).toEqual({
      type: "not",
      child: {
        type: "group",
        child: {
          type: "logical",
          op: "OR",
          left: { type: "comparison", field: "a", op: "=", value: 1 },
          right: { type: "comparison", field: "b", op: "=", value: 2 },
        },
      },
    });
  });

  test("nested parentheses and complex grouping", () => {
    const q = "(a = 1 AND (b = 2 OR (c = 3 AND d = 4)))";
    const ast = parseQueryParameter(q);
    expect(ast).toEqual({
      type: "group",
      child: {
        type: "logical",
        op: "AND",
        left: { type: "comparison", field: "a", op: "=", value: 1 },
        right: {
          type: "group",
          child: {
            type: "logical",
            op: "OR",
            left: { type: "comparison", field: "b", op: "=", value: 2 },
            right: {
              type: "group",
              child: {
                type: "logical",
                op: "AND",
                left: { type: "comparison", field: "c", op: "=", value: 3 },
                right: { type: "comparison", field: "d", op: "=", value: 4 },
              },
            },
          },
        },
      },
    });
  });

  test("parses empty string literal", () => {
    const ast = parseQueryParameter('name = ""');
    expect(ast).toEqual({ type: "comparison", field: "name", op: "=", value: "" });
  });

  test("parses escaped backslashes in strings", () => {
    // Write 4 backslashes in TS to emit 2 in the query string; the tokenizer
    // interprets those as an escaped backslash, yielding one backslash in value.
    const ast = parseQueryParameter('path = "C:\\\\Windows\\\\System32"');
    expect(ast).toEqual({ type: "comparison", field: "path", op: "=", value: "C:\\Windows\\System32" });
  });

  test("accepts varied whitespace between tokens", () => {
    const ast = parseQueryParameter("\n  age\t>=\n18  ");
    expect(ast).toEqual({ type: "comparison", field: "age", op: ">=", value: 18 });
  });

  test("errors on empty input", () => {
    expect(() => parseQueryParameter("")).toThrow();
  });

  test("errors on unmatched parenthesis", () => {
    expect(() => parseQueryParameter("(")).toThrow();
    expect(() => parseQueryParameter("(a = 1")).toThrow();
  });

  test("errors on invalid syntax (missing value)", () => {
    expect(() => parseQueryParameter("age >=")).toThrow();
  });

  test("errors on unexpected trailing tokens", () => {
    expect(() => parseQueryParameter("age > 18 xyz")).toThrow(/Unexpected tokens/);
  });

  test("errors on unterminated string", () => {
    expect(() => parseQueryParameter('name = "John')).toThrow(/Unterminated string literal/);
  });
});
