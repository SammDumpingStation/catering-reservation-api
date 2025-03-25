//Package Related Routes
import { Router } from "express";
import {
  createPackage,
  deletePackage,
  getPackage,
  getPackages,
  updatePackage,
} from "@controllers/package.controller.js";
import { isCaterer, checkUserType } from "@middlewares/auth.middleware.js";

const packageRouter = Router();

//Get all Catering Package
packageRouter.get("/", getPackages);

//Get Catering Package Detail
packageRouter.get("/:id", getPackage);

//Create a new Catering Package
packageRouter.post("/", checkUserType, isCaterer, createPackage);

//Update a Catering Package
packageRouter.put("/:id", checkUserType, isCaterer, updatePackage);

//Delete a Catering Package
packageRouter.delete("/:id", checkUserType, isCaterer, deletePackage);

export default packageRouter;
