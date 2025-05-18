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
import { isCaterer, isCustomer } from "@middlewares/auth.middleware.js";

// TEMPORARY. DOESN'T WORK

const reservationRouter = express.Router();

// Routes accessible only to caterers
reservationRouter.get("/", isCaterer, getAllReservations);

// Routes accessible to both caterers and customers (with ownership check)
reservationRouter.get("/:id", getReservation);

reservationRouter.put("/:id", updateReservation);
reservationRouter.delete(
  "/:id",

  deleteReservation
);

// Routes specifically for customers
reservationRouter.get("/my/reservations", isCustomer, getMyReservations);
reservationRouter.post("/", createReservation);

export default reservationRouter;
