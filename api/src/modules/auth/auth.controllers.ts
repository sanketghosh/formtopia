// packages
import type { NextFunction, Request, Response } from "express";
import type { User } from "@prisma/client";

// local modules
import { BAD_REQUEST, OK, TOKEN_EXP_AGE, UNAUTHORIZED } from "@/constants";
import type {
  LoginSchemaType,
  RegisterSchemaType,
} from "@/modules/auth/auth.schema";
import { db } from "@/lib/prisma";
import { catchErrors } from "@/utils/catch-errors";
import { jwtGenerator } from "@/utils/jwt-generator";

export const registerHandler = catchErrors(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any | void> => {
    const { email, password, username } = req.body as RegisterSchemaType;

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    // if user exists with same email send error
    if (user) {
      return res.status(UNAUTHORIZED).json({
        message: "ERROR! Bad request. You cannot register.",
      });
    }

    // hash password
    const hashedPassword = await Bun.password.hash(password);

    // create new user
    const createdUser = await db.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    const { password: _password, ..._data } = createdUser;

    // get token from token generator
    const { jwtToken } = jwtGenerator(createdUser.id);

    res
      .cookie("auth_token", jwtToken, {
        httpOnly: true,
        maxAge: TOKEN_EXP_AGE,
        // secure: true // in prod un-comment
      })
      .status(OK)
      .json({
        message: "SUCCESS! User has been registered.",
        data: _data,
      });
  }
);

export const loginHandler = catchErrors(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any | void> => {
    const { email, password } = req.body as LoginSchemaType;

    // if no email exists
    if (!email) {
      return res.status(BAD_REQUEST).json({
        message: "ERROR! Bad request. Password is required.",
      });
    }

    // find user
    const existedUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    // if user does not exist
    if (!existedUser) {
      return res.status(UNAUTHORIZED).json({
        message:
          "ERROR! Unauthorized. Cannot login, check your credentials and try again.",
      });
    }

    // assert that existedUser is not null
    const user = existedUser as User;

    // compare password
    let comparePassword = await Bun.password.verify(password, user.password);

    // if compare
    if (!comparePassword) {
      return res.status(UNAUTHORIZED).json({
        message: "ERROR! The credentials you provided are invalid.",
      });
    }

    // get token from token generator
    const { jwtToken } = jwtGenerator(user.id);

    const { password: _password, ..._data } = user;

    res
      .cookie("auth_token", jwtToken, {
        httpOnly: true,
        maxAge: TOKEN_EXP_AGE,
        // secure: true // in prod un-comment
      })
      .status(OK)
      .json({
        message: "SUCCESS! You have been logged in.",
        data: _data,
      });
  }
);

export const logoutHandler = catchErrors(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any | void> => {
    res.clearCookie("auth_token").status(200).json({
      message: "SUCCESS! You have been logged out.",
    });
  }
);
