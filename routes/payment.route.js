//Payment Related routes

import { Router } from "express";

const paymentRouter = Router();

//Get all payments (for caterer)
paymentRouter.get("/", (req, res) => res.send({ message: "GET All Payments" }));

//Get all payments made by a customer
paymentRouter.get("/:id/", (req, res) =>
  res.send({ message: "GET All Payments by a Customer" })
);

//Get payments detail of a customer
paymentRouter.get("/customer/:id", (req, res) =>
  res.send({ message: "GET All Payments" })
);

//Add a payment
paymentRouter.post("/", (req, res) =>
  res.send({ message: "GET All Payments" })
);

//Update a payment
paymentRouter.put("/:id", (req, res) =>
  res.send({ message: "GET All Payments" })
);

//Delete a payment
paymentRouter.delete("/:id", (req, res) =>
  res.send({ message: "GET All Payments" })
);

export default paymentRouter;
