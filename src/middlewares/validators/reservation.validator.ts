import { body } from "express-validator";
import { validateRequest } from "../validate-request.middleware.js";
import { statusEnums } from "@TStypes/global.type.js";
import {
  beefOptions,
  beverageOptions,
  chickenOptions,
  dessertOptions,
  noodleOptions,
  porkOptions,
  saladOptions,
  seafoodOptions,
  soupOptions,
  vegetableOptions,
} from "@TStypes/reservation.type.js";

export const reservationValidationRules = {
  create: [
    // Customer Details
    body("customerDetails.firstName")
      .isString()
      .isLength({ min: 2, max: 50 })
      .trim()
      .withMessage("First name must be between 2 and 50 characters"),
    body("customerDetails.lastName")
      .isString()
      .isLength({ min: 2, max: 50 })
      .trim()
      .withMessage("Last name must be between 2 and 50 characters"),
    body("customerDetails.email")
      .isEmail()
      .withMessage("Please provide a valid email address")
      .normalizeEmail(),
    body("customerDetails.contactNumber")
      .isNumeric()
      .withMessage("Contact number must be numeric"),

    // Event Details
    body("eventDetails.type").optional().isString(),
    body("eventDetails.date")
      .isISO8601()
      .withMessage("Please provide a valid event date"),
    body("eventDetails.time")
      .isISO8601()
      .withMessage("Please provide a valid event time"),
    body("eventDetails.numberOfGuests")
      .isInt({ min: 30 })
      .withMessage("Number of guests must be at least 30"),
    body("eventDetails.venue")
      .isString()
      .notEmpty()
      .withMessage("Please provide the venue"),
    body("eventDetails.serviceType")
      .isIn(["Plated Service", "Buffet"])
      .withMessage("Service type must be either 'Plated Service' or 'Buffet'"),
    body("eventDetails.serviceHours")
      .isIn([4, 5, 6, 8, 10])
      .withMessage("Service hours must be one of: 4, 5, 6, 8, or 10"),

    // Menu Selection
    body("menuSelection.soupOptions").optional().isArray(),
    body("menuSelection.soupOptions.*")
      .optional()
      .isIn(soupOptions)
      .withMessage(`Soup option must be one of: ${soupOptions.join(", ")}`),

    body("menuSelection.saladOptions").optional().isArray(),
    body("menuSelection.saladOptions.*")
      .optional()
      .isIn(saladOptions)
      .withMessage(`Salad option must be one of: ${saladOptions.join(", ")}`),

    body("menuSelection.chickenOptions").optional().isArray(),
    body("menuSelection.chickenOptions.*")
      .optional()
      .isIn(chickenOptions)
      .withMessage(
        `Chicken option must be one of: ${chickenOptions.join(", ")}`
      ),

    body("menuSelection.porkOptions").optional().isArray(),
    body("menuSelection.porkOptions.*")
      .optional()
      .isIn(porkOptions)
      .withMessage(`Pork option must be one of: ${porkOptions.join(", ")}`),

    body("menuSelection.beefOptions").optional().isArray(),
    body("menuSelection.beefOptions.*")
      .optional()
      .isIn(beefOptions)
      .withMessage(`Beef option must be one of: ${beefOptions.join(", ")}`),

    body("menuSelection.seafoodOptions").optional().isArray(),
    body("menuSelection.seafoodOptions.*")
      .optional()
      .isIn(seafoodOptions)
      .withMessage(
        `Seafood option must be one of: ${seafoodOptions.join(", ")}`
      ),

    body("menuSelection.vegetableOptions").optional().isArray(),
    body("menuSelection.vegetableOptions.*")
      .optional()
      .isIn(vegetableOptions)
      .withMessage(
        `Vegetable option must be one of: ${vegetableOptions.join(", ")}`
      ),

    body("menuSelection.noodleOptions").optional().isArray(),
    body("menuSelection.noodleOptions.*")
      .optional()
      .isIn(noodleOptions)
      .withMessage(`Noodle option must be one of: ${noodleOptions.join(", ")}`),

    body("menuSelection.dessertOptions").optional().isArray(),
    body("menuSelection.dessertOptions.*")
      .optional()
      .isIn(dessertOptions)
      .withMessage(
        `Dessert option must be one of: ${dessertOptions.join(", ")}`
      ),

    body("menuSelection.beverageOptions").optional().isArray(),
    body("menuSelection.beverageOptions.*")
      .optional()
      .isIn(beverageOptions)
      .withMessage(
        `Beverage option must be one of: ${beverageOptions.join(", ")}`
      ),

    // Special Requests
    body("specialRequests").optional().isString().trim(),

    // Cost Details
    body("costDetails.totalReservationCost")
      .isFloat({ min: 0 })
      .withMessage("Total reservation cost must be a positive number"),
    body("costDetails.minimumDownPayment")
      .isFloat({ min: 0 })
      .withMessage("Minimum down payment must be a positive number"),
    body("costDetails.downPaymentPaid")
      .isFloat({ min: 0 })
      .withMessage("Down payment paid must be a positive number"),

    // Status
    body("status")
      .optional()
      .isIn(statusEnums)
      .withMessage(`Status must be one of: ${statusEnums.join(", ")}`),
    body("paymentStatus")
      .optional()
      .isIn(statusEnums)
      .withMessage(`Payment status must be one of: ${statusEnums.join(", ")}`),

    validateRequest,
  ],
  update: [
    // Customer Details
    body("customerDetails.firstName")
      .optional()
      .isString()
      .isLength({ min: 2, max: 50 })
      .trim()
      .withMessage("First name must be between 2 and 50 characters"),
    body("customerDetails.lastName")
      .optional()
      .isString()
      .isLength({ min: 2, max: 50 })
      .trim()
      .withMessage("Last name must be between 2 and 50 characters"),
    body("customerDetails.email")
      .optional()
      .isEmail()
      .withMessage("Please provide a valid email address")
      .normalizeEmail(),
    body("customerDetails.contactNumber")
      .optional()
      .isNumeric()
      .withMessage("Contact number must be numeric"),

    // Event Details
    body("eventDetails.type").optional().isString(),
    body("eventDetails.date")
      .optional()
      .isISO8601()
      .withMessage("Please provide a valid event date"),
    body("eventDetails.time")
      .optional()
      .isISO8601()
      .withMessage("Please provide a valid event time"),
    body("eventDetails.numberOfGuests")
      .optional()
      .isInt({ min: 30 })
      .withMessage("Number of guests must be at least 30"),
    body("eventDetails.venue")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Please provide the venue"),
    body("eventDetails.serviceType")
      .optional()
      .isIn(["Plated Service", "Buffet"])
      .withMessage("Service type must be either 'Plated Service' or 'Buffet'"),
    body("eventDetails.serviceHours")
      .optional()
      .isIn([4, 5, 6, 8, 10])
      .withMessage("Service hours must be one of: 4, 5, 6, 8, or 10"),

    // Menu Selection (all optional for updates)
    body("menuSelection.soupOptions").optional().isArray(),
    body("menuSelection.saladOptions").optional().isArray(),
    body("menuSelection.chickenOptions").optional().isArray(),
    body("menuSelection.porkOptions").optional().isArray(),
    body("menuSelection.beefOptions").optional().isArray(),
    body("menuSelection.seafoodOptions").optional().isArray(),
    body("menuSelection.vegetableOptions").optional().isArray(),
    body("menuSelection.noodleOptions").optional().isArray(),
    body("menuSelection.dessertOptions").optional().isArray(),
    body("menuSelection.beverageOptions").optional().isArray(),

    // Special Requests
    body("specialRequests").optional().isString().trim(),

    // Cost Details
    body("costDetails.totalReservationCost")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Total reservation cost must be a positive number"),
    body("costDetails.minimumDownPayment")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Minimum down payment must be a positive number"),
    body("costDetails.downPaymentPaid")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Down payment paid must be a positive number"),

    // Status
    body("status")
      .optional()
      .isIn(statusEnums)
      .withMessage(`Status must be one of: ${statusEnums.join(", ")}`),
    body("paymentStatus")
      .optional()
      .isIn(statusEnums)
      .withMessage(`Payment status must be one of: ${statusEnums.join(", ")}`),

    validateRequest,
  ],
};
