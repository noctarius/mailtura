import type { AstNode } from "./where-clause-parser.js";
import { transformAstToFilter } from "./where-clause-transformer.js";

describe("where clause and order by mapping (unit)", () => {
  test("map multiple or to prisma", () => {
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

    const mapped = transformAstToFilter(ast);
    expect(mapped).toEqual({
      OR: [
        { country: { equals: "US" } },
        { country: { equals: "CA" } },
        { country: { equals: "IN" } },
        { country: { equals: "DE" } },
      ],
    });
  });
});
