import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import Customer from "../models/customer.model.js";

const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET);

    const customer = await Customer.findById(decoded.customerId);

    if (!customer) return res.status(401).json({ message: "Unauthorized" });

    req.customer = customer;

    next();
  } catch (error) {
    next(error);
  }
};

export default authorize;
