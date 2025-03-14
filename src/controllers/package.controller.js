import Package from "../models/package.model.js";
import { checkIfExists } from "../utils/checkExistence.js";

//Get All Package
const getPackages = async (req, res, next) => {
  try {
    const packages = await Package.find();

    res.status(200).json({ success: true, data: packages });
  } catch (error) {
    next(error);
  }
};

//Get a Package
const getPackage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const packageVar = await Package.findById(id);

    checkIfExists(packageVar, "Package");

    res.status(200).json({ success: true, data: packageVar });
  } catch (error) {
    next(error);
  }
};

//Create a Package
const createPackage = async (req, res, next) => {
  try {
    const packageVar = await Package.create(req.body);

    res.status(201).json({ success: true, data: packageVar });
  } catch (error) {
    next(error);
  }
};

//Update a Package
const updatePackage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      eventType,
      pricingOptions,
      guestCapacity,
      includedMenus,
      isFeatured,
      image,
    } = req.body;

    const packageVar = await Package.findByIdAndUpdate(
      id,
      {
        name,
        description,
        eventType,
        pricingOptions,
        guestCapacity,
        includedMenus,
        isFeatured,
        image,
      },
      { new: true, runValidators: true }
    );

    checkIfExists(packageVar, "Package");

    res.status(200).json({ success: true, data: packageVar });
  } catch (error) {
    next(error);
  }
};
//Delete a Package
const deletePackage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const packageVar = await Package.findByIdAndDelete(id);

    checkIfExists(packageVar, "Package");

    res
      .status(200)
      .json({ success: true, message: "Package deleted Successfully!" });
  } catch (error) {
    next(error);
  }
};

export { getPackages, getPackage, createPackage, updatePackage, deletePackage };
