//Menu Related Route
import { Router } from "express";
import {
  postMenu,
  deleteMenu,
  getMenu,
  getMenus,
  updateMenu,
} from "@controllers/menu.controller.js";
import { isCaterer } from "@middlewares/auth.middleware.js";
import { menuValidationRules } from "@middlewares/validators/menu.validator.js";

const menuRouter = Router();

//Get all Menu
menuRouter.get("/", getMenus);

//Get Menu Detail
menuRouter.get("/:id", getMenu);

//Create a new Menu (isCaterer)
menuRouter.post("/", menuValidationRules.create, postMenu);

//Update a Menu (isCaterer)
menuRouter.put("/:id", menuValidationRules.update, updateMenu);

//Delete a Menu
menuRouter.delete("/:id", isCaterer, deleteMenu);

export default menuRouter;
