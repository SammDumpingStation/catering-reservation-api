import { body } from "express-validator";
import { validateRequest } from "@middlewares/validate-request.middleware.js";

export const customerValidationRules = {
  update: [
    body("fullName")
      .notEmpty()
      .withMessage("Full Name is required")
      .bail()
      .isString()
      .withMessage("Full Name must be a valid string")
      .bail()
      .trim()
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
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    body("contactNumber")
      .notEmpty()
      .withMessage("Contact Number is required")
      .bail()
      .isString()
      .withMessage("Contact Number must be a String")
      .bail()
      .trim()
      .matches(/^09\d{9}$/) // Matches Philippine phone numbers starting with '09' and followed by 9 digits
      .withMessage(
        "Contact number must start with 09 and must have 11 characters long"
      ),

    body("profileImage")
      .notEmpty()
      .withMessage("Profile Image is required")
      .bail()
      .isString()
      .withMessage("Profile Image must be a String")
      .bail()
      .trim()
      .isURL() // Validates if the value is a valid URL
      .withMessage("Profile Image must be a valid URL"),

    validateRequest,
  ],
};
