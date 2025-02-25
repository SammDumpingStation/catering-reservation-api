//Menu Related Route
import { Router } from "express";

const menuItemRouter = Router();

//Get all Menu
menuItemRouter.get("/", (req, res) => res.send({ message: "GET All Menu" }));

//Get Menu Detail
menuItemRouter.get("/:id", (req, res) => res.send({ message: "GET All Menu" }));

//Create a new Menu
menuItemRouter.post("/", (req, res) => res.send({ message: "GET All Menu" }));

//Update a Menu
menuItemRouter.put("/:id", (req, res) => res.send({ message: "GET All Menu" }));

//Delete a Menu
menuItemRouter.delete("/:id", (req, res) =>
  res.send({ message: "GET All Menu" })
);

export default menuItemRouter;
