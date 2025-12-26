import { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import type { contacts } from "../generated/prisma/browser.js";
import { randomUUID } from "node:crypto";
import { UTC } from "@mailtura/rpcmodel/time/Timezone.js";
import { uuidv7 } from "uuidv7";
import { type Prisma, setupDatabase } from "../test_support/index.js";
import { withPagination } from "./index.js";
import type { PaginationQueryParameters } from "@mailtura/rpcmodel/pagination/pagination.js";

const letters = "abcdefghijklmnopqrstuvwxyz";

const createTestContacts = (): contacts[] => {
  const tenantId = randomUUID();
  return Array.from({ length: 101 }, (_, i) => {
    const letter = 99 - i;
    const emailFirstLetter = letters[Math.floor(letter / 26)]!;
    const emailSecondLetter = letters[letter % 26]!;
    return {
      id: uuidv7(),
      tenant_id: tenantId,
      first_name: `first-${i}`,
      last_name: `last-${i}`,
      email: `email-${emailFirstLetter}${emailSecondLetter}@test.com`,
      created_at: UTC.now().toDate(),
      created_by: "test",
      updated_at: null,
      updated_by: null,
    };
  });
};

const skipPages = async (
  prisma: Prisma,
  skipPages: number,
  pageSize: number,
  nextCursor?: string,
  parameters?: PaginationQueryParameters
) => {
  for (let i = 0; i < skipPages; i++) {
    const page = await withPagination(
      prisma.contacts_with_subscriptions,
      {
        where: {
          first_name: { startsWith: "first" },
        },
      },
      {
        ...(parameters ?? {}),
        limit: pageSize,
        cursor: nextCursor,
      }
    );

    expect(page).toBeDefined();
    nextCursor = page.metadata.nextCursor;
    if (i === skipPages - 1) return page;
  }
};

const rewindPages = async (
  prisma: Prisma,
  rewindPages: number,
  pageSize: number,
  previousCursor?: string,
  parameters?: PaginationQueryParameters
) => {
  for (let i = 0; i < rewindPages; i++) {
    const page = await withPagination(
      prisma.contacts_with_subscriptions,
      {
        where: {
          first_name: { startsWith: "first" },
        },
      },
      {
        ...(parameters ?? {}),
        limit: pageSize,
        cursor: previousCursor,
      }
    );

    expect(page).toBeDefined();
    previousCursor = page.metadata.previousCursor;
    if (i === rewindPages - 1) return page;
  }
};

describe("Pagination unit tests", () => {
  const testData = createTestContacts();
  let postgresContainer: StartedPostgreSqlContainer;
  let prisma: import("../index.ts").prisma;

  beforeAll(async () => {
    const database = await setupDatabase();
    postgresContainer = database.container;
    prisma = database.prisma;

    await prisma.contacts.createMany({
      data: testData,
    });
  }, 60000);

  afterAll(async () => {
    if (postgresContainer) await postgresContainer.stop();
  });

  test("should request the next page with next cursor", async () => {
    const page = await withPagination(
      prisma.contacts_with_subscriptions,
      {
        where: {
          first_name: { startsWith: "first" },
        },
      },
      {
        limit: 10,
      }
    );

    const next = page.metadata.nextCursor;
    expect(next).toBeDefined();
    expect(page.data.length).toEqual(10);
    expect(page.data[0]?.first_name).toEqual("first-0");
    expect(page.data[9]?.first_name).toEqual("first-9");

    const page2 = await withPagination(
      prisma.contacts_with_subscriptions,
      {
        where: {
          first_name: { startsWith: "first" },
        },
      },
      {
        limit: 10,
        cursor: next,
      }
    );

    const next2 = page.metadata.nextCursor;
    expect(next2).toBeDefined();
    expect(page2.data.length).toEqual(10);
    expect(page2.data[0]?.first_name).toEqual("first-10");
    expect(page2.data[9]?.first_name).toEqual("first-19");
  });

  test("should request the first page with first cursor", async () => {
    const page = await skipPages(prisma, 4, 10);

    const firstPage = await withPagination(
      prisma.contacts_with_subscriptions,
      {
        where: {
          first_name: { startsWith: "first" },
        },
      },
      {
        limit: 10,
        cursor: page?.metadata.firstCursor,
      }
    );

    expect(firstPage).toBeDefined();
    expect(firstPage.data.length).toEqual(10);
    expect(firstPage.data[0]?.first_name).toEqual("first-0");
    expect(firstPage.data[9]?.first_name).toEqual("first-9");
  });

  test("should request the last page with last cursor", async () => {
    const page = await skipPages(prisma, 4, 10);

    const lastPage = await withPagination(
      prisma.contacts_with_subscriptions,
      {
        where: {
          first_name: { startsWith: "first" },
        },
      },
      {
        limit: 10,
        cursor: page?.metadata.lastCursor,
      }
    );

    expect(lastPage).toBeDefined();
    expect(lastPage.data.length).toEqual(1);
    expect(lastPage.data[0]?.first_name).toEqual("first-100");
  });

  test("should return last page with remaining items < pageSize", async () => {
    const page = await skipPages(prisma, 4, 10);

    const lastPage = await withPagination(
      prisma.contacts_with_subscriptions,
      {
        where: {
          first_name: { not: { startsWith: "first-0" } },
        },
      },
      {
        limit: 10,
        cursor: page?.metadata.lastCursor,
      }
    );

    expect(lastPage).toBeDefined();
    expect(lastPage.data.length).toEqual(10);
    expect(lastPage.data[0]?.first_name).toEqual("first-91");
    expect(lastPage.data[9]?.first_name).toEqual("first-100");
  });

  test("should return previous page from previous cursor", async () => {
    const page = await skipPages(prisma, 4, 10);
    const previousPage = await withPagination(
      prisma.contacts_with_subscriptions,
      {
        where: {
          first_name: { startsWith: "first" },
        },
      },
      {
        limit: 10,
        cursor: page?.metadata.previousCursor,
      }
    );

    expect(previousPage.metadata.previousCursor).toBeDefined();
    expect(previousPage.data.length).toEqual(10);
    expect(previousPage.data[0]?.first_name).toEqual("first-20");
    expect(previousPage.data[9]?.first_name).toEqual("first-29");

    const previousPage2 = await withPagination(
      prisma.contacts_with_subscriptions,
      {
        where: {
          first_name: { startsWith: "first" },
        },
      },
      {
        limit: 10,
        cursor: previousPage.metadata.previousCursor,
      }
    );

    expect(previousPage2.metadata.previousCursor).toBeDefined();
    expect(previousPage2.data.length).toEqual(10);
    expect(previousPage2.data[0]?.first_name).toEqual("first-10");
    expect(previousPage2.data[9]?.first_name).toEqual("first-19");
  });

  test("should return next page from next cursor after previous cursor (ensuring consistency)", async () => {
    const page = await skipPages(prisma, 4, 10);
    const previousPage = await withPagination(
      prisma.contacts_with_subscriptions,
      {
        where: {
          first_name: { startsWith: "first" },
        },
      },
      {
        limit: 10,
        cursor: page?.metadata.previousCursor,
      }
    );

    expect(previousPage.metadata.previousCursor).toBeDefined();
    expect(previousPage.data.length).toEqual(10);
    expect(previousPage.data[0]?.first_name).toEqual("first-20");
    expect(previousPage.data[9]?.first_name).toEqual("first-29");

    const nextPage = await withPagination(
      prisma.contacts_with_subscriptions,
      {
        where: {
          first_name: { startsWith: "first" },
        },
      },
      {
        limit: 10,
        cursor: previousPage.metadata.nextCursor,
      }
    );

    expect(nextPage.metadata.nextCursor).toBeDefined();
    expect(nextPage.data.length).toEqual(10);
    expect(nextPage.data[0]?.first_name).toEqual("first-30");
    expect(nextPage.data[9]?.first_name).toEqual("first-39");
  });

  test("should request the next page with next cursor according to sorting", async () => {
    const page = await withPagination(
      prisma.contacts_with_subscriptions,
      {
        where: {
          first_name: { startsWith: "first" },
        },
      },
      {
        sort: "email:asc",
        limit: 10,
      }
    );

    const next = page.metadata.nextCursor;
    expect(next).toBeDefined();
    expect(page.data.length).toEqual(10);
    expect(page.data[0]?.first_name).toEqual("first-99");
    expect(page.data[9]?.first_name).toEqual("first-90");

    const page2 = await withPagination(
      prisma.contacts_with_subscriptions,
      {
        where: {
          first_name: { startsWith: "first" },
        },
      },
      {
        sort: "email:asc",
        limit: 10,
        cursor: next,
      }
    );

    const next2 = page.metadata.nextCursor;
    expect(next2).toBeDefined();
    expect(page2.data.length).toEqual(10);
    expect(page2.data[0]?.email).toEqual("email-ak@test.com");
    expect(page2.data[9]?.email).toEqual("email-at@test.com");
  });

  test("should request the previous page with previous cursor according to sorting", async () => {
    const page = await skipPages(prisma, 4, 10, undefined, {
      sort: "email:asc",
    });

    const previous = page?.metadata.previousCursor;
    const previousPage = await withPagination(
      prisma.contacts_with_subscriptions,
      {
        where: {
          first_name: { startsWith: "first" },
        },
      },
      {
        sort: "email:asc",
        limit: 10,
        cursor: previous,
      }
    );

    expect(previousPage).toBeDefined();
    expect(previousPage.data.length).toEqual(10);
    expect(previousPage.data[0]?.email).toEqual("email-au@test.com");
    expect(previousPage.data[9]?.email).toEqual("email-bd@test.com");
  });
});
