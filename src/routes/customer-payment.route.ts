// import {
//   getCustomerOwnPaymentsController,
//   getCustomerReservationPaymentsController,
//   getCustomerPaymentByIdController,
//   addCustomerTransactionController,
// } from "@controllers/customer-payment.controller.js";
import { checkUserType, customerOnly } from "@middlewares/auth.middleware.js";
import { Router } from "express";

const customerPaymentRouter = Router();
customerPaymentRouter.use(checkUserType, customerOnly);

// // Get all of the customer's own payments
// customerPaymentRouter.get("/", getCustomerOwnPaymentsController);

// // Get payments for a specific reservation
// customerPaymentRouter.get(
//   "/reservation/:reservationId",
//   getCustomerReservationPaymentsController
// );

// // Get specific payment details
// customerPaymentRouter.get("/:paymentId", getCustomerPaymentByIdController);

// // Make a new payment (add transaction)
// customerPaymentRouter.post(
//   "/:paymentId/transaction",
//   addCustomerTransactionController
// );

export default customerPaymentRouter;
