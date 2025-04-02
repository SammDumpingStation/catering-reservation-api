//Menu Related Route
import { Router } from "express";
import {
  postMenu,
  deleteMenu,
  getMenu,
  getMenus,
  updateMenu,
} from "@controllers/menu.controller.js";
import { isAuthenticated, isCaterer } from "@middlewares/auth.middleware.js";

const menuRouter = Router();

//Get all Menu
menuRouter.get("/", getMenus);

//Get Menu Detail
menuRouter.get("/:id", getMenu);

//Create a new Menu
menuRouter.post("/", isAuthenticated, isCaterer, postMenu);

//Update a Menu
menuRouter.put("/:id", isAuthenticated, isCaterer, updateMenu);

//Delete a Menu
menuRouter.delete("/:id", isAuthenticated, isCaterer, deleteMenu);

export default menuRouter;
