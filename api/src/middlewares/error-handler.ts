// packages
import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { ZodError, type z } from "zod";

// local modules
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "@/constants";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));

  res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};


// @ts-ignore
export const errorHandler: ErrorRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  error
) => {

 /*  console.log("Error occurred:", error);
  console.log("Response object keys:", Object.keys(res));
  console.log("Request path:", req.path);

  if (typeof res.status !== "function") {
    console.error("Response object is not valid in errorHandler.");
    return next(error);
  } */

  console.log(`PATH ${req.path}`, error);

  if (error instanceof ZodError) {
    return handleZodError(res, error);
  }

  res.status(INTERNAL_SERVER_ERROR).json({
    message: "ERROR! Internal server error. Something went wrong.",
  });
};
