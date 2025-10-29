import Fastify from "fastify";
import cors from "@fastify/cors";
import Swagger from "@fastify/swagger";
import Multipart from "@fastify/multipart";
import SwaggerUi from "@fastify/swagger-ui";
import Static from "@fastify/static";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import registerModelSchema, { registerRoutes } from "./api/index.js";
import { createRouter } from "./router/index.js";
import { handlePrismaError } from "./database/index.js";
import * as path from "node:path";

const app = Fastify()
  .register(Multipart)
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
    reply.status(error.statusCode ?? 500).send({ message: error.message });
  });

// Register schema types
registerModelSchema(app);

await app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
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
        jwt: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        apiKey: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
    security: [
      {
        jwt: [],
        apiKey: [],
      },
    ],
  },
});

await app.register(SwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
});

const currentPath = import.meta.dir
console.info(`Mounting ${path.join(currentPath, "public")} as /dashboard`)
app.register(Static, {
  root: path.join(currentPath, "public"),
  prefix: "/dashboard/",
  index: "index.html",
});

createRouter(app).route("/api/v1", registerRoutes);

console.info("Starting server at :3000...");
await app.listen({ host: '0.0.0.0', port: 3000 });
