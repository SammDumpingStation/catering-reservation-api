import Menu from "../schemas/menu.schema.js";
import * as menuModel from "../models/menu.model.js";
import { createError } from "@utils/globalUtils.js";
import { FunctionProps } from "@TStypes/global.type.js";

//Get All Menu
const getMenus: FunctionProps = async (req, res, next) => {
  try {
    const menus = await Menu.find();
    if (menus.length === 0) {
      res.sendStatus(204);
      return;
    }

    res.status(200).json({
      success: true,
      data: menus,
    });
  } catch (error) {
    next(error);
  }
};

//Get a Menu
const getMenu: FunctionProps = async (req, res, next) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) throw createError("Menu doesn't exist", 404);

    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    next(error);
  }
};

//Create a Menu
const postMenu: FunctionProps = async (req, res, next) => {
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
const updateMenu: FunctionProps = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (Object.keys(data).length === 0) {
      res.sendStatus(204);
      return;
    }

    const menu = await menuModel.updateMenuById(id, data);
    if (!menu) throw createError("Menu doesn't exist", 404);

    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    next(error);
  }
};

//Delete a Menu
const deleteMenu: FunctionProps = async (req, res, next) => {
  try {
    const existingMenu = await Menu.findByIdAndDelete(req.params.id);

    if (!existingMenu) throw createError("Menu doesn't exist", 404);

    res.status(200).json({
      success: true,
      message: `${existingMenu?.name} deleted Successfully!`,
      data: existingMenu,
    });
  } catch (error) {
    next(error);
  }
};

export { getMenus, getMenu, postMenu, updateMenu, deleteMenu };
