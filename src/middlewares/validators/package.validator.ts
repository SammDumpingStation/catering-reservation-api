import { body } from "express-validator";
import { validateRequest } from "../validate-request.middleware.js";

export const packageValidationRules = {
  create: [
    body("name")
      .isString()
      .isLength({ min: 2 })
      .trim()
      .withMessage("Name must be at least 2 characters long"),
    body("description")
      .isString()
      .notEmpty()
      .trim()
      .withMessage("Description is required"),
    body("pricePerPax")
      .isFloat({ min: 0 })
      .withMessage("Price per pax must be a positive number"),
    body("minimumPax")
      .isInt({ min: 1 })
      .withMessage("Minimum pax must be a positive integer"),
    body("recommendedPax")
      .isInt({ min: 1 })
      .withMessage("Recommended pax must be a positive integer"),
    body("maximumPax")
      .isInt({ min: 1 })
      .withMessage("Maximum pax must be a positive integer"),
    body("serviceHours")
      .isInt({ min: 1 })
      .withMessage("Service hours must be a positive integer"),
    body("serviceCharge")
      .isFloat({ min: 0 })
      .withMessage("Service charge must be a positive number"),
    body("options").isArray().withMessage("Options must be an array"),
    body("options.*.category")
      .isString()
      .notEmpty()
      .withMessage("Option category is required"),
    body("options.*.count")
      .isInt({ min: 1 })
      .withMessage("Option count must be a positive integer"),
    body("inclusions")
      .isString()
      .notEmpty()
      .withMessage("Inclusions are required"),
    body("imageUrl").isString().notEmpty().withMessage("Image URL is required"),
    body("rating")
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5"),
    body("ratingCount")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Rating count must be a positive integer"),
    validateRequest,
  ],
  update: [
    body("name")
      .optional()
      .isString()
      .isLength({ min: 2 })
      .trim()
      .withMessage("Name must be at least 2 characters long"),
    body("description")
      .optional()
      .isString()
      .notEmpty()
      .trim()
      .withMessage("Description is required"),
    body("pricePerPax")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Price per pax must be a positive number"),
    body("minimumPax")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Minimum pax must be a positive integer"),
    body("recommendedPax")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Recommended pax must be a positive integer"),
    body("maximumPax")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Maximum pax must be a positive integer"),
    body("serviceHours")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Service hours must be a positive integer"),
    body("serviceCharge")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Service charge must be a positive number"),
    body("options")
      .optional()
      .isArray()
      .withMessage("Options must be an array"),
    body("options.*.category")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Option category is required"),
    body("options.*.count")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Option count must be a positive integer"),
    body("inclusions")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Inclusions are required"),
    body("imageUrl")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Image URL is required"),
    body("rating")
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5"),
    body("ratingCount")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Rating count must be a positive integer"),
    validateRequest,
  ],
};
