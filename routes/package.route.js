//Package Related Routes
import { Router } from "express";

const packageRouter = Router();

//Get all Package
packageRouter.get("/", (req, res) => res.send({ message: "GET All Package" }));

//Get Package Detail
packageRouter.get("/:id", (req, res) =>
  res.send({ message: "Get Package Detail" })
);

//Create a new Package
packageRouter.post("/", (req, res) =>
  res.send({ message: "Create a Package" })
);

//Update a Package
packageRouter.put("/:id", (req, res) =>
  res.send({ message: "Update a Package" })
);

//Delete a Package
packageRouter.delete("/:id", (req, res) =>
  res.send({ message: "Delete a Package" })
);
