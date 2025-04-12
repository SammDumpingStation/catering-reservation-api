import Package from "@schemas/package.schema.js";
import {
  CreatePackageProps,
  UpdatePackageByIdProps,
} from "@TStypes/package.type.js";

export const createPackage: CreatePackageProps = async (data) => {
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

export const updatePackageById: UpdatePackageByIdProps = async (id, data) => {
  const updatedData = {
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

  return await Package.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
};
