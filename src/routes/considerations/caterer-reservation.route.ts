//CatererReservation Relates Routes
import { Router } from "express";
import {
  createReservation,
  deleteReservation,
  getReservation,
  getAllReservations,
  getCustomerReservations,
  updateReservation,
} from "@controllers/caterer-reservation.controller.js";
import { isCaterer } from "@middlewares/auth.middleware.js";

const catererReservationRouter = Router();

// Applying middleware to all routes in this router to ensure that only the caterer can touch this route
catererReservationRouter.use(isCaterer);

//Get all reservation from all customers (For Caterer)
catererReservationRouter.get("/", getAllReservations);

//Get all reservation made by a customer
catererReservationRouter.get("/customer/:customerId", getCustomerReservations);

//Get a specific reservation made by a customer
catererReservationRouter.get("/:id", getReservation);

//Create a reservation
catererReservationRouter.post("/", createReservation);

//Update a CatererReservation
catererReservationRouter.put("/:id", updateReservation);

//Delete a reservation
catererReservationRouter.delete("/:id", deleteReservation);

export default catererReservationRouter;
