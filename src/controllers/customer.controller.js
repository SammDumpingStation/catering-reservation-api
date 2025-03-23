import Customer from "../schemas/customer.schema.js";
import { checkIfExists } from "../utils/checkExistence.js";
import * as customerModel from "@models/customer.model.js";

const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    next(error);
  }
};

const getCustomer = async (req, res, next) => {
  try {
    const customer = await customerModel.getCustomerById(req.params.id);

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

    checkIfExists(customer, "Customer");

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

//Delete a Customer
const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByIdAndDelete(id);

    checkIfExists(customer, "Customer");

    res
      .status(200)
      .json({ success: true, message: "Customer deleted Successfully!" });
  } catch (error) {
    next(error);
  }
};

export { getCustomers, getCustomer, updateCustomer, deleteCustomer };
