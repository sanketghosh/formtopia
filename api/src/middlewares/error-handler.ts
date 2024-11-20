import { BAD_REQUEST } from "@/constants";
import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import type { z } from "zod";

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
const errorHandler: ErrorRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  error
) => {
  console.log(`PATH ${req.path}`, error);
};

export default errorHandler;
