import { body } from "express-validator";
import { validateRequest } from "@middlewares/validate-request.middleware.js";

export const authValidationRules = {
  signUp: [
    body("fullName")
      .isString()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Full Name must be between 2 and 50 characters"),
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .normalizeEmail(),
    body("password")
      .isString()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    validateRequest,
  ],
  signIn: [
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .normalizeEmail(),
    body("password").isString().notEmpty().withMessage("Password is required"),
    validateRequest,
  ],
};
