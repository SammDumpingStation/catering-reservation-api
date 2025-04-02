import { body } from "express-validator";
import { validateRequest } from "@middlewares/validate-request.middleware.js";

export const authValidationRules = {
  signUp: [
    body("fullName")
      .notEmpty()
      .withMessage("Full Name is required")
      .bail()
      .isString()
      .withMessage("Full Name must be a valid string")
      .bail()
      .isLength({ min: 2, max: 50 })
      .withMessage("Full Name must be between 2 and 50 characters"),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Please provide a valid email address")
      .normalizeEmail(),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isString()
      .withMessage("Password must be a valid string")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    validateRequest, // Ensure this is the last middleware to catch errors
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
