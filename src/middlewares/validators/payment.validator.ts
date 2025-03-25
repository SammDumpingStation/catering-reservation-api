import { body } from "express-validator";
import { validateRequest } from "../validate-request.middleware.js";
import { statusEnums } from "@TStypes/global.type.js";
import { paymentStatus } from "@TStypes/payment.type.js";

export const paymentValidationRules = {
  create: [
    body("reservationId")
      .isMongoId()
      .withMessage("Valid reservation ID is required"),
    body("transactions").isArray().withMessage("Transactions must be an array"),
    body("transactions.*.amount")
      .isFloat({ min: 0 })
      .withMessage("Transaction amount must be a positive number"),
    body("transactions.*.method")
      .isIn([
        "online",
        "bank_transfer",
        "cash_on_delivery",
        "credit_card",
        "debit_card",
      ])
      .withMessage("Invalid payment method"),
    body("transactions.*.type")
      .isIn(["down_payment", "additional_payment", "full_payment"])
      .withMessage("Invalid transaction type"),
    body("transactions.*.status")
      .optional()
      .isIn(statusEnums)
      .withMessage(`Status must be one of: ${statusEnums.join(", ")}`),
    body("status")
      .optional()
      .isIn(paymentStatus)
      .withMessage(
        `Payment status must be one of: ${paymentStatus.join(", ")}`
      ),
    validateRequest,
  ],
  updateStatus: [
    body("status")
      .isIn(paymentStatus)
      .withMessage(
        `Payment status must be one of: ${paymentStatus.join(", ")}`
      ),
    validateRequest,
  ],
};
