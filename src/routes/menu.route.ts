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

//Create a new Menu (isCaterer) TEMPORARY
menuRouter.post("/", menuValidationRules.create, postMenu);

//Update a Menu (isCaterer) TEMPORARY
menuRouter.put("/:id", menuValidationRules.update, updateMenu);

//Delete a Menu (isCaterer) TEMPORARY
menuRouter.delete("/:id", deleteMenu);

export default menuRouter;
