import { body } from "express-validator";
import { validateRequest } from "@middlewares/validate-request.middleware.js";

export const businessSettingsValidationRules = {
  udpdate: [
    body("businessName")
      .notEmpty()
      .withMessage("Please provide business name")
      .bail()
      .isString()
      .withMessage("Business name must be a String")
      .bail()
      .trim()
      .isLength({ min: 5 })
      .withMessage("Business name must at be at least 5 characters long"),

    body("map.link")
      .notEmpty()
      .withMessage("Please provide map link URL")
      .bail()
      .isURL()
      .withMessage("Link URL must be a valid URL")
      .bail()
      .custom(
        (url) =>
          url.includes("google.com/maps") || url.includes("maps.app.goo.gl")
      )
      .withMessage("Link must be a valid Google Maps URL"),

    body("map.embeddedLink")
      .notEmpty()
      .withMessage("Please provide map embedded link URL")
      .bail()
      .isURL()
      .withMessage("Embedded link must be a valid URL")
      .bail()
      .custom((url) => url.includes("google.com/maps/embed"))
      .withMessage("Embedded link must be a valid embedded Google Maps URL"),

    body("map.address")
      .notEmpty()
      .withMessage("Please provide map address")
      .bail()
      .isString()
      .withMessage("Map address must be a String")
      .bail()
      .trim()
      .isLength({ min: 5 })
      .withMessage("Business address must at be at least 5 characters long"),

    body("systemName")
      .notEmpty()
      .withMessage("Please provide system name")
      .bail()
      .isString()
      .withMessage("System name must be a String")
      .bail()
      .trim()
      .isLength({ min: 5 })
      .withMessage("System name must at be at least 5 characters long"),

    body("tagline")
      .notEmpty()
      .withMessage("Please provide tagline")
      .bail()
      .isString()
      .withMessage("Tagline be a String")
      .bail()
      .trim()
      .isLength({ min: 5 })
      .withMessage("Tagline must at be at least 5 characters long"),

    body("businessHours")
      .notEmpty()
      .withMessage("Please provide business hours")
      .bail()
      .isString()
      .withMessage("Business hours be a String")
      .bail()
      .trim()
      .isLength({ min: 5 })
      .withMessage("Business hours must at be at least 5 characters long"),

    body("businessDays")
      .notEmpty()
      .withMessage("Please provide business days")
      .bail()
      .isString()
      .withMessage("Business days be a String")
      .bail()
      .trim()
      .isLength({ min: 5 })
      .withMessage("Business days must at be at least 5 characters long"),

    body("socialMediaLinks")
      .isArray()
      .withMessage("Social media links must be an array"),

    body("socialMediaLinks.*.platform")
      .notEmpty()
      .withMessage("Please provide social media platform")
      .bail()
      .isString()
      .withMessage("Social media platform be a String")
      .bail()
      .trim()
      .isLength({ min: 5 })
      .withMessage(
        "Social media platform must at be at least 5 characters long"
      ),

    body("socialMediaLinks.*.url")
      .notEmpty()
      .withMessage("Please provide social media URL")
      .bail()
      .trim()
      .isURL()
      .withMessage("Invalid URL"),

    validateRequest,
  ],
};
