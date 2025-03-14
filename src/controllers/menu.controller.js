import Menu from "../models/menu.model.js";
import { checkIfExists } from "../utils/checkExistence.js";

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

    const menu = await Menu.findById(id);

    checkIfExists(menu, "Menu");

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
      description,
      price,
      servingSize,
      category,
      dietaryInfo,
      allergens,
      isAvailable,
      mainImage,
      images,
    } = req.body;

    const menu = await Menu.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        servingSize,
        category,
        dietaryInfo,
        allergens,
        isAvailable,
        mainImage,
        images,
      },
      { new: true, runValidators: true }
    );

    checkIfExists(menu, "Menu");

    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    next(error);
  }
};
//Delete a Menu
const deleteMenu = async (req, res, next) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findByIdAndDelete(id);

    checkIfExists(menu, "Menu");

    res
      .status(200)
      .json({ success: true, message: "Menu deleted Successfully!" });
  } catch (error) {
    next(error);
  }
};

export { getMenus, getMenu, createMenu, updateMenu, deleteMenu };
