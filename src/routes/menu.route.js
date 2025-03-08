//Menu Related Route
import { Router } from "express";

const menuRouter = Router();

//Get all Menu
menuRouter.get("/", (req, res) => res.send({ message: "GET All Menu" }));

//Get Menu Detail
menuRouter.get("/:id", (req, res) => res.send({ message: "GET A Menu Item" }));

//Create a new Menu
menuRouter.post("/", (req, res) =>
  res.send({ message: "Create New Menu Item" })
);

//Update a Menu
menuRouter.put("/:id", (req, res) =>
  res.send({ message: "Update New Menu Item" })
);

//Delete a Menu
menuRouter.delete("/:id", (req, res) =>
  res.send({ message: "Delete Menu Item" })
);

export default menuRouter;
