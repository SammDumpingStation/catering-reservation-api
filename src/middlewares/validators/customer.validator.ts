import { body } from "express-validator";
import { validateRequest } from "@middlewares/validate-request.middleware.js";

export const customerValidationRules = {
  update: [
    body("fullName")
      .optional()
      .isString()
      .withMessage("Full Name must be a valid string")
      .bail()
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
      .withMessage("Password must be a valid string")
      .bail()
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    body("contactNumber")
      .optional()
      .isString()
      .withMessage("Contact Number must be a String")
      .bail()
      .trim()
      .matches(/^\+639\d{9}$/) // Matches Philippine phone numbers starting with '09' and followed by 9 digits
      .withMessage(
        "Contact number must start with 09 and must have 11 characters long"
      ),

    // body("profileImage")
    //   .optional()
    //   .isString()
    //   .withMessage("Profile Image must be a String")
    //   .bail()
    //   .trim()
    //   .isURL() // Validates if the value is a valid URL
    //   .withMessage("Profile Image must be a valid URL"),

    validateRequest,
  ],
};
