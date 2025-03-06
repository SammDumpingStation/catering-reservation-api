import mongoose from "mongoose";
import Customer from "../models/customer.model.js";

const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();

    res.status(200).json({
      success: true,
      message: "All registered Customers",
      data: customers,
    });
  } catch (error) {
    next(error);
  }
};

const getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      const error = new Error("Customer doesn't Exist!");
      error.statusCode(404);
      throw error;
    }

    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

//Create a New Customer
const createCustomer = async (req, res) => {};

//Update a Customer
const updateCustomer = async (req, res) => {};

//Delete a Customer
const deleteCustomer = async (req, res) => {};

export {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
