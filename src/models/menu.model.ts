import Menu from "@schemas/menu.schema.js";
import { MenuProps } from "@TStypes/menu.type.js";
import { createError } from "@utils/globalUtils.js";

export const getMenuById = async (id: string) => {
  const existingMenu = await Menu.findById(id);

  if (!existingMenu) throw createError("Menu doesn't exist", 404);
  return existingMenu;
};

export const updateMenuById = async (
  id: string,
  updateData: Partial<MenuProps>
) => {
  const existingMenu = await Menu.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!existingMenu) throw createError("Menu doesn't exist", 404);
  return existingMenu;
};

export const deleteMenuById = async (id: string) => {
  const existingMenu = await Menu.findByIdAndDelete(id);

  if (!existingMenu) throw createError("Menu doesn't exist", 404);
  return existingMenu;
};
