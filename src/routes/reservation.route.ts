import express from "express";
import {
  getAllReservations,
  getCustomerReservations,
  getReservation,
  getMyReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../controllers/reservation.controller.js";
import {
  isAuthenticated,
  isCaterer,
  isCustomer,
  isReservationOwnerOrCaterer,
} from "@middlewares/auth.middleware.js";

const router = express.Router();

// Routes accessible only to caterers
router.get("/", isAuthenticated, isCaterer, getAllReservations);
router.get(
  "/customer/:customerId",
  isAuthenticated,
  isCaterer,
  getCustomerReservations
);

// Routes accessible to both caterers and customers (with ownership check)
router.get(
  "/:id",
  isAuthenticated,
  isReservationOwnerOrCaterer,
  getReservation
);
router.put(
  "/:id",
  isAuthenticated,
  isReservationOwnerOrCaterer,
  updateReservation
);
router.delete(
  "/:id",
  isAuthenticated,
  isReservationOwnerOrCaterer,
  deleteReservation
);

// Routes specifically for customers
router.get("/my/reservations", isAuthenticated, isCustomer, getMyReservations);
router.post("/", isAuthenticated, createReservation);

export default router;
