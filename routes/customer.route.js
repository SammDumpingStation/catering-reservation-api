//Customer Related Route
import { Router } from "express";

const customerRouter = Router();

customerRouter.get("/", (req, res) => res.send({ title: "GET All Customers" }));

customerRouter.get("/:id", (req, res) => res.send({ title: "GET Customer Details" }));

customerRouter.post("/", (req, res) => res.send({ title: "Create a New Customer" }));

customerRouter.put("/:id", (req, res) => res.send({ title: "Update a Customer" }));

customerRouter.delete("/:id", (req, res) => res.send({ title: "DELETE A Customer" }));

export default customerRouter;
