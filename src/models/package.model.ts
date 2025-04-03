import Package from "@schemas/package.schema.js";
import {
  CateringPackagesProps,
  createPackageProps,
} from "@TStypes/package.type.js";
import { createError } from "@utils/globalUtils.js";

export const createPackage: createPackageProps = async (data) => {
  const payload = {
    name: data.name,
    description: data.description,
    available: data.available,
    pricePerPax: data.pricePerPax,
    pricePerPaxWithServiceCharge: data.pricePerPaxWithServiceCharge,
    minimumPax: data.minimumPax,
    recommendedPax: data.recommendedPax,
    maximumPax: data.maximumPax,
    options: data.options,
    inclusions: data.inclusions,
    serviceHours: data.serviceHours,
    serviceCharge: data.serviceCharge,
    eventType: data?.eventType,
    packageType: data.packageType,
    imageUrl: data?.imageUrl,
  };

  return await Package.create(payload);
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
