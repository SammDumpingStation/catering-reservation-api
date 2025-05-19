// middleware/auth.ts
// import Reservation from "@schemas/reservation.schema.js";
import Payment from "@schemas/payment.schema.js";
import { createError } from "@utils/globalUtils.js";
import { IDecodedAccessToken } from "@TStypes/auth.type.js";
import { FunctionProps } from "@TStypes/global.type.js";
import { verifyToken } from "@utils/authUtils.js";

// Define protected routes with HTTP methods
// Format: { path: string, methods: string[] }
export const protectedRoutes = [
  { path: "/api/customers", methods: ["GET", "PUT", "DELETE"] },
  { path: "/api/menus", methods: ["POST", "PUT", "DELETE"] },
  { path: "/api/packages", methods: ["POST", "PUT", "DELETE"] },
  { path: "/api/reservations", methods: ["GET", "PUT", "DELETE"] },
];

// Middleware to check if the current route requires authentication
export const authenticatedRoutes: FunctionProps = (req, res, next) => {
  const currentPath = req.path;
  const currentMethod = req.method;

  // Check if the current path and method combination requires authentication
  const requiresAuth = protectedRoutes.some(
    (route) =>
      currentPath.startsWith(route.path) &&
      route.methods.includes(currentMethod)
  );

  // If authentication is not required for this path+method, proceed
  if (!requiresAuth) return next();

  // For protected routes, verify authentication
  // const bearerHeader = req.headers.authorization; // temporary commented this lets focus first to web
  // const access_token = bearerHeader?.startsWith("Bearer ")
  //   ? bearerHeader.split(" ")[1]
  //   : req.signedCookies["access_token"];

  const { access_token } = req.signedCookies;

  if (!access_token) throw createError("Authentication required", 401);

  const decoded = verifyToken(access_token, "access");
  if (!decoded) throw createError("Invalid or expired access token", 403);

  const { customerId, role, email } = decoded as IDecodedAccessToken;
  req.user = { id: customerId, role, email };

  next();
};

// Middleware to check if user is a caterer
export const isCaterer: FunctionProps = (req, res, next) => {
  if (!req.user || req.user.role !== "caterer")
    throw createError("Caterer access required", 403);

  next();
};

// Middleware to check if user is a customer
export const isCustomer: FunctionProps = (req, res, next) => {
  if (!req.user || req.user.role !== "customer")
    throw createError("Customer access required", 403);

  next();
};

// Middleware to check if the user is authorized to access/edit their own profile
export const isSelf: FunctionProps = (req, res, next) => {
  try {
    if (req.user.id !== req.params.id)
      throw createError(
        "Access denied. You can only access your own data",
        403
      );

    next();
  } catch (error) {
    next(error);
  }
};

export const isSelfOrCaterer: FunctionProps = (req, res, next) => {
  try {
    if (req.user.role === "caterer") {
      next();
      return;
    }

    if (req.user.id !== req.params.id)
      throw createError(
        "Access denied. You can only access your own data",
        403
      );

    next();
  } catch (error) {
    next(error);
  }
};

export const isOwnReservationOrCaterer: FunctionProps = (req, res, next) => {
  try {
    if (req.user.role === "caterer") {
      next();
      return;
    }

    if (req.user.email !== req.params.email)
      throw createError(
        "Access denied. You cant only access your own data",
        403
      );

    next();
  } catch (error) {
    next(error);
  }
};
