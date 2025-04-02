import { Request, Response, NextFunction } from "express";
import Customer from "../schemas/customer.schema.js";
import * as customerModel from "@models/customer.model.js";
import { sanitizeCustomer } from "@utils/authUtils.js";
import { createError } from "@utils/globalUtils.js";

const getCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customers = await Customer.find();
    if (customers.length === 0) {
      res.sendStatus(204);
      return;
    }

    res.status(200).json({
      success: true,
      data: customers.map((customer) => sanitizeCustomer(customer)),
    });
  } catch (error) {
    next(error);
  }
};

const getCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customer = await customerModel.getCustomerById(req.params.id);

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

//Update a Customer
const updateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { fullName, contactNumber, profileImage } = req.body;
  try {
    const customer = await customerModel.updateCustomerById({
      id,
      fullName,
      contactNumber,
      profileImage,
    });

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

//Delete a Customer
const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = await customerModel.deleteCustomerById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Customer deleted Successfully!",
      customer, //this is optional for now
    });
  } catch (error) {
    next(error);
  }
};

export { getCustomers, getCustomer, updateCustomer, deleteCustomer };
