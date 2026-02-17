import Fastify from "fastify";
import cors from "@fastify/cors";
import Swagger from "@fastify/swagger";
import Multipart from "@fastify/multipart";
import SwaggerUi from "@fastify/swagger-ui";
import Static from "@fastify/static";
import Auth from "./auth/plugin.js";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import registerModelSchema, { registerRoutes } from "./api/index.js";
import { createRouter } from "./router/index.js";
import * as path from "node:path";
import "./tasks/index.js";
import { requiresInstallation } from "./helpers/requires-installation.js";
import { installationRoutes } from "./api/handlers/installation.js";
import { handlePrismaError, newPrismaClient } from "@mailtura/database";
import { createLazyTemporalTaskManager } from "./tasks/index.js";
import type { ServerContext } from "./context/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { startSmtpServer } from "./smtp/server.js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const app = Fastify()
  .register(Multipart, {
    attachFieldsToBody: true,
    throwFileSizeLimit: true,
    limits: {
      fileSize: 1024 * 1024 * 10,
    },
  })
  .withTypeProvider<TypeBoxTypeProvider>()
  .setErrorHandler(async (error, request, reply) => {
    // If the error is a validation error, send a 422 error with the validation details
    if (error.validation) {
      return reply.status(422).send({
        message: error.message,
        validation: error.validation,
      });
    }

    // If the error is a Prisma error, handle it now
    handlePrismaError(error);

    // If any other error, send a generic 500 error
    reply.status(error.statusCode ?? 500).send({ message: error.message, details: (error as any)?.details });
  });

// Register schema types
registerModelSchema(app);

(async function main() {
  await app.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  await app.register(Swagger, {
    refResolver: {
      buildLocalReference: ref => {
        return ref["$id"] as string;
      },
    },
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Mailtura API",
        description: "The OpenAPI specification for the Mailtura API to send emails, track opens, clicks, and more.",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          apiKey: {
            type: "apiKey",
            in: "header",
            name: "x-api-key",
          },
        },
      },
      security: [
        {
          apiKey: [],
        },
      ],
    },
  });

  await app.register(SwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      showExtensions: true,
      urls: [
        {
          url: "/docs/json",
          name: "Mailtura API",
        },
      ],
      docExpansion: "list",
      deepLinking: true,
      tagsSorter: (a, b) => (b === "tenants" ? 1 : a.localeCompare(b)),
    },
  });

  const currentPath = import.meta.dir;
  console.info(`Mounting ${path.join(currentPath, "public")} as /dashboard`);
  app.register(Static, {
    root: path.join(currentPath, "public"),
    prefix: "/dashboard/",
    index: "index.html",
  });

  const taskManager = createLazyTemporalTaskManager();
  const prisma = newPrismaClient(new PrismaPg({ connectionString }));
  const context: ServerContext = { prisma, taskManager };

  await startSmtpServer(context);

  app.register(Auth, {
    basePath: "/api/v1/auth",
    context,
  });

  const router = createRouter(app, context);

  router.route("/api/v1", registerRoutes);
  if (await requiresInstallation(prisma)) {
    console.info("Installation required, enabling installation routes.");
    router.route("/api/v1/install", installationRoutes, false);
  }

  console.info("Starting server at :3333...");
  await app.listen({ host: "0.0.0.0", port: 3333 });
})();
