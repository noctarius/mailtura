class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: any[]
  ) {
    super(message);
  }
}

export function createError(statusCode: number, message: string, details?: any[]) {
  return new ApiError(statusCode, message, details);
}
