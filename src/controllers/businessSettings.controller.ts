import cloudinary from "@libs/cloudinary.js";
import BusinessSettings from "@schemas/businessSettings.schema.js";
import { FunctionProps } from "@TStypes/global.type.js";
import { createError } from "@utils/globalUtils.js";
import fs from "fs";
import * as businessSettingsModel from "@models/businessSettings.model.js";

const getBusinessSettingsInfo: FunctionProps = async (req, res, next) => {
  try {
    const businessSettings = await BusinessSettings.findOne();
    if (!businessSettings)
      throw createError("No business settings data found", 404);

    res.status(200).json({ success: true, data: businessSettings });
  } catch (error) {
    next(error);
  }
};

const updateBusinessSettingsInfo: FunctionProps = async (req, res, next) => {
  try {
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

    const businessSettings = await businessSettingsModel.updateBusinessSettings(
      data
    );
    if (!businessSettings)
      throw createError("No business settings data found", 404);

    res.status(200).json({ success: true, data: businessSettings });
  } catch (error) {
    next(error);
  }
};

export { getBusinessSettingsInfo, updateBusinessSettingsInfo };
