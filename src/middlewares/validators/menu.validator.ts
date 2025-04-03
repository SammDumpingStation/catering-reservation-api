import { body } from "express-validator";
import { validateRequest } from "../validate-request.middleware.js";
import { FOOD_ALLERGENS, FOOD_CATEGORIES } from "@TStypes/global.type.js";
import { NextFunction } from "express";

// Add a custom middleware to log the request body
const logRequestBody = (req: Request, res: Response, next: NextFunction) => {
  console.log("Request body:", JSON.stringify(req.body, null, 2));
  next();
};

export const menuValidationRules = {
  create: [
    body("name")
      .notEmpty()
      .withMessage("Please provide menu name")
      .bail()
      .isString()
      .withMessage("Menu name must be a String")
      .bail()
      .trim()
      .isLength({ min: 5 })
      .withMessage("Menu name must at be at least 5 characters long"),

    body("category")
      .notEmpty()
      .withMessage("Please provide menu category")
      .bail()
      .isString()
      .withMessage("Menu category must be a String")
      .bail()
      .trim()
      .isIn(FOOD_CATEGORIES)
      .withMessage(`Category must be one of: ${FOOD_CATEGORIES.join(", ")}`),

    body("available")
      .notEmpty()
      .withMessage("Please provide whether the menu is available or not")
      .bail()
      .isBoolean()
      .withMessage("Menu availability must be a Boolean"),

    body("spicy")
      .notEmpty()
      .withMessage("Please provide whether the menu is spicy or not")
      .bail()
      .isBoolean()
      .withMessage("Menu spiceness must be a Boolean"),

    body("shortDescription")
      .notEmpty()
      .withMessage("Please provide short description")
      .bail()
      .isString()
      .withMessage("Short Description must be a String")
      .bail()
      .trim()
      .isLength({ min: 10, max: 200 })
      .withMessage(
        "Short description must be between 10 and 200 characters long"
      ),

    body("fullDescription")
      .notEmpty()
      .withMessage("Please provide full description")
      .bail()
      .isString()
      .withMessage("Full Description must be a String")
      .bail()
      .trim()
      .isLength({ min: 20, max: 500 })
      .withMessage(
        "Full description must be between 20 and 500 characters long"
      ),

    body("ingredients")
      .isArray({ min: 1 })
      .withMessage("Ingredients must be an array with at least one item"),

    body("ingredients.*")
      .isString()
      .withMessage("Each ingredient must be a string"),

    body("allergens").isArray().withMessage("Allergens must be an array"),

    body("allergens.*")
      .isIn(FOOD_ALLERGENS)
      .withMessage(
        `Each allergen must be one of: ${FOOD_ALLERGENS.join(", ")}`
      ),

    body("preparationMethod")
      .notEmpty()
      .withMessage("Please provide preparation method")
      .bail()
      .isString()
      .withMessage("Preparation method must be a String")
      .bail()
      .isLength({ min: 20, max: 500 })
      .withMessage(
        "Preparation method must be between 20 and 50 characters long"
      ),

    body("regularPricePerPax")
      .notEmpty()
      .withMessage("Please provide regular price per pax")
      .bail()
      .isFloat({ min: 0 })
      .withMessage("Regular price per pax must be a positive number"),

    body("prices")
      .isArray({ min: 1 })
      .withMessage("Prices must be an array with at least 1 price option"),

    body("prices.*.minimumPax")
      .notEmpty()
      .withMessage((value, { path }) => {
        const match = path.match(/prices\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Please provide minimum pax for price option ${index + 1}`;
      })
      .bail()
      .isInt({ min: 1 })
      .withMessage((value, { path }) => {
        const match = path.match(/prices\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Minimum pax for price option ${
          index + 1
        } must be a postive integer`;
      }),

    body("prices.*.maximumPax")
      .notEmpty()
      .withMessage((value, { path }) => {
        const match = path.match(/prices\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Please provide maximum pax for price option ${index + 1}`;
      })
      .bail()
      .isInt({ min: 1 })
      .withMessage((value, { path }) => {
        const match = path.match(/prices\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Maximum pax for price option ${
          index + 1
        } must be a positive integer`;
      })
      .bail()
      .custom((value, { req, path }) => {
        // Extract the index from the path
        const match = path.match(/prices\[(\d+)\]/);
        if (!match) return true;

        const index = Number.parseInt(match[1]);
        if (!req.body.prices || !req.body.prices[index]) return true;

        const minPax = req.body.prices[index].minimumPax;
        if (value < minPax) {
          throw new Error(
            `Maximum pax for price option ${
              index + 1
            } must be greater than or equal to minimum pax`
          );
        }
        return true;
      }),

    body("prices.*.price")
      .notEmpty()
      .withMessage((value, { path }) => {
        const match = path.match(/prices\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Please provide price for price option ${index + 1}`;
      })
      .bail()
      .isFloat({ min: 0 })
      .withMessage((value, { path }) => {
        const match = path.match(/prices\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Price for price option ${index + 1} must be a positive number`;
      }),

    body("prices.*.discount")
      .notEmpty()
      .withMessage((value, { path }) => {
        const match = path.match(/prices\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Please provide discount for price option ${index + 1}`;
      })
      .bail()
      .isFloat({ min: 0, max: 1 })
      .withMessage((value, { req, path }) => {
        // Extract the index from the path to get the specific price range
        const match = path.match(/prices\[(\d+)\]/);
        if (!match) return "Discount must be between 0 and 1";

        const index = Number.parseInt(match[1]);
        if (!req.body.prices || !req.body.prices[index])
          return `Discount for price option ${
            index + 1
          } must be between 0 and 1`;

        const minPax = req.body.prices[index].minimumPax;
        const maxPax = req.body.prices[index].maximumPax;

        if (minPax && maxPax) {
          return `Discount for price option ${
            index + 1
          } (${minPax} to ${maxPax} pax) must be between 0 and 1`;
        } else {
          return `Discount for price option ${
            index + 1
          } must be between 0 and 1`;
        }
      }),

    body("imageUrl")
      .notEmpty()
      .withMessage("Please provide an image URL")
      .bail()
      .isString()
      .withMessage("Image URL must be a String")
      .bail()
      .trim()
      .isURL() // Validates if the value is a valid URL
      .withMessage("Image URL must be a valid URL"),

    body("perServing")
      .notEmpty()
      .withMessage("Please provide serving size information")
      .bail()
      .isString()
      .withMessage("Per serving must be a valid String"),

    body("nutritionInfo").optional(),

    body("nutritionInfo.calories")
      .optional()
      .isString()
      .withMessage("Calories should be a valid String")
      .bail()
      .matches(/\d+\s*kcal/)
      .withMessage(
        "Calories should include a number followed by 'kcal' (e.g., '25 kcal')"
      ),

    body("nutritionInfo.protein")
      .optional()
      .isString()
      .withMessage("Protein should be a valid String")
      .bail()
      .matches(/\d+\s*g/)
      .withMessage(
        "Protein should include a number followed by 'g' (e.g., '5g')"
      ),

    body("nutritionInfo.fat")
      .optional()
      .isString()
      .withMessage("Fat should be a valid String")
      .bail()
      .matches(/\d+\s*g/)
      .withMessage("Fat should include a number followed by 'g' (e.g., '6g')"),

    body("nutritionInfo.carbs")
      .optional()
      .isString()
      .withMessage("Carbohydrate should be a valid String")
      .bail()
      .matches(/\d+\s*g/)
      .withMessage(
        "Carbs should include a number followed by 'g' (e.g., '10g')"
      ),

    body("nutritionInfo.sodium")
      .optional()
      .isString()
      .withMessage("Sodium should be a valid String")
      .bail()
      .matches(/\d+\s*(mg|g)/)
      .withMessage(
        "Sodium should include a number followed by 'mg' or 'g' (e.g., '200mg')"
      ),

    body("nutritionInfo.fiber")
      .optional()
      .isString()
      .withMessage("Fiber should be a valid String")
      .bail()
      .matches(/\d+\s*g/)
      .withMessage(
        "Fiber should include a number followed by 'g' (e.g., '2g')"
      ),

    body("nutritionInfo.sugar")
      .optional()
      .isString()
      .withMessage("Sugar should be a valid String")
      .bail()
      .matches(/\d+\s*g/)
      .withMessage(
        "Sugar should include a number followed by 'g' (e.g., '3g')"
      ),

    body("nutritionInfo.cholesterol")
      .optional()
      .isString()
      .withMessage("Cholesterol ories should be a valid String")
      .bail()
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
      .isIn(FOOD_CATEGORIES)
      .withMessage(`Category must be one of: ${FOOD_CATEGORIES.join(", ")}`),

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
      .isIn(FOOD_ALLERGENS)
      .withMessage(
        `Each allergen must be one of: ${FOOD_ALLERGENS.join(", ")}`
      ),
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
