//Package Related Routes
import { Router } from "express";
import {
  createPackage,
  deletePackage,
  getPackage,
  getPackages,
  updatePackage,
} from "@controllers/package.controller.js";
import { catererOnly, checkUserType } from "@middlewares/auth.middleware.js";

const packageRouter = Router();

//Get all Catering Package
packageRouter.get("/", getPackages);

//Get Catering Package Detail
packageRouter.get("/:id", getPackage);

//Create a new Catering Package
packageRouter.post("/", checkUserType, catererOnly, createPackage);

//Update a Catering Package
packageRouter.put("/:id", checkUserType, catererOnly, updatePackage);

//Delete a Catering Package
packageRouter.delete("/:id", checkUserType, catererOnly, deletePackage);

export default packageRouter;
