import express from "express";
import { verifyToken } from "@/middlewares/verify-token";
import { fetchOverallChartData } from "@/modules/chart/chart.controller";

const router = express.Router();

router.get("/chart/overall-chart-data", verifyToken, fetchOverallChartData);

export default router;
