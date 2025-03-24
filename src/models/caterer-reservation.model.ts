import Reservation from "@schemas/reservation.schema.js";
import { ReservationProps } from "@TStypes/reservation.type.js";
import { checkIfExists } from "@utils/checkExistence.js";

export const getCustomerReservationsById = async (customerId: string) => {
  const reservations = await Reservation.find({ customerId }).populate(
    "customerId",
    "fullName"
  );
  checkIfExists(reservations, "Reservations");
  return reservations;
};

export const getReservationById = async (id: string) => {
  const reservation = await Reservation.findById(id);
  checkIfExists(reservation, "Reservation");
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
  checkIfExists(existingReservation, "Reservation");
  return existingReservation;
};

export const deleteReservationById = async (id: string) => {
  const reservation = await Reservation.findByIdAndDelete(id);
  checkIfExists(reservation, "CatererReservation");
  return reservation;
};
