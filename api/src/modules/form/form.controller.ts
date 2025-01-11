import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  FORBIDDEN,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
  UNPROCESSABLE_CONTENT,
} from "@/constants";
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
        isTrashed: true,
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
            continent: true,
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
    const { submissionAccess } = req.body;

    // If unauthorized
    if (!userId) {
      res.status(UNAUTHORIZED).json({
        message: "ERROR! Unauthorized. Cannot fulfill your request.",
      });
    }

    // validate submissionAccess value
    if (
      submissionAccess &&
      !["everyone", "authenticated"].includes(submissionAccess)
    ) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! Invalid submission access value.",
      });
    }

    // Fetch the form to ensure it exists and belongs to the user
    const existingForm = await db.form.findFirst({
      where: {
        id: formId,
        userId: userId,
      },
      select: {
        content: true,
      },
    });

    if (!existingForm) {
      res.status(NOT_FOUND).json({
        message: "ERROR! Form not found or you do not have access to it.",
      });
    }

    // check if existing form content is empty
    if (
      !existingForm?.content ||
      JSON.parse(existingForm.content).length === 0
    ) {
      return res.status(BAD_REQUEST).json({
        message: "ERROR! Form content cannot be empty.",
      });
    }

    // Publish the form
    const publishedForm = await db.form.update({
      where: { id: formId },
      data: {
        published: true,
        submissionAccess: submissionAccess || "everyone", //default to "everyone" if not provided
      },
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
        published: true,
      },
    });

    // if form does not exist
    if (!form) {
      res.status(NOT_FOUND).json({
        message: "ERROR! Form not found or you do not have access to it.",
      });
    }

    const { title, description, shareURL, published } = form as Form;

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
      published,
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
        published: true,
        submissionAccess: true,
      },
    });

    // If the form is not found
    if (!form) {
      return res.status(NOT_FOUND).json({
        message: "ERROR! Form not found with the provided Share URL.",
      });
    }

    // today's date
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    // start a transaction to update visitsCount in both Form and FormDailyStats
    await db.$transaction(async (tx) => {
      // increment visitsCount in the Form model
      await tx.form.update({
        where: {
          id: form.id,
        },
        data: {
          visitsCount: {
            increment: 1,
          },
        },
      });

      // increment visitsCount in the FormDailyStats
      await tx.formDailyStats.upsert({
        where: {
          formId_date: {
            formId: form.id,
            date: todayStart,
          },
        },
        create: {
          formId: form.id,
          date: todayStart,
          visitsCount: 1,
          cities: {},
          countries: {},
          continents: {},
          devices: {},
        },
        update: {
          visitsCount: {
            increment: 1,
          },
        },
      });
    });

    // Increment the visitsCount by 1
    /* await db.form.update({
      where: { id: form.id },
      data: {
        visitsCount: {
          increment: 1,
        },
      },
    }); */

    // Respond with the form data
    res.status(OK).json({
      message: "SUCCESS! Form via shareURL fetched successfully.",
      data: {
        title: form.title,
        description: form.description,
        content: form.content,
        shareUrl: form.shareURL,
        published: form.published,
        submissionAccess: form.submissionAccess,
        formId: form.id,
      },
    });
  }
);

/**
 *
 *
 *
 */
export const fetchFormWithSubmissionsHandler = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { formId } = req.params;

    if (!userId) {
      res.status(UNAUTHORIZED).json({
        message: "ERROR! User is not authorized.",
      });
    }

    const formWithSubmissions = await db.form.findUnique({
      where: {
        id: formId,
        userId: userId,
      },
      include: {
        formSubmissions: true,
      },
    });

    res.status(OK).json({
      message: "SUCCESS! Form submissions fetched",
      data: formWithSubmissions,
    });
  }
);

/***
 *
 *
 *
 *
 */

