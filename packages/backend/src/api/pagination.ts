interface PaginationToken {
  // cursor
  c: string;
  // sorting
  s?: { [key: string]: "a" | "d" };
  // filter
  f?: { [key: string]: PaginationTokenFilter };
  // page
  p: number;
  // pageSize
  ps: number;
  // pages
  pg?: number;
}

interface PaginationTokenFilter {
  // and
  a?: { [key: string]: PaginationTokenFilter };
  // or
  o?: { [key: string]: PaginationTokenFilter };
  // eq
  e?: any;
  // in
  i?: any;
  // notIn
  ni?: any;
  // lt
  l?: any;
  // lte
  le?: any;
  // gt
  g?: any;
  // gte
  ge?: any;
  // not
  n?: any;
  // contains
  c?: any;
}

export interface PaginationFilter {
  and?: { [key: string]: PaginationFilter };
  or?: { [key: string]: PaginationFilter };
  equal?: any;
  in?: any[];
  notIn?: any[];
  lt?: any;
  lte?: any;
  gt?: any;
  gte?: any;
  not?: any;
  contains?: any;
}

export interface Pagination {
  cursor: string;
  page: number;
  pageSize: number;
  pages?: number;
  where?: { [key: string]: PaginationFilter };
  orderBy?: { [key: string]: "asc" | "desc" };
}

export function decodePaginationToken(paginationToken: string): Pagination {
  const token = JSON.parse(Buffer.from(paginationToken, "base64").toString()) as PaginationToken;

  const where = decodeWhere(token.f);
  const orderBy = decodeOrderBy(token.s);
  return {
    cursor: token.c,
    page: token.p,
    pages: token.pg,
    pageSize: token.ps,
    where,
    orderBy,
  };
}

export function encodePaginationToken(pagination: Pagination): string {
  const where = encodeWhere(pagination.where);
  const orderBy = encodeOrderBy(pagination.orderBy);
  const paginationToken: PaginationToken = {
    c: pagination.cursor,
    p: pagination.page,
    pg: pagination.pages,
    ps: pagination.pageSize,
    f: where,
    s: orderBy,
  };
  return Buffer.from(JSON.stringify(paginationToken)).toString("base64");
}

const decodeOrderBy = (
  orderBy: { [key: string]: "a" | "d" } | undefined
): { [key: string]: "asc" | "desc" } | undefined => {
  if (!orderBy) return undefined;
  return Object.keys(orderBy).reduce(
    (acc, cur) => {
      acc[cur] = orderBy[cur] === "a" ? "asc" : "desc";
      return acc;
    },
    {} as { [key: string]: "asc" | "desc" }
  );
};

const decodeWhere = (
  filter: { [key: string]: PaginationTokenFilter } | undefined
): { [key: string]: PaginationFilter } | undefined => {
  if (!filter) return undefined;
  return Object.keys(filter).reduce(
    (acc, cur) => {
      const currentFilter = filter[cur];
      if (!currentFilter) return acc;

      const and = decodeWhere(currentFilter.a);
      const or = decodeWhere(currentFilter.o);
      acc[cur] = {
        and,
        or,
        equal: currentFilter.e,
        in: currentFilter.i,
        notIn: currentFilter.ni,
        lt: currentFilter.l,
        lte: currentFilter.le,
        gt: currentFilter.g,
        gte: currentFilter.ge,
        not: currentFilter.n,
        contains: currentFilter.c,
      };
      return acc;
    },
    {} as { [key: string]: PaginationFilter }
  );
};

const encodeOrderBy = (
  orderBy: { [key: string]: "asc" | "desc" } | undefined
): { [key: string]: "a" | "d" } | undefined => {
  if (!orderBy) return undefined;
  return Object.keys(orderBy).reduce(
    (acc, cur) => {
      acc[cur] = orderBy[cur] === "asc" ? "a" : "d";
      return acc;
    },
    {} as { [key: string]: "a" | "d" }
  );
};

const encodeWhere = (
  filter: { [key: string]: PaginationFilter } | undefined
): { [key: string]: PaginationTokenFilter } | undefined => {
  if (!filter) return undefined;
  return Object.keys(filter).reduce(
    (acc, cur) => {
      const currentFilter = filter[cur];
      if (!currentFilter) return acc;

      const and = encodeWhere(currentFilter.and);
      const or = encodeWhere(currentFilter.or);
      acc[cur] = {
        a: and,
        o: or,
        e: currentFilter.equal,
        i: currentFilter.in,
        ni: currentFilter.notIn,
        l: currentFilter.lt,
        le: currentFilter.lte,
        g: currentFilter.gt,
        ge: currentFilter.gte,
        n: currentFilter.not,
        c: currentFilter.contains,
      };
      return acc;
    },
    {} as { [key: string]: PaginationTokenFilter }
  );
};
