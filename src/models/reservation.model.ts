import Reservation from "@schemas/reservation.schema.js";
import { IReservation } from "@TStypes/reservation.type.js";
import { createError } from "@utils/globalUtils.js";

export const getReservationById = async (id: string) => {
  const reservation = await Reservation.findById(id);

  if (!reservation) throw createError("Reservation not found", 404);
  return reservation;
};

export const updateReservationById = async (
  id: string,
  updateData: Partial<IReservation>
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
