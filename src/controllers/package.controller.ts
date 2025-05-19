import Package from "../schemas/package.schema.js";
import * as packageModel from "@models/package.model.js";
import { createError } from "@utils/globalUtils.js";
import { FunctionProps } from "@TStypes/global.type.js";
import { io } from "@database/socket.js";

//Get All Package
const getPackages: FunctionProps = async (req, res, next) => {
  try {
    const packages = await Package.find();

    res.status(200).json({ success: true, data: packages });
  } catch (error) {
    next(error);
  }
};

//Get All Featured Package
const featuredPackages: FunctionProps = async (req, res, next) => {
  try {
    const packages = await Package.find({ packageType: "BuffetPlated" })
      .sort({ rating: -1 }) // Sort by highest rating
      .limit(6); // Limit to top 5 highest-rated packages

    res.status(200).json({ success: true, data: packages });
  } catch (error) {
    next(error);
  }
};

//Get a Package
const getPackage: FunctionProps = async (req, res, next) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) throw createError("Package doesn't exist", 404);

    res.status(200).json({ success: true, data: pkg });
  } catch (error) {
    next(error);
  }
};

//Create a Package
const postPackage: FunctionProps = async (req, res, next) => {
  try {
    const data = req.body;
    const existingPackage = await Package.findOne({
      name: data.name,
      packageType: data.packageType,
    });
    if (existingPackage) throw createError("Package already exists", 400);

    const pkg = await packageModel.createPackage(data);

    // Emit event to all clients when menu is created
    io.emit("packageCreated", pkg);

    res.status(201).json({
      success: true,
      message: `${data.name} is added to packages`,
      data: pkg,
    });
  } catch (error) {
    next(error);
  }
};

//Update a Package
const updatePackage: FunctionProps = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (Object.keys(data).length === 0) {
      throw createError("Update data cannot be empty", 400);
    }

    const pkg = await packageModel.updatePackageById(id, data);
    if (!pkg) throw createError("Package doesn't exist", 404);

    // Emit event to all clients when menu is updated
    io.emit("packageUpdated", pkg);

    res.status(200).json({ success: true, data: pkg });
  } catch (error) {
    next(error);
  }
};
//Delete a Package
const deletePackage: FunctionProps = async (req, res, next) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);

    if (!pkg) throw createError("Package doesn't exist", 404);

    io.emit("packageDeleted", pkg); // 👈 Emit the deleted packages

    res.status(200).json({
      success: true,
      message: `${pkg?.name} deleted Successfully!`,
      data: pkg,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getPackages,
  featuredPackages,
  getPackage,
  postPackage,
  updatePackage,
  deletePackage,
};
