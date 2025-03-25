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

const router = express.Router();

// Routes accessible only to caterers
router.get("/", isAuthenticated, isCaterer, getAllPayments);
router.put("/:id/status", isAuthenticated, isCaterer, updatePaymentStatus);

// Routes accessible to both caterers and customers (with ownership check)
router.get("/:id", isAuthenticated, isPaymentOwnerOrCaterer, getPayment);
router.get(
  "/reservation/:reservationId",
  isAuthenticated,
  isPaymentOwnerOrCaterer,
  getPaymentsByReservation
);

// Routes specifically for customers
router.get("/my-payments", isAuthenticated, isCustomer, getMyPayments);
router.post("/", isAuthenticated, createPayment);

export default router;
