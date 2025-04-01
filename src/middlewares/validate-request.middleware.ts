// import type { Request, Response, NextFunction } from "express";
// import { validationResult } from "express-validator";

// export const validateRequest = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Get the first error from the array
//     const firstError = errors.array()[0];

//     res.status(400).json({
//       success: false,
//       error: firstError, // Return only the first error message
//     });
//   }

//   next();
// }; //THIS FUNCTION RETURN ONLY THE FIRST ERROR MESSAGE

import { createError } from "@utils/globalUtils.js";
import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw createError(errors.array()[0].msg, 400);

  next();
}; //THIS FUNCTION RETURN ALL ERROR MESSAGES
