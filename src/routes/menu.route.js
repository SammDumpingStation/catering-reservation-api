//Menu Related Route
import { Router } from "express";
import {
  createMenu,
  getMenu,
  getMenus,
} from "../controllers/menu.controller.js";

const menuRouter = Router();

//Get all Menu
menuRouter.get("/", getMenus);

//Get Menu Detail
menuRouter.get("/:id", getMenu);

//Create a new Menu
menuRouter.post("/", createMenu);

//Update a Menu
menuRouter.put("/:id", (req, res) =>
  res.send({ message: "Update New Menu Item" })
);

//Delete a Menu
menuRouter.delete("/:id", (req, res) =>
  res.send({ message: "Delete Menu Item" })
);

export default menuRouter;
