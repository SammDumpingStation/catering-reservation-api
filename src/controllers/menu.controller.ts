import { Request, Response, NextFunction } from "express";
import Menu from "../schemas/menu.schema.js";
import * as menuModel from "../models/menu.model.js";
import { createError } from "@utils/globalUtils.js";

//Get All Menu
const getMenus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const menus = await Menu.find();

    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    next(error);
  }
};

//Get a Menu
const getMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) throw createError("Menu doesn't exist", 404);

    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    next(error);
  }
};

//Create a Menu
const postMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const existingMenu = await Menu.findOne({
      name: data.name,
      category: data.category,
    });
    if (existingMenu) throw createError("Menu already exists", 400);

    const menu = await menuModel.createMenu(data);

    res.status(201).json({ success: true, data: menu });
  } catch (error) {
    next(error);
  }
};

//Update a Menu
const updateMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      available,
      shortDescription,
      fullDescription,
      ingredients,
      allergens,
      preparationMethod,
      prices,
      regularPricePerPax,
      imageUrl,
      rating,
      ratingCount,
      spicy,
      perServing,
      nutritionInfo,
    } = req.body;

    const menu = await menuModel.updateMenuById(id, {
      name,
      category,
      available,
      shortDescription,
      fullDescription,
      ingredients,
      allergens,
      preparationMethod,
      prices,
      regularPricePerPax,
      imageUrl,
      rating,
      ratingCount,
      spicy,
      perServing,
      nutritionInfo,
    });

    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    next(error);
  }
};
//Delete a Menu
const deleteMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const menu = await menuModel.deleteMenuById(id);

    res
      .status(200)
      .json({ success: true, message: `${menu?.name} deleted Successfully!` });
  } catch (error) {
    next(error);
  }
};

export { getMenus, getMenu, postMenu, updateMenu, deleteMenu };
