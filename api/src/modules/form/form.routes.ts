// packages
import express from "express";

// local modules
import { verifyToken } from "@/middlewares/verify-token";
import {
  formCreateHandler,
  formStatsHandler,
} from "@/modules/form/form.controller";
import { FormCreateSchema } from "@/modules/form/form.schema";
import { schemaValidator } from "@/middlewares";

const router = express.Router();

router.get("/form/get-form-stats", verifyToken, formStatsHandler);
router.post(
  "/form/create-form",
  verifyToken,
  schemaValidator(FormCreateSchema),
  formCreateHandler
);

export default router;
