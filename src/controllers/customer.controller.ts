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
    const existingCustomer = await Customer.find();
    if (existingCustomer.length === 0) {
      res.sendStatus(204);
      return;
    }

    res.status(200).json({
      success: true,
      session: req.sessionStore || "no sesion",
      data: existingCustomer.map((customer) => sanitizeCustomer(customer)),
    });
  } catch (error) {
    next(error);
  }
};

const getCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existingCustomer = await Customer.findById(req.params.id);
    if (!existingCustomer) throw createError("Customer doesn't exist", 404);

    res
      .status(200)
      .json({ success: true, data: sanitizeCustomer(existingCustomer) });
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
  try {
    const { id } = req.params;
    const data = req.body;

    if (Object.keys(data).length === 0) {
      res.sendStatus(204);
      return;
    }

    const existingCustomer = await customerModel.updateCustomerById(id, data);
    if (!existingCustomer) throw createError("Customer doesn't exist", 404);

    res
      .status(200)
      .json({ success: true, data: sanitizeCustomer(existingCustomer) });
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
    const existingCustomer = await Customer.findByIdAndDelete(req.params.id);

    if (!existingCustomer) throw createError("Customer doesn't exist", 404);

    res.status(200).json({
      success: true,
      message: "Customer deleted Successfully!",
      data: sanitizeCustomer(existingCustomer),
    });
  } catch (error) {
    next(error);
  }
};

export { getCustomers, getCustomer, updateCustomer, deleteCustomer };
