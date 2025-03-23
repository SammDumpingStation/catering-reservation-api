//Package Related Routes
import { Router } from "express";
import {
  createPackage,
  deletePackage,
  getPackage,
  getPackages,
  updatePackage,
} from "../controllers/package.controller.js";

const packageRouter = Router();

//Get all Catering Package
packageRouter.get("/", getPackages);

//Get Catering Package Detail
packageRouter.get("/:id", getPackage);

//Create a new Catering Package
packageRouter.post("/", createPackage);

//Update a Catering Package
packageRouter.put("/:id", updatePackage);

//Delete a Catering Package
packageRouter.delete("/:id", deletePackage);

//Update Catering Package Availability
// packageRouter.put("/api/v1/packages/:id/availability", (req, res) =>
//   res.send({ message: "Update Package Availability" })
// );

export default packageRouter;
