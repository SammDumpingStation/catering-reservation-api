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
import { isAuthenticated, isCaterer } from "@middlewares/auth.middleware.js";

const packageRouter = Router();

//Get all Catering Package
packageRouter.get("/", getPackages);

//Get all  Featured Catering Package
packageRouter.get("/featured", featuredPackages);

//Get Catering Package Detail
packageRouter.get("/:id", getPackage);

//Create a new Catering Package
packageRouter.post("/", isAuthenticated, isCaterer, postPackage);

//Update a Catering Package
packageRouter.put("/:id", isAuthenticated, isCaterer, updatePackage);

//Delete a Catering Package
packageRouter.delete("/:id", isAuthenticated, isCaterer, deletePackage);

export default packageRouter;
