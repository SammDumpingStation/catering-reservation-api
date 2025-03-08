//Reservation Relates Routes
import { Router } from "express";
import {
  createReservation,
  deleteReservation,
  getReservation,
  getReservations,
  updateReservation,
} from "../controllers/reservation.controller";

const reservationRouter = Router();

//Get all reservation (For Caterer)
reservationRouter.get("/", getReservations);

//Get all reservation made by customer
reservationRouter.get("/customer/:id", getReservation);

//Create a reservation
reservationRouter.post("/", createReservation);

//Update a Reservation
reservationRouter.put("/", updateReservation);

//Delete a reservation
reservationRouter.delete("/", deleteReservation);

export default reservationRouter;
