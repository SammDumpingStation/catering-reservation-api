import Payment from "../schemas/payment.schema.js";
import { checkIfExists } from "../utils/checkExistence.js";

//Get All Payment
const getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find();

    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    next(error);
  }
};

//Get a Payment
const getPayment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);

    checkIfExists(Payment, "Payment");

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};

//Create a Payment
const createPayment = async (req, res, next) => {
  try {
    const payment = await Payment.create(req.body);

    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};

//Update a Payment
const updatePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reservationId, transactions, status } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      id,
      {
        reservationId,
        transactions,
        status,
      },
      { new: true, runValidators: true }
    );

    checkIfExists(payment, "Payment");

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};
//Delete a Payment
const deletePayment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findByIdAndDelete(id);

    checkIfExists(payment, "Payment");

    res
      .status(200)
      .json({ success: true, message: "Payment deleted Successfully!" });
  } catch (error) {
    next(error);
  }
};

export { getPayments, getPayment, createPayment, updatePayment, deletePayment };
