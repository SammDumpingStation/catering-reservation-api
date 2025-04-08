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
  isCustomer,
  isSelf,
} from "@middlewares/auth.middleware.js";
import { customerValidationRules } from "@middlewares/validators/customer.validator.js";

const customerRouter = Router();

//Get all Registered Customers
customerRouter.get("/", isCaterer, getCustomers);

//Get Customer Details
customerRouter.get("/:id", isSelf || isCaterer, getCustomer);

//Update a Customer
customerRouter.put(
  "/:id",
  customerValidationRules.update,
  isSelf || isCaterer,
  updateCustomer
);

//Delete a Customer
customerRouter.delete("/:id", isCaterer, deleteCustomer);

export default customerRouter;
