//Reservation Relates Routes
import { Router } from "express";

const reservationRouter = Router();

//Get all reservation (For Caterer)
reservationRouter.get("/", (req, res) =>
  res.send({ message: "GET All Reservation" })
);

//Get all reservation made by user
reservationRouter.get("/user/:id", (req, res) =>
  res.send({ message: "Get all reservation made by user" })
);

//Create a reservation
reservationRouter.post("/", (req, res) =>
  res.send({ message: "Create a reservation" })
);

//Update a Reservation
reservationRouter.put("/", (req, res) =>
  res.send({ message: "Update a Reservation" })
);

//Delete a reservation
reservationRouter.delete("/", (req, res) =>
  res.send({ message: "Delete a reservation" })
);

export default reservationRouter;
