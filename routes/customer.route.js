//Customer Related Routes
import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customer.controller.js";
import authorize from "../middlewares/customer.middleware.js";

const customerRouter = Router();

//Get all Registered Customers
customerRouter.get("/", getCustomers);

//Get Customer Details
customerRouter.get("/:id", authorize, getCustomer);

//Create a New Customer
customerRouter.post("/", createCustomer);

//Update a Customer
customerRouter.put("/:id", updateCustomer);

//Delete a Customer
customerRouter.delete("/:id", deleteCustomer);

export default customerRouter;
