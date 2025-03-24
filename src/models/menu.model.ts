import Menu from "@schemas/menu.schema.js";
import { createError } from "@utils/authUtils.js";

export const getMenuById = async (id: string) => {
  const existingMenu = await Menu.findById(id);

  if (!existingMenu) throw createError("Menu doesn't exist!", 404);

  return existingMenu;
};
