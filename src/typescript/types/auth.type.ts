import { JWT_EXPIRES_IN, JWT_SECRET } from "@config/env.js";

export type signUpProps = {
  fullName: string;
  email: string;
  password: string;
};

export type signInProps = {
  email: string;
  password: string;
};
