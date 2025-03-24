//CatererReservation Relates Routes
import { Router } from "express";
import {
  createCatererReservation,
  deleteCatererReservation,
  getCatererReservation,
  getCatererReservations,
  updateCatererReservation,
} from "@controllers/caterer-reservation.controller.js";

const catererReservationRouter = Router();

//Get all reservation from all customers (For Caterer)
catererReservationRouter.get("/", getCatererReservations);

//Get all reservation made by customer
catererReservationRouter.get("/:id", getCatererReservation);

//Create a reservation
catererReservationRouter.post("/", createCatererReservation);

//Update a CatererReservation
catererReservationRouter.put("/", updateCatererReservation);

//Delete a reservation
catererReservationRouter.delete("/", deleteCatererReservation);

export default catererReservationRouter;
