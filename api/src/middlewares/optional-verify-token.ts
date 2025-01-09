import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload, type VerifyErrors } from "jsonwebtoken";
import { z } from "zod";
import dotenv from "dotenv";

// dotenv init
dotenv.config();

// env parser
const EnvSchema = z.object({
  JWT_SECRET_KEY: z.string(),
});
const processEnv = EnvSchema.parse(process.env);

const jwtSecretKey = processEnv.JWT_SECRET_KEY;

// Middleware for optional authentication
export const optionalVerifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies["auth_token"];

  if (!token) {
    // No token provided; continue without setting `userId`
    req.userId = undefined;
    return next();
  }

  jwt.verify(
    token,
    jwtSecretKey,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        // Token is invalid; continue without setting `userId`
        req.userId = undefined;
        return next();
      }

      if (decoded && typeof decoded === "object") {
        // Token is valid; set `userId` from token payload
        req.userId = (decoded as JwtPayload).id as string;
      } else {
        // Unexpected token structure; continue without setting `userId`
        req.userId = undefined;
      }

      next();
    }
  );
};
