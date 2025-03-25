import express from "express";
import {
  createPayment,
  getAllPayments,
  getPayment,
  getPaymentsByReservation,
  getMyPayments,
  updatePaymentStatus,
} from "@controllers/payment.controller.js";
import {
  isAuthenticated,
  isCaterer,
  isCustomer,
  isPaymentOwnerOrCaterer,
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
paymentRouter.get("/:id", isAuthenticated, isPaymentOwnerOrCaterer, getPayment);
paymentRouter.get(
  "/reservation/:reservationId",
  isAuthenticated,
  isPaymentOwnerOrCaterer,
  getPaymentsByReservation
);

// Routes specifically for customers
paymentRouter.get("/my-payments", isAuthenticated, isCustomer, getMyPayments);
paymentRouter.post("/", isAuthenticated, createPayment);

export default paymentRouter;
