//Package Related Routes
import { Router } from "express";

const packageRouter = Router();

//Get all Catering Package
packageRouter.get("/", (req, res) =>
  res.send({ message: "GET All Catering Package" })
);

//Get Catering Package Detail
packageRouter.get("/:id", (req, res) =>
  res.send({ message: "Get Package Detail" })
);

//Create a new Catering Package
packageRouter.post("/", (req, res) =>
  res.send({ message: "Create a New Package" })
);

//Update a Catering Package
packageRouter.put("/:id", (req, res) =>
  res.send({ message: "Update a Package" })
);

//Delete a Catering Package
packageRouter.delete("/:id", (req, res) =>
  res.send({ message: "Delete a Package" })
);

//Update Catering Package Availability
packageRouter.put("/api/v1/packages/:id/availability", (req, res) =>
  res.send({ message: "Update Package Availability" })
);

export default packageRouter;
