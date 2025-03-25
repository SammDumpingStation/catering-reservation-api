import { Router } from "express";
import { signIn, signOut, signUp } from "@controllers/auth.controller.js";
import { authValidationRules } from "@middlewares/validators/auth.validator.js";

const authRouter = Router();

authRouter.post("/sign-up", authValidationRules.signUp, signUp);

authRouter.post("/sign-in", authValidationRules.signIn, signIn);

authRouter.post("/sign-out", signOut);

export default authRouter;
