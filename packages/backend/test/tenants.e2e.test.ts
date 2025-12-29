import request from "supertest";
import { createTestApp } from "./support/create-app.js";
import { setupDatabase } from "../../database/src/test_support/index.js";

describe("Tenants API", () => {
  it("lists tenants and creates a new tenant", async () => {
    const { prisma, container } = await setupDatabase();
    const { app, close } = await createTestApp(prisma);
    try {
      // Initially there might be no tenants
      const listRes = await request(app.server).get("/api/v1/tenants/").expect(200);
      expect(Array.isArray(listRes.body)).toBe(true);

      // Create a tenant
      const createRes = await request(app.server).post("/api/v1/tenants/").send({ name: "Test Tenant" }).expect(201);
      expect(createRes.body).toEqual(expect.objectContaining({ id: expect.any(String), name: "Test Tenant" }));

      // List again should include the new tenant
      const listRes2 = await request(app.server).get("/api/v1/tenants/").expect(200);
      expect(listRes2.body.some((t: any) => t.name === "Test Tenant")).toBe(true);
    } finally {
      await close();
      await container.stop();
    }
  }, 120000);
});
