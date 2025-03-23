import Customer from "../schemas/customer.schema.js";
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

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

//Update a Customer
const updateCustomer = async (req, res, next) => {
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
const deleteCustomer = async (req, res, next) => {
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
