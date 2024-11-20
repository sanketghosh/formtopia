import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "@/constants";
import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { ZodError, type z } from "zod";

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
  console.log(`PATH ${req.path}`, error);

  if (error instanceof ZodError) {
    return handleZodError(res, error);
  }

  // sending the response
  res.status(INTERNAL_SERVER_ERROR).json({
    message:
      "ERROR! Something went wrong. Might be some internal server error.",
  });
};
