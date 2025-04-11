import { RateLimiterProps } from "@TStypes/middleware.type.js";
import rateLimit from "express-rate-limit";

const rateLimiter = ({
  time = 1 * 60 * 1000, // 1 minute
  limit = 10,
  message = "Too many requests, please try again later",
}: RateLimiterProps) => {
  return rateLimit({
    windowMs: time,
    max: limit,
    message: {
      statusCode: 429,
      message,
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
};

export default rateLimiter;
