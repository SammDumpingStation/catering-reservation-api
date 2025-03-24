import Menu from "../schemas/menu.schema.js";
import * as menuModel from "../models/menu.model.js";

//Get All Menu
const getMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find();

    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    next(error);
  }
};

//Get a Menu
const getMenu = async (req, res, next) => {
  try {
    const { id } = req.params;

    const menu = await menuModel.getMenuById(id);

    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    next(error);
  }
};

//Create a Menu
const createMenu = async (req, res, next) => {
  try {
    const menu = await Menu.create(req.body);

    res.status(201).json({ success: true, data: menu });
  } catch (error) {
    next(error);
  }
};

//Update a Menu
const updateMenu = async (req, res, next) => {
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

    const menu = await menuModel.updateMenyById(id, {
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
const deleteMenu = async (req, res, next) => {
  try {
    const { id } = req.params;

    const menu = await menuModel.deleteMenuById(id);

    res
      .status(200)
      .json({ success: true, message: `${menu.name} deleted Successfully!` });
  } catch (error) {
    next(error);
  }
};

export { getMenus, getMenu, createMenu, updateMenu, deleteMenu };
