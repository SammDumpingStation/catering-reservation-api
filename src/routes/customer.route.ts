//Customer Related Routes
import { Router } from "express";
import {
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "@controllers/customer.controller.js";
import { isCaterer, isSelfOrCaterer } from "@middlewares/auth.middleware.js";
import { customerValidationRules } from "@middlewares/validators/customer.validator.js";
import upload from "@libs/multer.js";

const customerRouter = Router();

//Get all Registered Customers
customerRouter.get("/", getCustomers);

//Get Customer Details
customerRouter.get("/:id", isSelfOrCaterer, getCustomer);

//Update a Customer
customerRouter.put(
  "/:id",
  isSelfOrCaterer,
  upload.single("profileImage"), // 👈 must be before the controller
  customerValidationRules.update,
  updateCustomer
);

//Delete a Customer
customerRouter.delete("/:id", isCaterer, deleteCustomer);

export default customerRouter;
