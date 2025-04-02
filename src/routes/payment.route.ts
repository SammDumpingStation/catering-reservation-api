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
import {
  isAuthenticated,
  isCaterer,
  isCustomer,
} from "@middlewares/auth.middleware.js";

const paymentRouter = express.Router();

// Routes accessible only to caterers
paymentRouter.get("/", isAuthenticated, isCaterer, getAllPayments);
paymentRouter.put(
  "/:id/status",
  isAuthenticated,
  isCaterer,
  updatePaymentStatus
);

// Routes accessible to both caterers and customers (with ownership check)
paymentRouter.get("/:id", isAuthenticated, getPayment);
paymentRouter.get(
  "/reservation/:reservationId",
  isAuthenticated,
  getPaymentsByReservation
);
paymentRouter.post("/:id/transactions", isAuthenticated, addTransaction);
paymentRouter.put(
  "/:paymentId/transactions/:transactionId",
  isAuthenticated,
  updateTransactionStatus
);
// Routes specifically for customers
paymentRouter.get("/my-payments", isAuthenticated, isCustomer, getMyPayments);
paymentRouter.post("/", isAuthenticated, createPayment);

export default paymentRouter;
