import { body } from "express-validator";
import { validateRequest } from "@middlewares/validate-request.middleware.js";

export const customerValidationRules = {
  update: [
    body("fullName")
      .optional()
      .isString()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Full Name must be between 2 and 50 characters"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Please provide a valid email address")
      .normalizeEmail(),
    body("password")
      .optional()
      .isString()
      .isLength({ min: 6, max: 50 })
      .withMessage("Password must be between 6 and 50 characters long"),
    body("contactNumber").optional().isString().trim(),
    body("profileImage").optional().isString().trim(),
    validateRequest,
  ],
};
