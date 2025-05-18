export type ServiceType = "Buffet" | "Plated";

export type HoursArrayTypes =
  | "4 hours"
  | "4.5 hours"
  | "5 hours"
  | "5.5 hours"
  | "6 hours"
  | "6.5 hours"
  | "8 hours"
  | "8.5 hours"
  | "10 hours";

export type PaxArrayType = "4-6 pax" | "8-10 pax" | "13-15 pax" | "18-20 pax";

export interface MenuReservationDetails {
  quantity: number;
  paxSelected: PaxArrayType;
  pricePerPax: number;
}

export type SelectedMenu = Record<string, MenuReservationDetails>;
export type SelectedMenus = Record<string, SelectedMenu>;

export interface IReservation extends Document {
  fullName: string;
  email: string;
  contactNumber: string;
  selectedPackage: string;
  selectedMenus: SelectedMenus;
  eventType: string;
  guestCount: number;
  serviceType: ServiceType;
  orderType: "Pickup" | "Delivery" | "";
  reservationDate: Date;
  reservationTime: string;
  deliveryFee?: number;
  deliveryAddress?: string;
  deliveryInstructions?: string;
  totalPrice: number;
  specialRequests?: string;
  venue: string;
  serviceFee: number;
  serviceHours?: HoursArrayTypes;
}
