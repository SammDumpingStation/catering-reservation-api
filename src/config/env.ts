import { config } from "dotenv"; //This is to separate the concern of environment variables from development and production

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  NODE_ENV,
  DB_URI_CLOUD,
  DB_URI_LOCAL,
  USE_CLOUD_DB,
  CLIENT_URL,
  COOKIE_SECRET,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = process.env as Record<string, string>;
