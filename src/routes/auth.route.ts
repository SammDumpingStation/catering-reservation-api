import { Router } from "express";
import {
  signUp,
  signIn,
  signOut,
  getCurrentCustomer,
  generateNewAccessToken,
} from "@controllers/auth.controller.js";
import { authValidationRules } from "@middlewares/validators/auth.validator.js";
import rateLimiter from "@middlewares/rate-limit.js";

const authRouter = Router();

authRouter.post(
  "/sign-up",
  rateLimiter({ limit: 5 }),
  authValidationRules.signUp,
  signUp
);

authRouter.post("/sign-in", authValidationRules.signIn, signIn);

authRouter.post("/sign-out", signOut);

authRouter.get("/me", getCurrentCustomer);

authRouter.post("/refresh", generateNewAccessToken);

export default authRouter;
