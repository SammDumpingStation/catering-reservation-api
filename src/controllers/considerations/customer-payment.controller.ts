import Payment from "@schemas/payment.schema.js";
import Reservation from "@schemas/reservation.schema.js";
import { checkIfExists } from "@utils/checkExistence.js";
import { NextFunction, Request, Response } from "express";

export const getCustomerOwnPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = req.user?.id;
    const customerReservations = await Reservation.find({
      customerId: customerId,
    });

    const reservationIds = customerReservations.map((res) => res._id);

    const payments = await Payment.find({
      reservationId: { $in: reservationIds },
    }).populate({
      path: "reservationId",
      select: "eventDate eventType",
    });

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomerReservationPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reservationId } = req.params;
    const reservation = await Reservation.findOne({
      _id: reservationId,
      customerId: req.user?.id,
    });

    checkIfExists(reservation, "Reservation");

    const payment = await Payment.findOne({
      reservationId,
    }).populate({
      path: "reservationId",
      select: "eventDate eventType",
    });

    const validPayment = checkIfExists(payment, "Payment");

    res.status(200).json({
      success: true,
      data: validPayment,
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomerPaymentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId).populate({
      path: "reservationId",
      match: { customerId: req.user?.id },
      select: "eventDate eventType",
    });

    checkIfExists(payment, "Payment");
    checkIfExists(payment?.reservationId, "Reservation");

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

//On hold

export const addCustomerTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { paymentId } = req.params;
    const { amount, method, type } = req.body;

    const payment = await Payment.findById(paymentId)
  } catch (error) {
    next(error);
  }
};
