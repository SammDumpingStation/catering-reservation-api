export interface ICustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}

export type RateLimiterProps = {
  time?: number;
  limit?: number;
  message?: string;
};
