import Package from "@schemas/package.schema.js";
import { CateringPackagesProps } from "@TStypes/package.type.js";
import { createError } from "@utils/globalUtils.js";

export const getPackageById = async (id: string) => {
  const pkg = await Package.findById(id);

  if (!pkg) throw createError("Package doesn't exist", 404);
  return pkg;
};

export const updatePackageById = async (
  id: string,
  updatePackage: Partial<CateringPackagesProps>
) => {
  const pkg = await Package.findByIdAndUpdate(id, updatePackage, {
    new: true,
    runValidators: true,
  });

  if (!pkg) throw createError("Package doesn't exist", 404);
  return pkg;
};

export const deletePackageById = async (id: string) => {
  const pkg = await Package.findByIdAndDelete(id);

  if (!pkg) throw createError("Package doesn't exist", 404);
  return pkg;
};
