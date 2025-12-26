export type AstNode = LogicalNode | ComparisonNode | NotNode | GroupNode;

export interface LogicalNode {
  type: "logical";
  op: "AND" | "OR";
  left: AstNode;
  right: AstNode;
}

export interface NotNode {
  type: "not";
  child: AstNode;
}

export interface ComparisonNode {
  type: "comparison";
  field: string;
  op: "=" | "!=" | ">" | ">=" | "<" | "<=" | "LIKE" | "ILIKE" | "IN" | "CONTAINS";
  value: string | number | boolean | null | (string | number | boolean | null)[];
}

export interface GroupNode {
  type: "group";
  child: AstNode;
}

type TokenType = "IDENT" | "NUMBER" | "STRING" | "BOOL" | "NULL" | "OP" | "LPAREN" | "RPAREN" | "COMMA";

interface Token {
  type: TokenType;
  value: string;
}

const keywords = new Set(["AND", "OR", "NOT", "IN", "CONTAINS", "LIKE", "ILIKE", "true", "false", "null"]);

interface ParserState {
  tokens: Token[];
  pos: number;
}

export function parseQueryParameter(query: string): AstNode {
  const peek = (state: ParserState): Token | null => {
    return state.tokens[state.pos] ?? null;
  };

  const consume = (state: ParserState, expected?: TokenType | string): Token => {
    const token = state.tokens[state.pos];
    if (!token) throw new Error("Unexpected end of input");

    if (expected) {
      if (expected === token.type || expected === token.value) {
        state.pos++;
        return token;
      }
      throw new Error(`Expected ${expected} but got ${token.type}:${token.value}`);
    }

    state.pos++;
    return token;
  };

  const parseOr = (state: ParserState): AstNode => {
    let node = parseAnd(state);
    while (true) {
      const t = peek(state);
      if (t && t.type === "IDENT" && t.value === "OR") {
        consume(state); // OR
        const right = parseAnd(state);
        node = { type: "logical", op: "OR", left: node, right };
      } else {
        break;
      }
    }
    return node;
  };

  const parseAnd = (state: ParserState): AstNode => {
    let node = parseUnary(state);
    while (true) {
      const t = peek(state);
      if (t && t.type === "IDENT" && t.value === "AND") {
        consume(state); // AND
        const right = parseUnary(state);
        node = { type: "logical", op: "AND", left: node, right };
      } else {
        break;
      }
    }
    return node;
  };

  const parseUnary = (state: ParserState): AstNode => {
    const t = peek(state);
    if (t && t.type === "IDENT" && t.value === "NOT") {
      consume(state); // NOT
      const child = parseUnary(state);
      return { type: "not", child };
    }
    return parsePrimary(state);
  };

  const parsePrimary = (state: ParserState): AstNode => {
    const t = peek(state);
    if (!t) throw new Error("Unexpected end of input in primary");

    if (t.type === "LPAREN") {
      consume(state, "LPAREN");
      const expr = parseOr(state);
      consume(state, "RPAREN");
      return { type: "group", child: expr };
    }
    // Otherwise: comparison: field op value
    return parseComparison(state);
  };

  const parseValue = (token: Token): string | number | boolean | null => {
    switch (token.type) {
      case "NUMBER":
        return Number(token.value);
      case "STRING":
        return token.value;
      case "BOOL":
        return token.value === "true";
      case "NULL":
        return null;
      default:
        throw new Error("Illegal value token type: " + token.type);
    }
  };

  const parseInComparison = (state: ParserState, fieldToken: Token): ComparisonNode => {
    consume(state, "IN");
    consume(state, "LPAREN");
    const values: (string | number | boolean | null)[] = [];
    while (true) {
      const valueTok = consume(state); // NUMBER | STRING | BOOL | NULL
      values.push(parseValue(valueTok));

      const t = peek(state);
      if (!t || t.type !== "COMMA") {
        break;
      }
      consume(state, "COMMA");
    }
    consume(state, "RPAREN");
    return {
      type: "comparison",
      field: fieldToken.value,
      op: "IN",
      value: values,
    };
  };

  const parseContainsComparison = (state: ParserState, fieldToken: Token): ComparisonNode => {
    consume(state, "CONTAINS");
    const pattern = consume(state).value;
    return {
      type: "comparison",
      field: fieldToken.value,
      op: "CONTAINS",
      value: pattern,
    };
  };

  const parseLikeComparison = (state: ParserState, fieldToken: Token, ignoreCase: boolean): ComparisonNode => {
    consume(state, ignoreCase ? "ILIKE" : "LIKE");
    const pattern = consume(state).value;
    return {
      type: "comparison",
      field: fieldToken.value,
      op: ignoreCase ? "ILIKE" : "LIKE",
      value: ignoreCase ? pattern.toLowerCase() : pattern,
    };
  };

  const parseComparison = (state: ParserState): ComparisonNode => {
    const fieldToken = consume(state, "IDENT");

    const next = peek(state);
    if (!next) throw new Error("Unexpected end, expected comparison operator");

    if (next.type === "IDENT") {
      switch (next.value) {
        case "IN":
          return parseInComparison(state, fieldToken);
        case "CONTAINS":
          return parseContainsComparison(state, fieldToken);
        case "LIKE":
          return parseLikeComparison(state, fieldToken, false);
        case "ILIKE":
          return parseLikeComparison(state, fieldToken, true);
        default:
          throw new Error(`Unexpected operator ${next.value}`);
      }
    }

    // Normal scalar comparison path
    const opToken = consume(state, "OP");
    const valueToken = consume(state); // NUMBER | STRING | BOOL | NULL
    if (!["NUMBER", "STRING", "BOOL", "NULL"].includes(valueToken.type)) {
      throw new Error(`Expected value but got ${valueToken.type}`);
    }

    const value = parseValue(valueToken);
    const op = opToken.value as ComparisonNode["op"];

    return {
      type: "comparison",
      field: fieldToken.value,
      op,
      value,
    };
  };

  const tokens = tokenize(query);
  const state: ParserState = { tokens, pos: 0 };
  const expr = parseOr(state);
  if (state.pos !== tokens.length) {
    throw new Error("Unexpected tokens at end");
  }
  return expr;
}

