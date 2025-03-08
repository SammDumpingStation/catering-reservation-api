//Payment Related routes

import { Router } from "express";
import {
  createPayment,
  deletePayment,
  getPayment,
  getPayments,
  updatePayment,
} from "../controllers/payment.controller";

const paymentRouter = Router();

//Get all payments (for caterer)
paymentRouter.get("/", getPayments);

//Get all payments made by a customer
paymentRouter.get("/:id", getPayment);

//Add a payment
paymentRouter.post("/", createPayment);

//Update a payment
paymentRouter.put("/:id", updatePayment);

//Delete a payment
paymentRouter.delete("/:id", deletePayment);

//Get payments detail of a customer
// paymentRouter.get("/customer/:id", (req, res) =>
//   res.send({ message: "GET All Payments" })
// );

export default paymentRouter;
