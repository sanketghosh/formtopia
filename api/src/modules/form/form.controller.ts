import { BAD_REQUEST, OK, UNAUTHORIZED } from "@/constants";
import { db } from "@/lib/prisma";
import { catchErrors } from "@/utils/catch-errors";
import type { NextFunction, Request, Response } from "express";
import type { FormCreateSchemaType } from "./form.schema";
import type { Form } from "@prisma/client";

/**
 *
 *
 *
 */
export const formStatsHandler = catchErrors(
  async (req: Request, res: Response): Promise<void | any> => {
    const userId = req.userId;

    // if user does not exist
    if (!userId) {
      res.status(UNAUTHORIZED).json({
        message: "ERROR! Unauthorized. User not found.",
      });
    }

    // stats
    const stats = await db.form.aggregate({
      where: {
        userId: userId,
      },
      _sum: {
        visitsCount: true,
        submissionsCount: true,
      },
    });

    // visits and submissions
    const visits = stats._sum.visitsCount || 0;
    const submissions = stats._sum.submissionsCount || 0;

    // submission rate
    let submissionRate = 0;

    if (visits > 0) {
      submissionRate = (submissions / visits) * 100;
    }

    //  bounce rate
    const bounceRate = 100 - submissionRate;

    const _data = {
      visits,
      submissions,
      submissionRate,
      bounceRate,
    };

    res.status(OK).json({
      message: "SUCCESS! Stats fetched successfully.",
      data: _data,
    });
  }
);

/**
 *
 *
 *
 */
export const formCreateHandler = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId!;
    const { title, description } = req.body as FormCreateSchemaType;

    // if unauthorized
    if (!userId) {
      res.status(UNAUTHORIZED).json({
        message: "ERROR! Unauthorized. Cannot fulfil your request.",
      });
    }

    // create form
    const form = await db.form.create({
      data: {
        userId: userId,
        title: title,
        description: description,
      },
    });

    if (!form) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! Failed to create form.",
      });
    }

    const _data = {
      formId: form.id,
      title: form.title,
      description: form.description,
    };

    res.status(OK).json({
      message: "SUCCESS! Form has been created successfully.",
      data: _data,
    });
  }
);
