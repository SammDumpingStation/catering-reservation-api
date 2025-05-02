//Package Related Routes
import { Router } from "express";
import {
  postPackage,
  deletePackage,
  featuredPackages,
  getPackage,
  getPackages,
  updatePackage,
} from "@controllers/package.controller.js";
import { isCaterer } from "@middlewares/auth.middleware.js";
import { packageValidationRules } from "@middlewares/validators/package.validator.js";

const packageRouter = Router();

//Get all Catering Package
packageRouter.get("/", getPackages);

//Get all  Featured Catering Package
packageRouter.get("/featured", featuredPackages);

//Get Catering Package Detail
packageRouter.get("/:id", getPackage);

//Create a new Catering Package (isCaterer)
packageRouter.post("/", packageValidationRules.create, postPackage);

//Update a Catering Package (isCaterer)
packageRouter.put("/:id", packageValidationRules.update, updatePackage);

//Delete a Catering Package (isCaterer)
packageRouter.delete("/:id", deletePackage);

export default packageRouter;
