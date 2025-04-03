import { body } from "express-validator";
import { validateRequest } from "../validate-request.middleware.js";
import { FOOD_CATEGORIES } from "@TStypes/global.type.js";

export const packageValidationRules = {
  create: [
    body("name")
      .notEmpty()
      .withMessage("Please provide package name")
      .bail()
      .isString()
      .withMessage("Package name must be a String")
      .bail()
      .trim()
      .isLength({ min: 5 })
      .withMessage("Package name must at be at least 5 characters long"),

    body("description")
      .notEmpty()
      .withMessage("Please provide the package description")
      .bail()
      .isString()
      .withMessage("Description must be a String")
      .bail()
      .trim()
      .isLength({ min: 10, max: 200 })
      .withMessage("Description must be between 10 and 200 characters long"),

    body("available")
      .notEmpty()
      .withMessage("Please provide whether the package is available or not")
      .bail()
      .isBoolean()
      .withMessage("Package availability must be a Boolean"),

    body("pricePerPax")
      .notEmpty()
      .withMessage("Please provide price per pax")
      .bail()
      .isFloat({ min: 0 })
      .withMessage("Price per pax must be a positive number"),

    body("pricePerPaxWithServiceCharge")
      .notEmpty()
      .withMessage("Please provide a price per pax with service charge")
      .bail()
      .isFloat({ min: 0 })
      .withMessage(
        "Price per pax with service charge must be a positive number"
      )
      .bail()
      .custom((value, { req }) => {
        if (parseFloat(value) <= parseFloat(req.body.pricePerPax)) {
          throw new Error(
            "Price per pax with service charge must be greater than price per pax"
          );
        }
        return true;
      }),

    body("minimumPax")
      .notEmpty()
      .withMessage("Please provide a minimum pax")
      .bail()
      .isInt({ min: 1 })
      .withMessage("Minimum pax must be at least 1"),

    body("recommendedPax")
      .notEmpty()
      .withMessage("Please provide a recommended pax")
      .bail()
      .isInt({ min: 1 })
      .withMessage("Recommended pax must be a positive integer")
      .custom((value, { req }) => {
        if (parseInt(value) <= parseInt(req.body.minimumPax))
          throw new Error("Recommended pax must be greater than minimum pax");

        if (parseInt(value) >= parseInt(req.body.maximumPax))
          throw new Error("Recommended pax must be less than maximum pax");

        return true;
      }),

    body("maximumPax")
      .notEmpty()
      .withMessage("Please provide a maximum pax")
      .bail()
      .isInt({ min: 1 })
      .withMessage("Maximum pax must be a positive integer")
      .bail()
      .custom((value, { req }) => {
        if (parseInt(value) <= parseInt(req.body.minimumPax)) {
          throw new Error("Maximum pax must be greater than minimum pax");
        }
        if (parseInt(value) <= parseInt(req.body.recommendedPax)) {
          throw new Error("Maximum pax must be greater than recommended pax");
        }
        return true;
      }),

    body("options")
      .isArray({ min: 1 })
      .withMessage("Options must be an array with at least 1 value"),

    body("options.*.category")
      .notEmpty()
      .withMessage((value, { path }) => {
        const match = path.match(/options\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Please provide category in options index ${index + 1}`;
      })
      .bail()
      .isString()
      .withMessage((value, { path }) => {
        const match = path.match(/options\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Category in options index ${index + 1} must be a String`;
      })
      .bail()
      .trim()
      .isIn(FOOD_CATEGORIES)
      .withMessage((value, { path }) => {
        const match = path.match(/options\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Category in options index ${
          index + 1
        } must be one of: ${FOOD_CATEGORIES.join(", ")}`;
      }),

    body("options.*.count")
      .notEmpty()
      .withMessage((value, { path }) => {
        const match = path.match(/options\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Please provide count for category in options index ${
          index + 1
        }`;
      })
      .bail()
      .isInt({ min: 1 })
      .withMessage((value, { path }) => {
        const match = path.match(/options\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Count for category in options index ${
          index + 1
        } must be atleast 1`;
      }),

    body("inclusions")
      .isArray({ min: 1 })
      .withMessage("Inclusions must be an array with at least 1 value"),

    body("inclusions.*.typeOfCustomer")
      .notEmpty()
      .withMessage((value, { path }) => {
        const match = path.match(/inclusions\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Please provide type of customer in inclusions index ${
          index + 1
        }`;
      })
      .bail()
      .isString()
      .withMessage((value, { path }) => {
        const match = path.match(/inclusions\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Type of customer in inclusions index ${
          index + 1
        } must be a String`;
      })
      .bail()
      .trim()
      .isIn(["Both", "Buffet", "Plated"])
      .withMessage((value, { path }) => {
        const match = path.match(/inclusions\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Type of customer in inclusions index ${
          index + 1
        } must be one of: Both, Buffet, Plated`;
      }),

    body("inclusions.*.includes")
      .notEmpty()
      .withMessage((value, { path }) => {
        const match = path.match(/inclusions\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Please provide the service included in inclusions index ${
          index + 1
        }`;
      })
      .bail()
      .isString()
      .withMessage((value, { path }) => {
        const match = path.match(/inclusions\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Service included in inclusions index ${
          index + 1
        } must be a String`;
      })
      .bail()
      .trim()
      .isLength({ min: 5 })
      .withMessage((value, { path }) => {
        const match = path.match(/inclusions\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Service included in inclusions index ${
          index + 1
        } must be at least 5 characters`;
      }),

    body("serviceHours")
      .notEmpty()
      .withMessage("Please provide service hours")
      .bail()
      .isFloat({ min: 0 })
      .withMessage("Service hours must be a positive number"),

    body("serviceCharge")
      .notEmpty()
      .withMessage("Please provide a service charge")
      .bail()
      .isFloat({ min: 0 })
      .withMessage("Service charge must be a positive number"),

    body("eventType").custom((value, { req }) => {
      if (req.body.packageType === "Event") {
        if (!value)
          throw new Error(
            "Please provide the event type for the event package"
          );

        if (
          typeof value !== "string" ||
          !["Birthday", "Wedding", "Corporate", "Graduation"].includes(
            value.trim()
          )
        )
          throw new Error(
            "Event type must be one of: Birthday, Wedding, Corporate, Graduation"
          );
      }
      return true;
    }),

    body("packageType")
      .notEmpty()
      .withMessage("Please provide the package type")
      .bail()
      .isString()
      .withMessage("Pacakge type must be a String")
      .bail()
      .trim()
      .isIn(["BuffetPlated", "Event"])
      .withMessage(`Package type must be one of: BuffetPlated, Event`),

    body("imageUrl")
      .optional()
      .isString()
      .withMessage("Image URL must be a String")
      .bail()
      .trim()
      .isURL() // Validates if the value is a valid URL
      .withMessage("Image URL must be a valid URL"),

    validateRequest,
  ],
  update: [
    body("name")
      .optional()
      .isString()
      .withMessage("Package name must be a String")
      .bail()
      .trim()
      .isLength({ min: 5 })
      .withMessage("Package name must at be at least 5 characters long"),

    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a String")
      .bail()
      .trim()
      .isLength({ min: 10, max: 200 })
      .withMessage("Description must be between 10 and 200 characters long"),

    body("available")
      .optional()
      .isBoolean()
      .withMessage("Package availability must be a Boolean"),

    body("pricePerPax")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Price per pax must be a positive number"),

    body("pricePerPaxWithServiceCharge")
      .optional()
      .isFloat({ min: 0 })
      .withMessage(
        "Price per pax with service charge must be a positive number"
      )
      .bail()
      .custom((value, { req }) => {
        const pricePerPax = req.body.pricePerPax;

        // If pricePerPax is provided in update, require pricePerPaxWithServiceCharge
        if (
          pricePerPax !== undefined &&
          (value === undefined || value === "")
        ) {
          throw new Error(
            "Price per pax with service charge is required when price per pax is updated"
          );
        }

        // Ensure pricePerPaxWithServiceCharge is greater than pricePerPax if both are present
        if (pricePerPax !== undefined && value !== undefined) {
          if (parseFloat(value) <= parseFloat(pricePerPax)) {
            throw new Error(
              "Price per pax with service charge must be greater than price per pax"
            );
          }
        }

        return true;
      }),

    body().custom((_, { req }) => {
      const fields = ["minimumPax", "recommendedPax", "maximumPax"];
      const providedFields = fields.filter((field) =>
        Object.prototype.hasOwnProperty.call(req.body, field)
      );

      if (providedFields.length > 0 && providedFields.length < 3) {
        throw new Error(
          "If updating pax fields, you must provide all: minimumPax, recommendedPax, and maximumPax"
        );
      }
      return true;
    }),

    body("minimumPax")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Minimum pax must be at least 1"),

    body("recommendedPax")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Recommended pax must be a positive integer")
      .custom((value, { req }) => {
        if (parseInt(value) <= parseInt(req.body?.minimumPax))
          throw new Error("Recommended pax must be greater than minimum pax");

        if (parseInt(value) >= parseInt(req.body?.maximumPax))
          throw new Error("Recommended pax must be less than maximum pax");

        return true;
      }),

    body("maximumPax")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Maximum pax must be a positive integer")
      .bail()
      .custom((value, { req }) => {
        if (parseInt(value) <= parseInt(req.body.minimumPax)) {
          throw new Error("Maximum pax must be greater than minimum pax");
        }
        if (parseInt(value) <= parseInt(req.body.recommendedPax)) {
          throw new Error("Maximum pax must be greater than recommended pax");
        }
        return true;
      }),

    body("options")
      .optional()
      .isArray({ min: 1 })
      .withMessage("Options must be an array with at least 1 value"),

    body("options.*.category")
      .notEmpty()
      .withMessage((value, { path }) => {
        const match = path.match(/options\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Please provide category in options index ${index + 1}`;
      })
      .bail()
      .isString()
      .withMessage((value, { path }) => {
        const match = path.match(/options\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Category in options index ${index + 1} must be a String`;
      })
      .bail()
      .trim()
      .isIn(FOOD_CATEGORIES)
      .withMessage((value, { path }) => {
        const match = path.match(/options\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Category in options index ${
          index + 1
        } must be one of: ${FOOD_CATEGORIES.join(", ")}`;
      }),

    body("options.*.count")
      .notEmpty()
      .withMessage((value, { path }) => {
        const match = path.match(/options\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Please provide count for category in options index ${
          index + 1
        }`;
      })
      .bail()
      .isInt({ min: 1 })
      .withMessage((value, { path }) => {
        const match = path.match(/options\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Count for category in options index ${
          index + 1
        } must be atleast 1`;
      }),

    body("inclusions")
      .optional()
      .isArray({ min: 1 })
      .withMessage("Inclusions must be an array with at least 1 value"),

    body("inclusions.*.typeOfCustomer")
      .notEmpty()
      .withMessage((value, { path }) => {
        const match = path.match(/inclusions\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Please provide type of customer in inclusions in index ${
          index + 1
        }`;
      })
      .bail()
      .isString()
      .withMessage((value, { path }) => {
        const match = path.match(/inclusions\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Type of customer in inclusions index ${
          index + 1
        } must be a String`;
      })
      .bail()
      .trim()
      .isIn(["Both", "Buffet", "Plated"])
      .withMessage((value, { path }) => {
        const match = path.match(/inclusions\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Type of customer in inclusions index ${
          index + 1
        } must be one of: Both, Buffet, Plated`;
      }),

    body("inclusions.*.includes")
      .notEmpty()
      .withMessage((value, { path }) => {
        const match = path.match(/inclusions\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Please provide the service included in inclusions index ${
          index + 1
        }`;
      })
      .bail()
      .isString()
      .withMessage((value, { path }) => {
        const match = path.match(/inclusions\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Service included in inclusions index ${
          index + 1
        } must be a String`;
      })
      .bail()
      .trim()
      .isLength({ min: 5 })
      .withMessage((value, { path }) => {
        const match = path.match(/inclusions\[(\d+)\]/);
        const index = match ? Number.parseInt(match[1]) : 0;
        return `Service included in inclusions index ${
          index + 1
        } must be at least 5 characters`;
      }),

    body("serviceHours")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Service hours must be a positive number"),

    body("serviceCharge")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Service charge must be a positive number"),

    body("eventType").custom((value, { req }) => {
      if (req.body.packageType === "Event") {
        if (!value)
          throw new Error(
            "Please provide the event type for the event package"
          );

        if (
          typeof value !== "string" ||
          !["Birthday", "Wedding", "Corporate", "Graduation"].includes(
            value.trim()
          )
        )
          throw new Error(
            "Event type must be one of: Birthday, Wedding, Corporate, Graduation"
          );
      }
      return true;
    }),

    body("packageType")
      .optional()
      .isString()
      .withMessage("Pacakge type must be a String")
      .bail()
      .trim()
      .isIn(["BuffetPlated", "Event"])
      .withMessage(`Package type must be one of: BuffetPlated, Event`),

    body("imageUrl")
      .optional()
      .isString()
      .withMessage("Image URL must be a String")
      .bail()
      .trim()
      .isURL() // Validates if the value is a valid URL
      .withMessage("Image URL must be a valid URL"),

    validateRequest,
  ],
};
