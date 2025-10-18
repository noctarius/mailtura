import { HttpMethod, PathsWithMethod } from "openapi-typescript-helpers";
import { paths } from "../../../generated/api/mailtura.js";
import { Record } from "typebox";

type UndefToNever<T> = T extends undefined ? never : T;

type Paths<Method extends HttpMethod = HttpMethod> = {
  [K in keyof paths]: {
    [M in Method]-?: UndefToNever<paths[K][M]>;
  };
};

type MethodPaths<Method extends HttpMethod> = PathsWithMethod<Paths<Method>, Method>;

export type PathsWithPost = MethodPaths<"post">;
export type PathsWithPut = MethodPaths<"put">;
export type PathsWithDelete = MethodPaths<"delete">;

type PathOperation<Paths, Path extends keyof Paths> = Paths[Path] extends { post: infer Post } ? Post : never;

type OperationRequestBody<Operation> = Operation extends { requestBody: infer RequestBody } ? RequestBody : never;

type OperationParameters<Operation> = Operation extends { parameters: { path: infer PathParameters } }
  ? PathParameters
  : Record<string, never>;

type OptionalReturn<T> = T | undefined;

type ReactiveParameters<Operation> = {
  [K in keyof OperationParameters<Operation>]: () => OptionalReturn<OperationParameters<Operation>[K]>;
};

type TypeRequestBody<Operation> =
  OperationRequestBody<Operation> extends { content: { "application/json": infer Body } } ? Body : never;

export type RequestBody<Path extends MethodPaths<Method>, Method extends HttpMethod = HttpMethod> = TypeRequestBody<
  PathOperation<Paths, Path>
>;

export type RequestParameters<
  Path extends MethodPaths<Method>,
  Method extends HttpMethod = HttpMethod,
> = ReactiveParameters<PathOperation<Paths, Path>>;

export type PropertyRequestParameters<
  Path extends MethodPaths<Method>,
  Method extends HttpMethod = HttpMethod,
> = OperationParameters<PathOperation<Paths, Path>>;

export class ResponseError extends Error {
  code?: number;

  constructor(message: any, code?: number) {
    super(message?.toString() || "Unknown error happened while communication with the backend api.");
    this.code = code;
  }
}
