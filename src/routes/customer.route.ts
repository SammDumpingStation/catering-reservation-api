//Customer Related Routes
import { Router } from "express";
import {
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "@controllers/customer.controller.js";
import { isAuthenticated, isCaterer } from "@middlewares/auth.middleware.js";

const customerRouter = Router();

//Get all Registered Customers
customerRouter.get("/", isAuthenticated, isCaterer, getCustomers);

//Get Customer Details
customerRouter.get("/:id", isAuthenticated, getCustomer);

//Update a Customer
customerRouter.put("/:id", isAuthenticated, updateCustomer);

//Delete a Customer
customerRouter.delete("/:id", isAuthenticated, isCaterer, deleteCustomer);

export default customerRouter;
