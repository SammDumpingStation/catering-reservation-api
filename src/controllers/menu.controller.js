import Menu from "../schemas/menu.schema.js";
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

    const menu = await Menu.findByIdAndUpdate(
      id,
      {
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
