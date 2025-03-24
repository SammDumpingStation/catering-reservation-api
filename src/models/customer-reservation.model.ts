import Reservation from "@schemas/reservation.schema.js";
import { checkIfExists } from "@utils/checkExistence.js";

export const getCustomerOwnReservations = async (id: string) => {
  const reservation = await Reservation.findById(id);
  checkIfExists(reservation, "Reservation");
  return reservation;
};