export const formSubmitHandler = catchErrors(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    const userId = req.userId;
    const { shareUrl } = req.params;
    const { content, device } = req.body;

    const location = await fetch(`http://ip-api.com/json`);
    const { city, country, timezone } = await location.json();

    let extractContinent = timezone.split("/");
    const continent = extractContinent.length > 1 ? extractContinent[0] : null;

    // validate if content is available
    if (!content) {
      return res.status(BAD_REQUEST).json({
        message: "ERROR! Content is required to submit the form.",
      });
    }

    // Find the form using the shareUrl
    const form = await db.form.findUnique({
      where: {
        shareURL: shareUrl,
        published: true,
      },
    });

    // if there is no form or form is not published
    if (!form || !form.published) {
      return res.status(BAD_REQUEST).json({
        message: "ERROR! Form not found.",
      });
    }

    // enforce submission access rules based on the form's submissionAccess
    if (form.submissionAccess === "authenticated" && !userId) {
      return res.status(FORBIDDEN).json({
        message: "ERROR! Only authenticated users can submit this form.",
      });
    }

    // checking if the authenticated user has already submitted the form
    if (userId) {
      const existingSubmissionByUser = await db.formSubmission.findFirst({
        where: {
          formId: form.id,
          userId: userId, // must match the authenticated user's submission
        },
      });
      // if a submission exists, prevent duplicate submission
      if (existingSubmissionByUser) {
        res.status(BAD_REQUEST).json({
          message: "ERROR! You have already submitted this form.",
        });
      }
    }

    // today
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const submission = await db.$transaction(async (tx) => {
      // save the form submission
      const newSubmission = await tx.formSubmission.create({
        data: {
          formId: form.id,
          userId: userId || null,
          content: content,
          city: city || null,
          country: country || null,
          continent: continent || null,
          device: device || null,
        },
      });

      // if not submitted
      if (!newSubmission) {
        res.status(BAD_REQUEST).json({
          message: "ERROR! Failed to submit the form.",
        });
      }

      // increment cumulative submission count in form
      await tx.form.update({
        where: {
          id: form.id,
        },
        data: {
          submissionsCount: {
            increment: 1,
          },
        },
      });

      // update form daily stats
      const dailyStats = await tx.formDailyStats.upsert({
        where: {
          formId_date: {
            formId: form.id,
            date: todayStart,
          },
        },
        create: {
          formId: form.id,
          date: todayStart,
          submissions: 1,
          cities: city ? { [city]: 1 } : {},
          countries: country ? { [country]: 1 } : {},
          continents: continent ? { [continent]: 1 } : {},
          devices: device ? { [device]: 1 } : {},
        },
        update: {
          submissions: { increment: 1 },
          cities: city
            ? {
                increment: {
                  [city]: 1,
                },
              }
            : undefined,
          countries: country
            ? {
                increment: {
                  [country]: 1,
                },
              }
            : undefined,
          continents: continent
            ? {
                increment: {
                  [continent]: 1,
                },
              }
            : undefined,
          devices: device
            ? {
                increment: {
                  [device]: 1,
                },
              }
            : undefined,
        },
      });

      if (!dailyStats) {
        res.status(BAD_REQUEST).json({
          message: "ERROR! Failed to update daily stats.",
        });
      }
      return newSubmission;
    });

    if (!submission) {
      return res.status(BAD_REQUEST).json({
        message: "ERROR! Failed to submit the form.",
      });
    }

    // Save the form submission
    /* const submission = await db.formSubmission.create({
      data: {
        formId: form.id,
        userId: userId || null,
        content: content,
        city: city || null,
        country: country || null,
        continent: continent || null,
        device: device || null,
      },
    });

    if (!submission) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! Failed to submit the form.",
      });
    } */

    // Increment the form's submission count
    /* await db.form.update({
      where: { id: form.id },
      data: {
        submissionsCount: { increment: 1 },
      },
    }); */

    res.status(CREATED).json({
      message: "SUCCESS! Form submitted successfully.",
      data: submission,
    });
  }
);

/***
 *
 *
 *
 *
 */
export const moveFormToTrashHandler = catchErrors(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    const userId = req.userId;
    const { formId } = req.params;

    // if user is not authorized.
    if (!userId) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! User not authorized.",
      });
    }

    const form = await db.form.findUnique({
      where: {
        id: formId,
      },
    });

    // if form not found
    if (!form) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! Form has not been found.",
      });
    }

    /// trash form
    const trashedForm = await db.form.update({
      where: {
        id: formId,
      },
      data: {
        isTrashed: true,
        trashedAt: new Date(), // trashed at time to current time
      },
    });

    if (!trashedForm) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! Failed to trash form.",
      });
    }

    res.status(OK).json({
      message: "SUCCESS! Form has been trashed.",
      data: trashedForm,
    });
  }
);

/***
 *
 *
 *
 *
 *
 */
export const fetchTrashedFormsHandler = catchErrors(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    const userId = req.userId;

    // if user is not unauthorized
    if (!userId) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! Unauthorized, cannot find user.",
      });
    }

    // trashed forms
    const trashedForms = await db.form.findMany({
      where: {
        isTrashed: true,
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
        isTrashed: true,
        trashedAt: true,
      },
    });

    if (!trashedForms) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! Trashed forms not found.",
      });
    }

    res.status(OK).json({
      message: "SUCCESS! Trashed forms have been fetched.",
      data: trashedForms,
    });
  }
);

/***
 *
 *
 *
 *
 */

export const recoverFromTrashHandler = catchErrors(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    const userId = req.userId;
    const { formId } = req.params;

    /// if user does not exist
    if (!userId) {
      res.status(BAD_REQUEST).json({
        message: "ERROR1 User is not authenticated.",
      });
    }

    // find the form
    const form = await db.form.findUnique({
      where: {
        id: formId,
      },
    });

    // if form not found
    if (!form) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! Form has not been found.",
      });
    }

    // if form is not published
    if (!form?.isTrashed) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! Form is not in trash",
      });
    }

    // recover form
    const recoverForm = await db.form.update({
      where: {
        id: formId,
      },
      data: {
        isTrashed: false,
        trashedAt: null,
      },
    });

    // if fails to recover
    if (!recoverForm) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! Form failed to recover.",
      });
    }

    res.status(OK).json({
      message: "SUCCESS! Form has been recovered from trash",
      data: recoverForm,
    });
  }
);

/***
 *
 *
 *
 *
 */

export const deleteFromTrashHandler = catchErrors(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    const userId = req.userId;
    const { formId } = req.params;

    // if user is not unauthorized
    if (!userId) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! User not authorized.",
      });
    }

    // find the form to ensure it exists
    const form = await db.form.findUnique({
      where: {
        id: formId,
      },
    });

    // check if the form exists
    if (!form) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! Form not found.",
      });
    }

    // if form is in the trash
    if (!form?.isTrashed) {
      res.status(BAD_REQUEST).json({
        message:
          "ERROR! Form is not in trash and cannot be deleted permanently.",
      });
    }

    // permanently delete the form
    await db.form.delete({
      where: {
        id: formId,
      },
    });

    res.status(OK).json({
      message: "SUCCESS! Form has been permanently deleted.",
    });
  }
);
