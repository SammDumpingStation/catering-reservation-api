import Menu from "@schemas/menu.schema.js";
import { MenuProps } from "@TStypes/menu.type.js";
import { checkIfExists } from "@utils/checkExistence.js";

export const getMenuById = async (id: string) => {
  const existingMenu = await Menu.findById(id);
  checkIfExists(existingMenu, "Menu");
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

  checkIfExists(existingMenu, "Menu");
  return existingMenu;
};

export const deleteMenuById = async (id: string) => {
  const existingMenu = await Menu.findByIdAndDelete(id);
  checkIfExists(existingMenu, "Menu");
  return existingMenu;
};
