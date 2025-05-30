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
reservationRouter.get("/", getReservations);

// Get Reservation Details
reservationRouter.get("/:email", getReservation);

// Create a Reservation
reservationRouter.post("/", reservationValidationRules.create, postReservation);

// Update a Reservation
reservationRouter.put(
  "/:id",
  reservationValidationRules.update,
  updateReservation
);

// Delete a Reservation
reservationRouter.delete("/:id", deleteReservation);

export default reservationRouter;
