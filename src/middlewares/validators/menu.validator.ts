import { body } from "express-validator";
import { validateRequest } from "../validate-request.middleware.js";
import { ALLERGENS, CATEGORIES } from "@TStypes/menu.type.js";

export const menuValidationRules = {
  create: [
    body("name").isString().notEmpty().withMessage("Please provide menu name"),
    body("category")
      .isString()
      .isIn(CATEGORIES)
      .withMessage(`Category must be one of: ${CATEGORIES.join(", ")}`),
    body("available").optional().isBoolean(),
    body("shortDescription")
      .isString()
      .notEmpty()
      .withMessage("Please provide a short description"),
    body("fullDescription")
      .isString()
      .notEmpty()
      .withMessage("Please provide a full description"),
    body("ingredients").isArray().withMessage("Ingredients must be an array"),
    body("ingredients.*")
      .isString()
      .withMessage("Each ingredient must be a string"),
    body("allergens")
      .optional()
      .isArray()
      .withMessage("Allergens must be an array"),
    body("allergens.*")
      .optional()
      .isIn(ALLERGENS)
      .withMessage(`Each allergen must be one of: ${ALLERGENS.join(", ")}`),
    body("preparationMethod")
      .isString()
      .notEmpty()
      .withMessage("Please provide preparation method"),
    body("prices").isArray().withMessage("Prices must be an array"),
    body("prices.*.minimumPax")
      .isInt({ min: 1 })
      .withMessage("Minimum pax must be a positive integer"),
    body("prices.*.maximumPax")
      .isInt({ min: 1 })
      .withMessage("Maximum pax must be a positive integer"),
    body("prices.*.price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("regularPricePerPax")
      .isFloat({ min: 0 })
      .withMessage("Regular price per pax must be a positive number"),
    body("imageUrl")
      .isString()
      .notEmpty()
      .withMessage("Please provide an image URL"),
    body("rating")
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5"),
    body("ratingCount")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Rating count must be a positive integer"),
    body("spicy").optional().isBoolean(),
    body("perServing")
      .isString()
      .notEmpty()
      .withMessage("Please provide serving size information"),

    // Enhanced nutritionInfo validation with unit checking
    body("nutritionInfo").optional(),
    body("nutritionInfo.calories")
      .optional()
      .isString()
      .matches(/\d+\s*kcal/)
      .withMessage(
        "Calories should include a number followed by 'kcal' (e.g., '25 kcal')"
      ),
    body("nutritionInfo.protein")
      .optional()
      .isString()
      .matches(/\d+\s*g/)
      .withMessage(
        "Protein should include a number followed by 'g' (e.g., '5g')"
      ),
    body("nutritionInfo.fat")
      .optional()
      .isString()
      .matches(/\d+\s*g/)
      .withMessage("Fat should include a number followed by 'g' (e.g., '6g')"),
    body("nutritionInfo.carbs")
      .optional()
      .isString()
      .matches(/\d+\s*g/)
      .withMessage(
        "Carbs should include a number followed by 'g' (e.g., '10g')"
      ),
    body("nutritionInfo.sodium")
      .optional()
      .isString()
      .matches(/\d+\s*(mg|g)/)
      .withMessage(
        "Sodium should include a number followed by 'mg' or 'g' (e.g., '200mg')"
      ),
    body("nutritionInfo.fiber")
      .optional()
      .isString()
      .matches(/\d+\s*g/)
      .withMessage(
        "Fiber should include a number followed by 'g' (e.g., '2g')"
      ),
    body("nutritionInfo.sugar")
      .optional()
      .isString()
      .matches(/\d+\s*g/)
      .withMessage(
        "Sugar should include a number followed by 'g' (e.g., '3g')"
      ),
    body("nutritionInfo.cholesterol")
      .optional()
      .isString()
      .matches(/\d+\s*(mg|g)/)
      .withMessage(
        "Cholesterol should include a number followed by 'mg' or 'g' (e.g., '5mg')"
      ),
    validateRequest,
  ],
  update: [
    body("name")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Please provide menu name"),
    body("category")
      .optional()
      .isString()
      .isIn(CATEGORIES)
      .withMessage(`Category must be one of: ${CATEGORIES.join(", ")}`),
    body("available").optional().isBoolean(),
    body("shortDescription")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Please provide a short description"),
    body("fullDescription")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Please provide a full description"),
    body("ingredients")
      .optional()
      .isArray()
      .withMessage("Ingredients must be an array"),
    body("ingredients.*")
      .optional()
      .isString()
      .withMessage("Each ingredient must be a string"),
    body("allergens")
      .optional()
      .isArray()
      .withMessage("Allergens must be an array"),
    body("allergens.*")
      .optional()
      .isIn(ALLERGENS)
      .withMessage(`Each allergen must be one of: ${ALLERGENS.join(", ")}`),
    body("preparationMethod")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Please provide preparation method"),
    body("prices").optional().isArray().withMessage("Prices must be an array"),
    body("prices.*.minimumPax")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Minimum pax must be a positive integer"),
    body("prices.*.maximumPax")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Maximum pax must be a positive integer"),
    body("prices.*.price")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("regularPricePerPax")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Regular price per pax must be a positive number"),
    body("imageUrl")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Please provide an image URL"),
    body("rating")
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5"),
    body("ratingCount")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Rating count must be a positive integer"),
    body("spicy").optional().isBoolean(),
    body("perServing")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Please provide serving size information"),

    // Enhanced nutritionInfo validation with unit checking for update
    body("nutritionInfo").optional(),
    body("nutritionInfo.calories")
      .optional()
      .isString()
      .matches(/\d+\s*kcal/)
      .withMessage(
        "Calories should include a number followed by 'kcal' (e.g., '25 kcal')"
      ),
    body("nutritionInfo.protein")
      .optional()
      .isString()
      .matches(/\d+\s*g/)
      .withMessage(
        "Protein should include a number followed by 'g' (e.g., '5g')"
      ),
    body("nutritionInfo.fat")
      .optional()
      .isString()
      .matches(/\d+\s*g/)
      .withMessage("Fat should include a number followed by 'g' (e.g., '6g')"),
    body("nutritionInfo.carbs")
      .optional()
      .isString()
      .matches(/\d+\s*g/)
      .withMessage(
        "Carbs should include a number followed by 'g' (e.g., '10g')"
      ),
    body("nutritionInfo.sodium")
      .optional()
      .isString()
      .matches(/\d+\s*(mg|g)/)
      .withMessage(
        "Sodium should include a number followed by 'mg' or 'g' (e.g., '200mg')"
      ),
    body("nutritionInfo.fiber")
      .optional()
      .isString()
      .matches(/\d+\s*g/)
      .withMessage(
        "Fiber should include a number followed by 'g' (e.g., '2g')"
      ),
    body("nutritionInfo.sugar")
      .optional()
      .isString()
      .matches(/\d+\s*g/)
      .withMessage(
        "Sugar should include a number followed by 'g' (e.g., '3g')"
      ),
    body("nutritionInfo.cholesterol")
      .optional()
      .isString()
      .matches(/\d+\s*(mg|g)/)
      .withMessage(
        "Cholesterol should include a number followed by 'mg' or 'g' (e.g., '5mg')"
      ),
    validateRequest,
  ],
};
