export interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}
