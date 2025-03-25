import {
  getCustomerOwnPayments,
  getCustomerReservationPayments,
  getCustomerPaymentById,
  addCustomerTransaction,
} from "@controllers/customer-payment.controller.js";
import { checkUserType, isCustomer } from "@middlewares/auth.middleware.js";
import { Router } from "express";

const customerPaymentRouter = Router();
customerPaymentRouter.use(checkUserType, isCustomer);

// Get all of the customer's own payments
customerPaymentRouter.get("/", getCustomerOwnPayments);

// Get payments for a specific reservation
customerPaymentRouter.get(
  "/reservation/:reservationId",
  getCustomerReservationPayments
);

// Get specific payment details
customerPaymentRouter.get("/:paymentId", getCustomerPaymentById);

// Make a new payment (add transaction)
customerPaymentRouter.post(
  "/:paymentId/transaction",
  addCustomerTransaction
);

export default customerPaymentRouter;
