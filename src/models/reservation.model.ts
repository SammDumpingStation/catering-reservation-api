import Reservation from "@schemas/reservation.schema.js";
import { ReservationProps } from "@TStypes/reservation.type.js";
import { createError } from "@utils/authUtils.js";
import { checkIfExists } from "@utils/checkExistence.js";

export const getReservationsByCustomerId = async (customerId: string) => {
  const reservations = await Reservation.find({ customerId }).populate(
    "customerId",
    "fullName"
  );

  if (!reservations) throw createError("Reservations not found", 404);

  return reservations;
};

export const getReservationById = async (id: string) => {
  const reservation = await Reservation.findById(id);

  if (!reservation) throw createError("Reservation not found", 404);

  return reservation;
};

export const updateReservationById = async (
  id: string,
  updateData: Partial<ReservationProps>
) => {
  const existingReservation = await Reservation.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!existingReservation) throw createError("Reservation not found", 404);

  return existingReservation;
};

export const deleteReservationById = async (id: string) => {
  const reservation = await Reservation.findByIdAndDelete(id);

  if (!reservation) throw createError("Reservation not found", 404);

  return reservation;
};
