import Package from "@schemas/package.schema.js";
import { PackageProps } from "@TStypes/package.type.js";
import { checkIfExists } from "@utils/checkExistence.js";

export const getPackageById = async (id: string) => {
  const pkg = await Package.findById(id);
  checkIfExists(pkg, "Package");
  return pkg;
};

export const updatePackageById = async (
  id: string,
  updatePackage: Partial<PackageProps>
) => {
  const pkg = await Package.findByIdAndUpdate(id, updatePackage, {
    new: true,
    runValidators: true,
  });
  checkIfExists(pkg, "Package");
  return pkg;
};

export const deletePackageById = async (id: string) => {
  const pkg = await Package.findByIdAndDelete(id);
  checkIfExists(pkg, "Package");
  return pkg;
};
