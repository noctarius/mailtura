import { type Static, Type } from "typebox";

interface PaginationToken {
  // entity id
  i?: string | { [key: string]: string | number | boolean };
  // page
  p: number;
  // pageSize
  ps: number;
  // pages
  pg?: number;
  // forward
  t: "n" | "p" | "c" | "f" | "l";
}

export interface Cursor {
  id?: string | { [key: string]: string | number | boolean };
  page: number;
  pageSize: number;
  pages?: number;
  type: "next" | "previous" | "current" | "first" | "last";
}

export const PaginationQueryParameters = Type.Object(
  {
    cursor: Type.Optional(Type.String()),
    limit: Type.Optional(Type.Number()),
    query: Type.Optional(Type.String()),
    sort: Type.Optional(Type.String()),
  },
  {
    $id: "PaginationQueryParameters",
    description: "Pagination query parameters",
    additionalProperties: false,
  }
);

export type PaginationQueryParameters = Static<typeof PaginationQueryParameters>;

export const PaginationMetadata = Type.Object(
  {
    pageSize: Type.Optional(Type.Number()),
    pages: Type.Optional(Type.Number()),
    currentPage: Type.Optional(Type.Number()),
    totalItems: Type.Optional(Type.Number()),
    nextCursor: Type.Optional(Type.String()),
    previousCursor: Type.Optional(Type.String()),
    firstCursor: Type.Optional(Type.String()),
    lastCursor: Type.Optional(Type.String()),
    currentCursor: Type.Optional(Type.String()),
  },
  {
    $id: "PaginationMetadata",
    description: "Pagination metadata",
    additionalProperties: false,
  }
);

export type PaginationMetadata = Static<typeof PaginationMetadata>;

export function newFirstPageCursor(items: { id: string }[], currentPage: number, pageSize: number, totalItems: number) {
  const pages = Math.ceil(totalItems / pageSize);
  const cursor: Cursor = {
    page: 1,
    pageSize,
    pages,
    type: "first",
  };
  return encodePaginationToken(cursor);
}

export function newLastPageCursor(items: { id: string }[], pageSize: number, totalItems: number) {
  const pages = Math.ceil(totalItems / pageSize);
  const cursor: Cursor = {
    page: pages,
    pageSize,
    pages,
    type: "last",
  };
  return encodePaginationToken(cursor);
}

export function newCurrentPageCursor(
  items: { id: string }[],
  currentPage: number,
  pageSize: number,
  totalItems: number
) {
  const pages = Math.ceil(totalItems / pageSize);
  const cursor: Cursor = {
    id: items[0]!.id,
    page: currentPage,
    pageSize,
    pages,
    type: "current",
  };
  return encodePaginationToken(cursor);
}

export function newNextPageCursor(items: { id: string }[], currentPage: number, pageSize: number, totalItems: number) {
  const pages = Math.ceil(totalItems / pageSize);
  if (currentPage === pages) return undefined;
  const cursor: Cursor = {
    id: items[items.length - 1]!.id,
    page: currentPage + 1,
    pageSize,
    pages,
    type: "next",
  };
  return encodePaginationToken(cursor);
}

export function newPreviousPageCursor(
  items: { id: string }[],
  currentPage: number,
  pageSize: number,
  totalItems: number
) {
  if (currentPage === 1) return undefined;
  const cursor: Cursor = {
    id: items[0]!.id,
    page: currentPage - 1,
    pageSize,
    pages: Math.ceil(totalItems / pageSize),
    type: "previous",
  };
  return encodePaginationToken(cursor);
}

export function decodePaginationToken(paginationToken: string): Cursor {
  const token = JSON.parse(Buffer.from(paginationToken, "base64").toString()) as PaginationToken;
  return {
    id: token.i,
    page: token.p,
    pages: token.pg,
    pageSize: token.ps,
    type:
      token.t === "n"
        ? "next"
        : token.t === "p"
          ? "previous"
          : token.t === "c"
            ? "current"
            : token.t === "f"
              ? "first"
              : "last",
  };
}

export function encodePaginationToken(pagination: Cursor): string {
  const paginationToken: PaginationToken = {
    i: pagination.id,
    p: pagination.page,
    pg: pagination.pages,
    ps: pagination.pageSize,
    t:
      pagination.type === "next"
        ? "n"
        : pagination.type === "previous"
          ? "p"
          : pagination.type === "current"
            ? "c"
            : pagination.type === "first"
              ? "f"
              : "l",
  };
  return Buffer.from(JSON.stringify(paginationToken)).toString("base64");
}
