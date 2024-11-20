// packages
import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload, type VerifyErrors } from "jsonwebtoken";
import { z } from "zod";
import dotenv from "dotenv";

// dotenv init
dotenv.config();

// local modules
import { FORBIDDEN, UNAUTHORIZED } from "@/constants";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// env parser
const EnvSchema = z.object({
  JWT_SECRET_KEY: z.string(),
});
const processEnv = EnvSchema.parse(process.env);

const jwtSecretKey = processEnv.JWT_SECRET_KEY;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): any | unknown => {
  const token = req.cookies["auth_token"];

  if (!token) {
    return res.status(UNAUTHORIZED).json({
      message: "ERROR! Not authorized.",
    });
  }

  jwt.verify(
    token,
    jwtSecretKey,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        return res.status(FORBIDDEN).json({
          message: "ERROR! Token is not valid.",
        });
      }

      if (decoded && typeof decoded === "object") {
        req.userId = (decoded as JwtPayload).id as string;
        next();
      } else {
        return res.status(FORBIDDEN).json({
          message: "ERROR! Token is not valid.",
        });
      }
    }
  );
};
