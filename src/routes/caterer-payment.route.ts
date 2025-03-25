//CatererPayment Relates Routes
import { Router } from "express";
import {
  createPayment,
  deletePayment,
  getPayment,
  getAllPayments,
  getReservationPayments,
  getCustomerPayments,
  addTransaction,
  updatePaymentStatus,
  updateTransactionStatus,
} from "@controllers/caterer-payment.controller.js";
import { catererOnly, checkUserType } from "@middlewares/auth.middleware.js";

const catererPaymentRouter = Router();

catererPaymentRouter.use(checkUserType, catererOnly);

// Get all payments across all reservations
catererPaymentRouter.get("/", getAllPayments);

// Get all payments for a specific reservation
catererPaymentRouter.get("/reservation/:reservationId", getReservationPayments);

// Get all payments from a specific customer
catererPaymentRouter.get("/customer/:customerId", getCustomerPayments);

// Get specific payment details
catererPaymentRouter.get("/:paymentId", getPayment);

// Create a new payment record (typically when creating a reservation)
catererPaymentRouter.post("/", createPayment);

// // Add a new transaction to an existing payment
catererPaymentRouter.post("/:paymentId/transaction", addTransaction);

// // Update payment status
catererPaymentRouter.put("/:paymentId/status", updatePaymentStatus);

// // Update transaction status
catererPaymentRouter.put(
  "/:paymentId/transaction/:transactionId",
  updateTransactionStatus
);

catererPaymentRouter.delete("/:id", deletePayment);

export default catererPaymentRouter;
