import { Router } from "express";
import {
  getReservations,
  getReservation,
  postReservation,
  updateReservation,
  deleteReservation,
} from "../controllers/reservation.controller.js";
import { isCaterer } from "@middlewares/auth.middleware.js";
import { reservationValidationRules } from "@middlewares/validators/reservation.validator.js";

// TEMPORARY. DOESN'T WORK

const reservationRouter = Router();

// Get all Reservations
reservationRouter.get("/", isCaterer, getReservations);

// Get Reservation Details
reservationRouter.get("/:id", getReservation);

// Create a Reservation
reservationRouter.post("/", reservationValidationRules.create, postReservation);

// Update a Reservation
reservationRouter.put("/:id", updateReservation);

// Delete a Reservation
reservationRouter.delete("/:id", deleteReservation);

export default reservationRouter;
