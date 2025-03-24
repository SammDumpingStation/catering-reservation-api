import { config } from "dotenv"; //This is to separate the concern of environment variables from development and production

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  NODE_ENV,
  DB_URI_CLOUD,
  DB_URI_LOCAL,
  JWT_EXPIRES_IN = "1h",
  JWT_SECRET = "secret",
  USE_CLOUD_DB,
} = process.env as Record<string, string>;
