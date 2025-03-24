import {
  createCustomerReservation,
  getCustomerReservation,
  getCustomerReservations,
} from "@controllers/customer-reservation.controller.js";
import { Router } from "express";

export const customerReservationRouter = Router();

//Get all reservations made by a customer
customerReservationRouter.get("/", getCustomerReservations);

//Get a specific reservation made by a customer
customerReservationRouter.get("/:id", getCustomerReservation);

//Create a reservation for a specific customer
customerReservationRouter.post("/:id", createCustomerReservation);
