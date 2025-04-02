import Menu from "@schemas/menu.schema.js";
import { createMenuProps, MenuProps } from "@TStypes/menu.type.js";
import { createError } from "@utils/globalUtils.js";
import { F } from "node_modules/@faker-js/faker/dist/airline-CBNP41sR.js";

export const createMenu: createMenuProps = async (data) => {
  const payload = {
    name: data.name,
    category: data.category,
    available: data.available,
    spicy: data.spicy,
    shortDescription: data.shortDescription,
    fullDescription: data.fullDescription,
    ingredients: data.ingredients,
    allergens: data.allergens,
    preparationMethod: data.preparationMethod,
    regularPricePerPax: data.regularPricePerPax,
    prices: data.prices,
    imageUrl: data.imageUrl,
    perServing: data.perServing,
    nutritionInfo: data.nutritionInfo,
  };

  return await Menu.create(payload);
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
