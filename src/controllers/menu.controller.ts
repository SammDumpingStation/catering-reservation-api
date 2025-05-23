import Menu from "../schemas/menu.schema.js";
import * as menuModel from "../models/menu.model.js";
import { createError } from "@utils/globalUtils.js";
import { FunctionProps } from "@TStypes/global.type.js";
import { io } from "@libs/socket.js";

//Get All Menu
const getMenus: FunctionProps = async (req, res, next) => {
  try {
    const menus = await Menu.find();

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

    // Emit event to all clients when menu is created
    io.emit("menuCreated", menu);

    res.status(201).json({
      success: true,
      message: `${data.name} is added to menus`,
      data: menu,
    });
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
      throw createError("Update data cannot be empty", 400);
    }

    const menu = await menuModel.updateMenuById(id, data);
    if (!menu) throw createError("Menu doesn't exist", 404);

    // Emit event to all clients when menu is updated
    io.emit("menuUpdated", menu);

    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    next(error);
  }
};

//Delete a Menu
const deleteMenu: FunctionProps = async (req, res, next) => {
  try {
    const deletedMenu = await Menu.findByIdAndDelete(req.params.id);

    if (!deletedMenu) throw createError("Menu doesn't exist", 404);

    io.emit("menuDeleted", deletedMenu); // 👈 Emit the deleted menu

    res.status(200).json({
      success: true,
      message: `${deletedMenu?.name} deleted Successfully!`,
      data: deletedMenu,
    });
  } catch (error) {
    next(error);
  }
};

export { getMenus, getMenu, postMenu, updateMenu, deleteMenu };
