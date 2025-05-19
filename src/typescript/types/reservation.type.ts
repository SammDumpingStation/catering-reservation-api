import mongoose from "mongoose";
import { EventProps } from "./package.type.js";

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

export const paxEnum: PaxArrayType[] = [
  "4-6 pax",
  "8-10 pax",
  "13-15 pax",
  "18-20 pax",
];

export interface MenuReservationDetails {
  quantity: number;
  paxSelected: PaxArrayType;
  pricePerPax: number;
}

export type SelectedMenu = Record<string, MenuReservationDetails>;
export type SelectedMenus = Record<string, SelectedMenu>;

export const reservationEventTypes = [
  "Birthday",
  "Wedding",
  "Corporate",
  "Graduation",
  "Others",
] as const;

export type ReservationEventTypes = (typeof reservationEventTypes)[number];

export const eventTypes = [
  "Birthday",
  "Wedding",
  "Corporate",
  "Graduation",
  "Others",
];
export const serviceTypes = ["Buffet", "Plated"];
export const orderTypes = ["Pickup", "Delivery", ""];
export const serviceHoursOptions = [
  "4 hours",
  "4.5 hours",
  "5 hours",
  "5.5 hours",
  "6 hours",
  "6.5 hours",
  "8 hours",
  "8.5 hours",
  "10 hours",
];

export interface IReservation extends Document {
  fullName: string;
  email: string;
  contactNumber: string;
  selectedPackage?: mongoose.Types.ObjectId;
  selectedMenus: SelectedMenus;
  eventType: ReservationEventTypes;
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
  venue?: string;
  serviceFee: number;
  serviceHours?: HoursArrayTypes;
}

export type CreateReservationProps = (
  data: IReservation
) => Promise<IReservation>;
