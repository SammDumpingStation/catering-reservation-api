import Reservation from "@schemas/reservation.schema.js";
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
