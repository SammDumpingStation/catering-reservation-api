import { Document } from "mongoose";
import { ObjectId, statusEnums, StringEnums } from "./global.type.js";

//Define Enum Constants

export const soupOptions: StringEnums = [
  "Sinigang na Baboy",
  "Bulalo",
  "Tinolang Manok",
  "Nilagang Baka",
];

export const saladOptions: StringEnums = [
  "Ensaladang Talong",
  "Kinilaw na Tuna",
  "Enseladang Mangga",
  "Lato Salad",
];

export const chickenOptions: StringEnums = [
  "Chicken Adobo",
  "Chicken Inasal",
  "Chicken Afritada",
  "Fried Chicken with Gravy",
];

export const porkOptions: StringEnums = [
  "Lechon Kawali",
  "Pork Adobo",
  "Crispy Pata",
  "Sisig",
];

export const beefOptions: StringEnums = [
  "Beef Caldereta",
  "Beef Mechado",
  "Bistek Tagalog",
  "Beef Kare-Kare",
];

export const seafoodOptions: StringEnums = [
  "Beef Caldereta",
  "Beef Mechado",
  "Bistek Tagalog",
  "Beef Kare-Kare",
];

export const vegetableOptions: StringEnums = [
  "Pinakbet",
  "Ginisang Ampalaya",
  "Laing",
  "Ginataang Kalabasa at Sitaw",
];

export const noodleOptions: StringEnums = [
  "Pancit Canton",
  "Pancit Bihon",
  "Pancit Palabok",
  "Pancit Malabon",
];

export const dessertOptions: StringEnums = [
  "Halo-Halo",
  "Leche Flan",
  "Biko",
  "Bibingka",
];

export const beverageOptions: StringEnums = [
  "Sago't Gulaman",
  "Calamansi Juice",
  "Buko Juice",
  "Tsokolate",
];


export interface CustomerDetailsProps {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: number;
}

export interface EventDetailsProps {
  type: string;
  date: Date;
  time: Date;
  numberOfGuests: number;
  venue: string;
  serviceType: string;
  serviceHours: number;
}

export interface MenuSelectionProps {
  soupOptions: (typeof soupOptions)[number][];
  saladOptions: (typeof saladOptions)[number][];
  chickenOptions: (typeof chickenOptions)[number][];
  porkOptions: (typeof porkOptions)[number][];
  beefOptions: (typeof beefOptions)[number][];
  seafoodOptions: (typeof seafoodOptions)[number][];
  vegetableOptions: (typeof noodleOptions)[number][];
  noodleOptions: (typeof noodleOptions)[number][];
  dessertOptions: (typeof dessertOptions)[number][];
  beverageOptions: (typeof beverageOptions)[number][];
}

export interface CostDetailsProps {
  totalReservationCost: number;
  minimumDownPayment: number;
  downPaymentPaid: number;
}

export interface ReservationProps extends Document {
  customerId: ObjectId;
  customerDetails: CustomerDetailsProps;
  eventDetails: EventDetailsProps;
  menuSelection: MenuSelectionProps;
  specialRequests: string;
  costDetails: CostDetailsProps;
  status: (typeof statusEnums)[number];
  paymentStatus: (typeof statusEnums)[number];
}
