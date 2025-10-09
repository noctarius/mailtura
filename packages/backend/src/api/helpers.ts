class ApiError extends Error {
  constructor(public readonly statusCode: number, message: string) {
    super(message);
  }
}

export function createError(statusCode: number, message: string) {
  return new ApiError(statusCode, message);
}
