import {
  eventTypes,
  orderTypes,
  paxEnum,
  serviceHoursOptions,
  serviceTypes,
} from "@TStypes/reservation.type.js";
import { body } from "express-validator";

export const reservationValidationRules = {
  create: [
    body("fullName")
      .notEmpty()
      .withMessage("Please provide full name")
      .bail()
      .isString()
      .withMessage("Full Name must be a valid string")
      .bail()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Full Name must be between 2 and 50 characters"),

    body("email")
      .notEmpty()
      .withMessage("Please provide full name")
      .bail()
      .isEmail()
      .withMessage("Please provide a valid email address")
      .normalizeEmail(),

    body("contactNumber")
      .notEmpty()
      .withMessage("Please provide contact number")
      .bail()
      .isString()
      .withMessage("Contact Number must be a String")
      .bail()
      .trim()
      .matches(/^\+639\d{9}$/) // Matches Philippine phone numbers starting with '09' and followed by 9 digits
      .withMessage(
        "Contact number must start with +639 and must have 12 digits total"
      ),

    body("selectedPackage")
      .optional()
      .isMongoId()
      .withMessage("selectedPackage must be a valid MongoDB ObjectId"),

    body("selectedMenus")
      .notEmpty()
      .withMessage("selectedMenus is required")
      .bail()
      .custom((value) => {
        if (typeof value !== "object" || value === null) {
          throw new Error("selectedMenus must be an object");
        }
        for (const categoryKey in value) {
          const category = value[categoryKey];
          if (typeof category !== "object" || category === null) {
            throw new Error(`selectedMenus.${categoryKey} must be an object`);
          }
          for (const dishId in category) {
            const dish = category[dishId];
            if (typeof dish !== "object" || dish === null) {
              throw new Error(
                `selectedMenus.${categoryKey}.${dishId} must be an object`
              );
            }
            if (typeof dish.quantity !== "number" || dish.quantity < 1) {
              throw new Error(
                `selectedMenus.${categoryKey}.${dishId}.quantity must be a number >= 1`
              );
            }
            if (!paxEnum.includes(dish.paxSelected)) {
              throw new Error(
                `selectedMenus.${categoryKey}.${dishId}.paxSelected must be one of ${paxEnum.join(
                  ", "
                )}`
              );
            }
            if (typeof dish.pricePerPax !== "number" || dish.pricePerPax < 0) {
              throw new Error(
                `selectedMenus.${categoryKey}.${dishId}.pricePerPax must be a number >= 0`
              );
            }
          }
        }
        return true;
      }),

    body("eventType")
      .notEmpty()
      .withMessage("Event Type is required")
      .bail()
      .isString()
      .withMessage("Event Type must be a String")
      .bail()
      .isIn(eventTypes)
      .withMessage(`Event Type must be one of: ${eventTypes.join(", ")}`),

    body("guestCount")
      .notEmpty()
      .withMessage("Please provide guest count")
      .bail()
      .isInt({ min: 1 })
      .withMessage("Guest count must be a positive integer"),

    body("serviceType")
      .notEmpty()
      .withMessage("Please choose service type")
      .bail()
      .isString()
      .withMessage("Service Type must be a String")
      .bail()
      .isIn(serviceTypes)
      .withMessage(`Service Type must be one of: ${serviceTypes.join(", ")}`),

    body("orderType").custom((value, { req }) => {
      if (req.body.serviceType === "Buffet") {
        if (!value)
          throw new Error("Order type is required when service type is Buffet");

        if (typeof value !== "string")
          throw new Error("Order type must be a string");

        if (!orderTypes.includes(value))
          throw new Error(
            `Order type must be one of: ${orderTypes.join(", ")}`
          );
      }
      return true;
    }),

    body("reservationDate")
      .notEmpty()
      .withMessage("Reservation date is required")
      .bail()
      .isISO8601()
      .withMessage("Reservation date must be a valid date")
      .toDate(),

    body("reservationTime")
      .notEmpty()
      .withMessage("Reservation time is required")
      .bail()
      .isString()
      .withMessage("Reservation time must be a string")
      .bail()
      .custom((value) => {
        const timePattern = /^(0?[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/i;
        if (!timePattern.test(value)) {
          throw new Error("Time must be in hh:mm AM/PM format");
        }

        const [, hh, mm, period] = value.match(timePattern)!;
        let hours = parseInt(hh, 10);
        const minutes = parseInt(mm, 10);
        if (period.toUpperCase() === "PM" && hours !== 12) hours += 12;
        if (period.toUpperCase() === "AM" && hours === 12) hours = 0;
        const totalMinutes = hours * 60 + minutes;

        if (totalMinutes < 480 || totalMinutes > 1020) {
          throw new Error(
            "Food Sentinel is only open from 8:00 AM to 5:00 PM."
          );
        }

        return true;
      }),

    body("deliveryFee").custom((value, { req }) => {
      if (req.body.orderType === "Delivery") {
        if (value === undefined || value === null || value === "")
          throw new Error(
            "Delivery fee is required when order type is Delivery"
          );

        if (typeof value !== "number" && isNaN(Number(value)))
          throw new Error("Delivery fee must be a number");
      }
      return true;
    }),

    body("deliveryAddress").custom((value, { req }) => {
      if (req.body.orderType === "Delivery") {
        if (!value || value.trim() === "")
          throw new Error(
            "Delivery address is required when order type is Delivery"
          );

        if (value.length > 200)
          throw new Error("Delivery address must not exceed 200 characters");
      }
      return true;
    }),

    body("deliveryInstructions")
      .optional()
      .isString()
      .withMessage("Delivery instructions must be a string")
      .bail()
      .isLength({ max: 300 })
      .withMessage("Delivery Instructions must not exceed 300 characters"),

    body("totalPrice")
      .notEmpty()
      .withMessage("Total price is required")
      .bail()
      .isFloat({ min: 0 })
      .withMessage("Total price must be a positive number"),

    body("specialRequests")
      .optional()
      .isString()
      .withMessage("Special requests must be a string")
      .bail()
      .isLength({ max: 300 })
      .withMessage("Special Requests must not exceed 500 characters"),

    body("venue").custom((value, { req }) => {
      if (req.body.serviceType === "Plated") {
        if (!value || value.trim() === "")
          throw new Error("Venue is required when service type is Plated");
      }
      return true;
    }),

    body("serviceFee")
      .notEmpty()
      .withMessage("Service fee is required")
      .bail()
      .isFloat({ min: 0 })
      .withMessage("Service fee must be a positive number"),

    body("serviceHours").custom((value, { req }) => {
      if (req.body.serviceType === "Plated") {
        if (!value)
          throw new Error(
            "Service hours is required when service type is Plated"
          );
        if (!serviceHoursOptions.includes(value))
          throw new Error(
            `Service hours must be one of: ${serviceHoursOptions.join(", ")}`
          );
      }
      return true;
    }),
  ],
};
