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

import { FunctionProps } from "@TStypes/global.type.js";
import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateRequest: FunctionProps = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      details: errors.array().map((err) => err.msg), // Return all error messages
    });
    return;
  }

  next();
}; //THIS FUNCTION RETURN ALL ERROR MESSAGES
