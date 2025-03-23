//Menu Related Route
import { Router } from "express";
import {
  createMenu,
  deleteMenu,
  getMenu,
  getMenus,
  updateMenu,
} from "../controllers/menu.controller.js";

const menuRouter = Router();

//Get all Menu
menuRouter.get("/", getMenus);

//Get Menu Detail
menuRouter.get("/:id", getMenu);

//Create a new Menu
menuRouter.post("/", createMenu);

//Update a Menu
menuRouter.put("/:id", updateMenu);

//Delete a Menu
menuRouter.delete("/:id", deleteMenu);

export default menuRouter;
