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

const reservationRouter = express.Router();

// Routes accessible only to caterers
reservationRouter.get("/", isAuthenticated, isCaterer, getAllReservations);
reservationRouter.get(
  "/customer/:customerId",
  isAuthenticated,
  isCaterer,
  getCustomerReservations
);

// Routes accessible to both caterers and customers (with ownership check)
reservationRouter.get(
  "/:id",
  isAuthenticated,
  isReservationOwnerOrCaterer,
  getReservation
);

reservationRouter.put(
  "/:id",
  isAuthenticated,
  isReservationOwnerOrCaterer,
  updateReservation
);
reservationRouter.delete(
  "/:id",
  isAuthenticated,
  isReservationOwnerOrCaterer,
  deleteReservation
);

// Routes specifically for customers
reservationRouter.get(
  "/my/reservations",
  isAuthenticated,
  isCustomer,
  getMyReservations
);
reservationRouter.post("/", isAuthenticated, createReservation);

export default reservationRouter;
