export type SocialMediaLink = {
  platform: string;
  url: string;
};

export type MapInfo = {
  link: string;
  embeddedLink: string;
  zoom: number;
  address: string;
};

export interface IBusinessSettings extends Document {
  businessName: string;
  address: string;
  map: MapInfo;
  tagline: string;
  systemName: string;
  businessLogo: string;
  businessHours: string;
  businessDays: string;
  socialMediaLinks: SocialMediaLink[];
}

export type UpdateBusinessSettingsProps = (
  data: Partial<
    Omit<IBusinessSettings, "_id" | "createdAt" | "updatedAt" | "__v">
  >
) => Promise<IBusinessSettings | null>;
