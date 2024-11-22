// packages
import express from "express";

// local modules
import { verifyToken } from "@/middlewares/verify-token";
import { formStatsHandler } from "@/modules/form/form.controller";

const router = express.Router();

router.get("/form/get-form-stats", verifyToken, formStatsHandler);

export default router;
