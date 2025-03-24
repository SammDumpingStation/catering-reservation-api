import Menu from "@schemas/menu.schema.js";
import { MenuProps } from "@TStypes/menu.type.js";
import { createError } from "@utils/authUtils.js";

export const getMenuById = async (id: string) => {
  const existingMenu = await Menu.findById(id);

  if (!existingMenu) throw createError("Menu doesn't exist!", 404);

  return existingMenu;
};

export const updateMenyById = async ({
  id,
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
}: MenuProps) => {
  const existingMenu = await Menu.findByIdAndUpdate(
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

  if (!existingMenu) throw createError("Menu doesn't exist!", 404);

  return existingMenu;
};

export const deleteMenuById = async (id: string) => {
  const existingMenu = await Menu.findByIdAndDelete(id);

  if (!existingMenu) throw createError("Menu doesn't exist!", 404);

  return existingMenu;
};
