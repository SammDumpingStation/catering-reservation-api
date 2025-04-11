import rateLimit from "express-rate-limit";

export const authRateLimit = (limit: number) =>
  rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: limit,
    message: () => ({
      statusCode: 429,
      message: "Too many requests, please try again later",
    }),
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
