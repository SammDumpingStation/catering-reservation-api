import {
  getBusinessSettingsInfo,
  updateBusinessSettingsInfo,
} from "@controllers/businessSettings.controller.js";
import { isCaterer } from "@middlewares/auth.middleware.js";
import { Router } from "express";

const businessSettingsRouter = Router();

// Get Business Settings Info
businessSettingsRouter.get("/", getBusinessSettingsInfo);

// Update Business Settings
businessSettingsRouter.put("/", updateBusinessSettingsInfo);

export default businessSettingsRouter;
