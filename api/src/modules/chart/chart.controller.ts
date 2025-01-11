import { BAD_REQUEST, OK } from "@/constants";
import { db } from "@/lib/prisma";
import { catchErrors } from "@/utils/catch-errors";
import type { NextFunction, Request, Response } from "express";

/* export const fetchOverallChartData = catchErrors(
  async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        message: "ERROR! Unauthorized user.",
      });
    }

    // Fetch all data
    const formData = await db.form.findMany({
      where: { userId: userId },
      select: {
        // updatedAt: true,
        createdAt: true,
        visitsCount: true,
        submissionsCount: true,
      },
    });

    // Group data by date
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const groupedData = formData.reduce((acc, item) => {
      const date = new Date(item.createdAt).toLocaleDateString("en-US", {
        timeZone: userTimeZone, // Dynamically detect timezone
      });

      if (!acc[date]) {
        acc[date] = {
          date: date,
          formVisits: 0,
          submissions: 0,
        };
      }

      acc[date].formVisits += item.visitsCount || 0;
      acc[date].submissions += item.submissionsCount || 0;

      return acc;
    }, {} as Record<string, { date: string; formVisits: number; submissions: number }>);

    // Format grouped data as an array
    const formattedStats = Object.values(groupedData).map((stat) => {
      const responsePercentage =
        stat.formVisits > 0 ? (stat.submissions / stat.formVisits) * 100 : 0;
      const bounceRate = stat.formVisits > 0 ? 100 - responsePercentage : 0;

      return {
        ...stat,
        responsePercentage,
        bounceRate,
      };
    });

    res.status(200).json({
      message: "SUCCESS! Fetched stats successfully",
      data: formattedStats,
    });
  }
); */

interface FormattedStat {
  date: string;
  formVisits: number;
  submissions: number;
  responsePercentage: number;
  bounceRate: number;
}
export const fetchOverallChartData = catchErrors(
  async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "ERROR! Unauthorized user." });
    }

    // Group visits by `createdAt` (form creation date)
    const visitData = await db.form.groupBy({
      by: ["createdAt"],
      where: { userId: userId },
      _sum: { visitsCount: true },
      orderBy: { createdAt: "asc" },
    });

    // Group submissions by `updatedAt` (reflects submission activity)
    const submissionData = await db.form.groupBy({
      by: ["updatedAt"], // Grouping by the date submissions were made
      where: { userId: userId },
      _sum: { submissionsCount: true },
      orderBy: { updatedAt: "asc" },
    });

    // Format both visits and submissions
    const formattedStats: FormattedStat[] = [];

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    visitData.forEach((visit) => {
      // Convert to user's local timezone
      const date = new Date(visit.createdAt).toLocaleDateString("en-US", {
        timeZone: userTimeZone, // Dynamically detect timezone
      });

      // Find the corresponding submissions for the same date
      const submissionsForDate = submissionData.find(
        (sub) =>
          new Date(sub.updatedAt).toLocaleDateString("en-US", {
            timeZone: userTimeZone,
          }) === date
      );

      const visitsCount = visit._sum?.visitsCount || 0;
      const submissionsCount = submissionsForDate?._sum?.submissionsCount || 0;

      formattedStats.push({
        date: date,
        formVisits: visitsCount,
        submissions: submissionsCount,
        responsePercentage:
          visitsCount > 0 ? (submissionsCount / visitsCount) * 100 : 0,
        bounceRate:
          visitsCount > 0 ? 100 - (submissionsCount / visitsCount) * 100 : 0,
      });
    });

    res.status(200).json({
      message: "SUCCESS! Fetched stats successfully.",
      data: formattedStats,
    });
  }
);
