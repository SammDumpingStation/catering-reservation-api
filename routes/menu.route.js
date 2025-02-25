//Menu Related Route
import { Router } from "express";

const menuRouter = Router();

//Get all Menu
menuRouter.get("/", (req, res) => res.send({ message: "GET All Menu" }));

//Get Menu Detail
menuRouter.get("/:id", (req, res) => res.send({ message: "GET All Menu" }));

//Create a new Menu
menuRouter.post("/", (req, res) => res.send({ message: "GET All Menu" }));

//Update a Menu
menuRouter.put("/:id", (req, res) => res.send({ message: "GET All Menu" }));

//Delete a Menu
menuRouter.delete("/:id", (req, res) =>
  res.send({ message: "GET All Menu" })
);

export default menuRouter;
