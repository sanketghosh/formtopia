import { BAD_REQUEST, NOT_FOUND, OK, UNAUTHORIZED } from "@/constants";
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

/**
 *
 */
export const fetchFormsHandler = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { sort } = req.query;

    // if unauthorized
    if (!userId) {
      res.status(UNAUTHORIZED).json({
        message: "ERROR! Unauthorized. Cannot fullfil your request.",
      });
    }

    // fetch all forms created by authenticated user
    const forms = await db.form.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        published: true,
        createdAt: true,
        updatedAt: true,
        visitsCount: true,
        submissionsCount: true,
      },
      orderBy: {
        createdAt: sort === "latest" ? "desc" : "asc",
      },
    });

    res.status(OK).json({
      message: "SUCCESS! Forms fetched successfully.",
      data: forms,
    });
  }
);

/**
 *
 */
export const fetchSingleFormHandler = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { formId } = req.params;

    // if not authenticated
    if (!userId) {
      res.status(UNAUTHORIZED).json({
        message: "ERROR! Unauthorized. Cannot fullfil your request.",
      });
    }

    // fetch form by formId and ensure it belongs to the user
    const form = await db.form.findFirst({
      where: {
        id: formId,
        userId: userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        published: true,
        createdAt: true,
        updatedAt: true,
        visitsCount: true,
        submissionsCount: true,
        content: true,
        shareURL: true,
        formSubmissions: {
          select: {
            id: true,
            submittedAt: true,
            content: true,
            city: true,
            country: true,
            browser: true,
            os: true,
            device: true,
          },
        },
      },
    });

    //  if not form
    if (!form) {
      res.status(NOT_FOUND).json({
        message: "ERROR! Form not found or you do not have access to it.",
      });
    }

    res.status(OK).json({
      message: "SUCCESS! Form fetched successfully.",
      data: form,
    });
  }
);

/**
 *
 *
 *
 */
export const updateFormHandler = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { formId } = req.params;
    const { formContent: content } = req.body;

    // if unauthorized
    if (!userId) {
      res.status(UNAUTHORIZED).json({
        message: "ERROR! Unauthorized. Cannot fulfill your request.",
      });
    }

    // Fetch the form to ensure it exists and belongs to the user
    const existingForm = await db.form.findFirst({
      where: {
        id: formId,
        userId: userId,
      },
    });

    if (!existingForm) {
      return res.status(NOT_FOUND).json({
        message: "ERROR! Form not found or you do not have access to it.",
      });
    }

    // Validate content
    if (!content || typeof content !== "string") {
      res.status(BAD_REQUEST).json({
        message: "ERROR! Content is invalid or missing.",
      });
    }

    console.log("Received content:", content); // Debugging log

    // Update the form with new data
    const updatedForm = await db.form.update({
      where: { id: formId },
      data: {
        ...(content && { content }),
        // ...(typeof published === "boolean" && { published }),
      },
    });

    if (!updatedForm) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! Failed to update the form.",
      });
    }

    res.status(OK).json({
      message: "SUCCESS! Form updated successfully.",
      data: updatedForm,
    });
  }
);

/**
 *
 */

export const publishFormHandler = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { formId } = req.params;

    // If unauthorized
    if (!userId) {
      res.status(UNAUTHORIZED).json({
        message: "ERROR! Unauthorized. Cannot fulfill your request.",
      });
    }
    // Fetch the form to ensure it exists and belongs to the user
    const existingForm = await db.form.findFirst({
      where: {
        id: formId,
        userId: userId,
      },
    });

    if (!existingForm) {
      res.status(NOT_FOUND).json({
        message: "ERROR! Form not found or you do not have access to it.",
      });
    }

    // Publish the form
    const publishedForm = await db.form.update({
      where: { id: formId },
      data: { published: true },
    });

    // if form not publish due to an error
    if (!publishedForm) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! Failed to publish the form.",
      });
    }

    res.status(OK).json({
      message: "SUCCESS! Form published successfully.",
      data: publishedForm,
    });
  }
);

/**
 *
 */
export const singleFormStatsHandler = catchErrors(
  async (req: Request, res: Response): Promise<void | any> => {
    const userId = req.userId;
    const { formId } = req.params;

    // If the user is unauthorized
    if (!userId) {
      res.status(UNAUTHORIZED).json({
        message: "ERROR! Unauthorized. User not found.",
      });
    }

    // Check if the form exists and belongs to the user
    const form = await db.form.findFirst({
      where: {
        id: formId,
        userId: userId,
      },
      select: {
        title: true,
        description: true,
        shareURL: true,
      },
    });

    // if form does not exist
    if (!form) {
      res.status(NOT_FOUND).json({
        message: "ERROR! Form not found or you do not have access to it.",
      });
    }

    const { title, description, shareURL } = form as Form;

    // Calculate stats for the specific form
    const stats = await db.form.aggregate({
      where: {
        id: formId,
        userId: userId,
      },
      _sum: {
        visitsCount: true,
        submissionsCount: true,
      },
    });

    // Extract and calculate stats
    const visits = stats._sum.visitsCount || 0;
    const submissions = stats._sum.submissionsCount || 0;
    let submissionRate = 0;
    if (visits > 0) {
      submissionRate = (submissions / visits) * 100;
    }
    const bounceRate = 100 - submissionRate;

    const _data = {
      formId,
      visits,
      submissions,
      submissionRate,
      bounceRate,
      title,
      description,
      shareURL,
    };

    res.status(OK).json({
      message: "SUCCESS! Stats for the form fetched successfully.",
      data: _data,
    });
  }
);

/**
 *
 */
export const getFormByShareUrlHandler = catchErrors(
  async (req: Request, res: Response): Promise<void | any> => {
    // const userId = req.userId;
    const { shareUrl } = req.params;

    // Validate if shareUrl is provided
    if (!shareUrl) {
      return res.status(BAD_REQUEST).json({
        message: "ERROR! Share URL is required.",
      });
    }

    // Find the form using the unique shareUrl
    const form = await db.form.findUnique({
      where: {
        shareURL: shareUrl,
      },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        shareURL: true,
      },
    });

    // If the form is not found
    if (!form) {
      return res.status(NOT_FOUND).json({
        message: "ERROR! Form not found with the provided Share URL.",
      });
    }

    // Increment the visitsCount by 1
    await db.form.update({
      where: { id: form.id },
      data: {
        visitsCount: {
          increment: 1,
        },
      },
    });

    // Respond with the form data
    res.status(OK).json({
      message: "SUCCESS! Form via shareURL fetched successfully.",
      data: {
        title: form.title,
        description: form.description,
        content: form.content,
        shareUrl: form.shareURL,
      },
    });
  }
);
