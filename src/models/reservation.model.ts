import Reservation from "@schemas/reservation.schema.js";
import {
  CreateReservationProps,
  UpdateReservationByIdProps,
} from "@TStypes/reservation.type.js";

export const createReservation: CreateReservationProps = async (data) => {
  const payload = {
    fullName: data.fullName,
    email: data.email,
    contactNumber: data.contactNumber,
    selectedPackage: data?.selectedPackage,
    selectedMenus: data.selectedMenus,
    eventType: data.eventType,
    guestCount: data.guestCount,
    serviceType: data.serviceType,
    orderType: data.orderType,
    reservationDate: data.reservationDate,
    reservationTime: data.reservationTime,
    deliveryFee: data?.deliveryFee,
    deliveryAddress: data?.deliveryAddress,
    deliveryInstructions: data?.deliveryInstructions,
    totalPrice: data.totalPrice,
    specialRequests: data?.specialRequests,
    venue: data?.venue,
    serviceFee: data.serviceFee,
    serviceHours: data?.serviceHours,
  };

  return await Reservation.create(payload);
};

export const updateReservationById: UpdateReservationByIdProps = async (
  id,
  data
) => {
  const updatedData = {
    fullName: data.fullName,
    email: data.email,
    contactNumber: data.contactNumber,
    selectedPackage: data?.selectedPackage,
    selectedMenus: data.selectedMenus,
    eventType: data.eventType,
    guestCount: data.guestCount,
    serviceType: data.serviceType,
    orderType: data.orderType,
    reservationDate: data.reservationDate,
    reservationTime: data.reservationTime,
    deliveryFee: data?.deliveryFee,
    deliveryAddress: data?.deliveryAddress,
    deliveryInstructions: data?.deliveryInstructions,
    totalPrice: data.totalPrice,
    specialRequests: data?.specialRequests,
    venue: data?.venue,
    serviceFee: data.serviceFee,
    serviceHours: data?.serviceHours,
  };

  return await Reservation.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
};
