//Transaction Related Routes
import { Router } from "express";

const transactionRouter = Router();

//Get all Transactions (For dashboard caterer)
transactionRouter.get("/", (req, res) =>
  res.send({ title: "GET All Transactions" })
);

//Get all Transaction to a specific user
transactionRouter.get("/user/:id", (req, res) =>
  res.send({ title: "Get all Transaction to a specific user" })
);

//Get transaction details that the user made
transactionRouter.get("/:id", (req, res) =>
  res.send({ title: "Get transaction details that the user made" })
);

//Create a transaction ()
transactionRouter.post("/", (req, res) =>
  res.send({ title: "Create a transaction" })
);

//Update a transaction
transactionRouter.put("/:id", (req, res) =>
  res.send({ title: "Update a transaction" })
);

//Delete a transaction
transactionRouter.get("/:id", (req, res) =>
  res.send({ title: "Delete a transaction" })
);
