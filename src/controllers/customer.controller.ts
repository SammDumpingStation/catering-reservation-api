import Customer from "../schemas/customer.schema.js";
import * as customerModel from "@models/customer.model.js";
import { sanitizeCustomer } from "@utils/authUtils.js";
import { createError } from "@utils/globalUtils.js";
import { FunctionProps } from "@TStypes/global.type.js";
import cloudinary from "@libs/cloudinary.js";
import fs from "fs";

const getCustomers: FunctionProps = async (req, res, next) => {
  try {
    const existingCustomer = await Customer.find();

    res.status(200).json({
      success: true,
      data: existingCustomer.map((customer) => sanitizeCustomer(customer)),
    });
  } catch (error) {
    next(error);
  }
};

const getCustomer: FunctionProps = async (req, res, next) => {
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
const updateCustomer: FunctionProps = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (Object.keys(data).length === 0) {
      throw createError("Update data cannot be empty", 400);
    }

    // ⬇️ Upload profileImage if present
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "customer_profiles",
      });
      data.profileImage = result.secure_url;
      fs.unlinkSync(req.file.path); // Remove temp file
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
const deleteCustomer: FunctionProps = async (req, res, next) => {
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
