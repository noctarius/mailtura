import {
  decodePaginationToken,
  newCurrentPageCursor,
  newFirstPageCursor,
  newLastPageCursor,
  newNextPageCursor,
  newPreviousPageCursor,
  type PaginationMetadata,
  type PaginationQueryParameters,
  parseSortParameter,
  whereClause,
} from "@mailtura/rpcmodel/pagination/index.js";
import { parseQueryParameter } from "@mailtura/rpcmodel/api/where-clause-parser.js";
import type { PrismaPromise } from "../generated/prisma/internal/prismaNamespace.js";
import { sortClause } from "@mailtura/rpcmodel/pagination/sort-clause.js";

type PrismaDelegate = {
  findMany: (...args: any[]) => Promise<any>;
  count: (...args: any[]) => PrismaPromise<number | {}>;
};

type FindManyArgs<T extends PrismaDelegate> = Parameters<T["findMany"]>[0];
type CountArgs<T extends PrismaDelegate> = Parameters<T["count"]>[0];

type FindManyResult<T extends PrismaDelegate> = Awaited<ReturnType<T["findMany"]>>;

export async function withPagination<Model extends PrismaDelegate>(
  model: Model,
  args: FindManyArgs<Model>,
  queryParams: PaginationQueryParameters
): Promise<{
  data: FindManyResult<Model>;
  metadata: PaginationMetadata;
}> {
  // Potentially parsed query syntax tree
  const query = queryParams.query ? parseQueryParameter(queryParams.query) : undefined;
  const sort = queryParams.sort ? parseSortParameter(queryParams.sort) : undefined;

  // Potentially provided cursor
  const cursor = queryParams.cursor ? decodePaginationToken(queryParams.cursor) : undefined;

  // Current page data
  const currentPage = cursor?.page ?? 1;
  const pageSize = cursor?.pageSize ?? queryParams.limit ?? 100;
  const needsReverse = cursor?.type === "last" || cursor?.type === "previous";

  // Building the query where clause
  const where = whereClause<any>(query, cursor);
  const orderBy = sortClause(sort, cursor);
  console.log(orderBy);
  // Load total items count
  const totalItems = (await model.count({
    where: {
      ...(args?.where ?? {}),
    },
  } as CountArgs<Model>)) as number;

  const remaining = totalItems % pageSize;
  const limit = Math.min(pageSize, remaining === 0 ? pageSize : remaining);

  // Query the current page
  const page = await model.findMany({
    ...args,
    where: {
      ...(args?.where ?? {}),
      ...where,
    },
    orderBy,
    take: limit,
  });

  // For last and previous cursors, we need to reverse the data to get the correct order
  if (needsReverse) page.reverse();

  return {
    data: page,
    metadata: {
      totalItems: totalItems,
      currentPage,
      pageSize,
      pages: Math.ceil(totalItems / pageSize),
      currentCursor: newCurrentPageCursor(page, currentPage, pageSize, totalItems),
      nextCursor: newNextPageCursor(page, currentPage, pageSize, totalItems),
      previousCursor: newPreviousPageCursor(page, currentPage, pageSize, totalItems),
      firstCursor: newFirstPageCursor(page, currentPage, pageSize, totalItems),
      lastCursor: newLastPageCursor(page, pageSize, totalItems),
    },
  };
}
