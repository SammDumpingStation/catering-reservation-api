import {
  createCustomerReservation,
  getCustomerReservation,
  getAllCustomerOwnReservations,
} from "@controllers/considerations/customer-reservation.controller.js";
import { isCustomer } from "@middlewares/auth.middleware.js";
import { Router } from "express";

const customerReservationRouter = Router();

customerReservationRouter.use(isCustomer);

//Get all reservations made by a customer
customerReservationRouter.get("/", getAllCustomerOwnReservations);

//Get a specific reservation made by a customer
customerReservationRouter.get("/:id", getCustomerReservation);

//Create a reservation
customerReservationRouter.post("/", createCustomerReservation);

export default customerReservationRouter;
