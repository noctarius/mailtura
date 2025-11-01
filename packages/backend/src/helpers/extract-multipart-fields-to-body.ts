import type { FastifyRequest } from "fastify";

export function parseMultipartFieldsToBody(request: FastifyRequest<any, any>) {
  if (!request.isMultipart()) return;

  request.body = request.body || {};
  for (const fieldName of Object.keys(request.body as any)) {
    const field = (request.body as any)[fieldName];
    if (typeof field.toBuffer === "function")
      continue;
    else
      (request.body as any)[fieldName] = JSON.parse(field.value)
  }
}
