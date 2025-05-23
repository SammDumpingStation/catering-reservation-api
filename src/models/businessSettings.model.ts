import BusinessSettings from "@schemas/businessSettings.schema.js";
import { UpdateBusinessSettingsProps } from "@TStypes/businessSettings.type.js";

export const updateBusinessSettings: UpdateBusinessSettingsProps = async (
  data
) => {
  // Destructure all possible fields from data (optional)
  const {
    businessName,
    address,
    map,
    tagline,
    systemName,
    businessLogo,
    businessHours,
    businessDays,
    socialMediaLinks,
  } = data;

  // Find the single business settings document and update it
  const updatedBusinessSettings = await BusinessSettings.findOneAndUpdate(
    {}, // empty filter because you only have one document
    {
      ...(businessName !== undefined && { businessName }),
      ...(address !== undefined && { address }),
      ...(map !== undefined && { map }),
      ...(tagline !== undefined && { tagline }),
      ...(systemName !== undefined && { systemName }),
      ...(businessLogo !== undefined && { businessLogo }),
      ...(businessHours !== undefined && { businessHours }),
      ...(businessDays !== undefined && { businessDays }),
      ...(socialMediaLinks !== undefined && { socialMediaLinks }),
    },
    { new: true, upsert: true } // return the updated doc, create if not exists
  );

  return updatedBusinessSettings;
};
