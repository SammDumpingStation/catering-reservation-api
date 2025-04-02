//Customer Related Routes
import { Router } from "express";
import {
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "@controllers/customer.controller.js";
import {
  isAuthenticated,
  isCaterer,
  isSelf,
} from "@middlewares/auth.middleware.js";
import { customerValidationRules } from "@middlewares/validators/customer.validator.js";

const customerRouter = Router();

//Get all Registered Customers
customerRouter.get("/", isAuthenticated, isCaterer, getCustomers);

//Get Customer Details
customerRouter.get("/:id", isAuthenticated, isSelf, getCustomer);

//Update a Customer
customerRouter.put(
  "/:id",
  customerValidationRules.update,
  isAuthenticated,
  isSelf,
  updateCustomer
);

//Delete a Customer
customerRouter.delete("/:id", isAuthenticated, isCaterer, deleteCustomer);

export default customerRouter;
