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
      error.statusCode = 404;
      throw error;
    }

    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

//Update a Customer
const updateCustomer = async (req, res, next) => {
  const { id } = req.params;
  const { fullName, contactNumber, profileImage } = req.body;
  try {
    const customer = await Customer.findByIdAndUpdate(
      id,
      {
        fullName,
        contactNumber,
        profileImage,
      },
      { new: true, runValidators: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

//Delete a Customer
const deleteCustomer = async (req, res) => {};

export { getCustomers, getCustomer, updateCustomer, deleteCustomer };
