import Reservation from "@schemas/reservation.schema.js";
import { NextFunction, Request, Response } from "express";
import * as paymentModel from "@models/payment.model.js";
import { createError } from "@utils/authUtils.js";

// Create a new payment
export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reservationId } = req.body;

    // Verify reservation exists
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) throw createError("Reservation not found", 404);

    const payment = await paymentModel.createPayment({
      reservationId,
      status: "partial",
    });

    // // Update reservation payment status if needed
    // if (payment.status !== "pending") {
    //   //This is optonal for now since i dont know if the reservation needs to have payment status
    //   await Reservation.findByIdAndUpdate(reservationId, {
    //     paymentStatus: payment.status,
    //   });
    // }

    res.status(201).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    return next(error);
  }
};
