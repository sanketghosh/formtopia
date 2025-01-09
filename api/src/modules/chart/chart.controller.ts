import { BAD_REQUEST, OK } from "@/constants";
import { db } from "@/lib/prisma";
import { catchErrors } from "@/utils/catch-errors";
import type { NextFunction, Request, Response } from "express";

export const fetchOverallChartData = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;

    // in case user is unauthorized
    if (!userId) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! Unauthorized user.",
      });
    }

    // daily stats
    const dailyStats = await db.form.groupBy({
      by: ["createdAt"],
      where: {
        userId: userId,
      },
      _sum: {
        visitsCount: true,
        submissionsCount: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // if failed to provide daily stats
    if (!dailyStats) {
      res.status(BAD_REQUEST).json({
        message: "ERROR! Failed to get daily stats.",
      });
    }

    const formattedStats = dailyStats.map((stat) => {
      const formVisits = stat._sum.visitsCount || 0;
      const submissions = stat._sum.submissionsCount || 0;

      // calculate submission rate and bounce rate
      const responsePercentage =
        formVisits > 0 ? (submissions / formVisits) * 100 : 0;
      const bounceRate = formVisits > 0 ? 100 - responsePercentage : 0;

      return {
        date: stat.createdAt.toISOString().split("T")[0],
        formVisits: formVisits,
        submissions: submissions,
        responsePercentage: responsePercentage,
        bounceRate: bounceRate,
      };
    });

    res.status(OK).json({
      message: "SUCCESS! Fetched stats successfully",
      data: formattedStats,
    });
  }
);