const tokenize = (query: string): Token[] => {
  const tokens: Token[] = [];
  let i = 0;

  const isAlpha = (c: string) => /[a-zA-Z_]/.test(c);
  const isDigit = (c: string) => /[0-9]/.test(c);
  const isWhitespace = (c: string) => /\s/.test(c);

  while (i < query.length) {
    const c = query.charAt(i);
    if (isWhitespace(c)) {
      i++;
      continue;
    }

    // Comma
    if (c === ",") {
      tokens.push({ type: "COMMA", value: c });
      i++;
      continue;
    }

    // Parentheses
    if (c === "(") {
      tokens.push({ type: "LPAREN", value: c });
      i++;
      continue;
    }
    if (c === ")") {
      tokens.push({ type: "RPAREN", value: c });
      i++;
      continue;
    }

    // Operators
    if ("=!<>".includes(c)) {
      let op = c;
      if (i + 1 < query.length && "=<>".includes(query.charAt(i + 1))) {
        op += query.charAt(i + 1);
        i++;
      }
      tokens.push({ type: "OP", value: op });
      i++;
      continue;
    }

    // String literal (double or single quotes)
    if (c === '"' || c === "'") {
      const quote = c;
      let j = i + 1;
      let str = "";
      while (j < query.length && query.charAt(j) !== quote) {
        if (query.charAt(j) === "\\" && j + 1 < query.length) {
          // Naive escape handling
          j++;
        }
        str += query.charAt(j);
        j++;
      }
      if (j >= query.length) throw new Error("Unterminated string literal");
      tokens.push({ type: "STRING", value: str });
      i = j + 1;
      continue;
    }

    // Number
    if (isDigit(c)) {
      let j = i;
      while (j < query.length && (isDigit(query.charAt(j)) || query.charAt(j) === ".")) j++;
      const numStr = query.slice(i, j);
      tokens.push({ type: "NUMBER", value: numStr });
      i = j;
      continue;
    }

    // Identifier / keyword
    if (isAlpha(c)) {
      let j = i;
      while (j < query.length && /[a-zA-Z0-9_.]/.test(query.charAt(j))) j++;
      const word = query.slice(i, j);
      if (keywords.has(word)) {
        if (word === "true" || word === "false") {
          tokens.push({ type: "BOOL", value: word });
        } else if (word === "null") {
          tokens.push({ type: "NULL", value: word });
        } else {
          tokens.push({ type: "IDENT", value: word }); // AND/OR/NOT handled in parser
        }
      } else {
        tokens.push({ type: "IDENT", value: word });
      }
      i = j;
      continue;
    }

    throw new Error(`Unexpected character: ${c}`);
  }

  return tokens;
};
