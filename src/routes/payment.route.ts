import express from "express";
import {
  createPayment,
  getAllPayments,
  getPayment,
  getPaymentsByReservation,
  getMyPayments,
  updatePaymentStatus,
  addTransaction,
  updateTransactionStatus,
} from "@controllers/payment.controller.js";
import { isCaterer, isCustomer } from "@middlewares/auth.middleware.js";

// TEMPORARY. DOESN'T WORK

const paymentRouter = express.Router();

// Routes accessible only to caterers
paymentRouter.get("/", isCaterer, getAllPayments);
paymentRouter.put("/:id/status", isCaterer, updatePaymentStatus);

// Routes accessible to both caterers and customers (with ownership check)
paymentRouter.get("/:id", getPayment);
paymentRouter.get("/reservation/:reservationId", getPaymentsByReservation);
paymentRouter.post("/:id/transactions", addTransaction);
paymentRouter.put(
  "/:paymentId/transactions/:transactionId",
  updateTransactionStatus
);
// Routes specifically for customers
paymentRouter.get("/my-payments", isCustomer, getMyPayments);
paymentRouter.post("/", createPayment);

export default paymentRouter;
