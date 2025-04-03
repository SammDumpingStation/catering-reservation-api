import { NextFunction, Request, Response } from "express";
import Package from "../schemas/package.schema.js";
import * as PackageModel from "@models/package.model.js";
import { checkIfExists } from "../utils/checkExistence.js";
import { createError } from "@utils/globalUtils.js";

//Get All Package
const getPackages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const packages = await Package.find();
    if (packages.length === 0) {
      res.sendStatus(204);
      return;
    }

    res.status(200).json({ success: true, data: packages });
  } catch (error) {
    next(error);
  }
};

//Get All Featured Package
const featuredPackages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
const getPackage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) throw createError("Package doesn't exist", 404);

    res.status(200).json({ success: true, data: pkg });
  } catch (error) {
    next(error);
  }
};

//Create a Package
const createPackage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pkg = await Package.create(req.body);

    res.status(201).json({ success: true, data: pkg });
  } catch (error) {
    next(error);
  }
};

//Update a Package
const updatePackage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      pricePerPax,
      minimumPax,
      recommendedPax,
      maximumPax,
      serviceHours,
      serviceCharge,
      options,
      inclusions,
      imageUrl,
      rating,
      ratingCount,
    } = req.body;

    const pkg = await PackageModel.updatePackageById(id, {
      name,
      description,
      pricePerPax,
      minimumPax,
      recommendedPax,
      maximumPax,
      serviceHours,
      serviceCharge,
      options,
      inclusions,
      imageUrl,
      rating,
      ratingCount,
    });
    res.status(200).json({ success: true, data: pkg });
  } catch (error) {
    next(error);
  }
};
//Delete a Package
const deletePackage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const pkg = await PackageModel.deletePackageById(id);
    res
      .status(200)
      .json({ success: true, message: "Package deleted Successfully!" });
  } catch (error) {
    next(error);
  }
};

export {
  getPackages,
  featuredPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage,
};
