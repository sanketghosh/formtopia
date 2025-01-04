// packages
import express from "express";

// local modules
import { verifyToken } from "@/middlewares/verify-token";
import {
  fetchFormsHandler,
  fetchSingleFormHandler,
  formCreateHandler,
  formStatsHandler,
  formSubmitHandler,
  getFormByShareUrlHandler,
  publishFormHandler,
  singleFormStatsHandler,
  updateFormHandler,
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
router.get("/form/fetch-forms", verifyToken, fetchFormsHandler);
router.get("/form/single-form/:formId", verifyToken, fetchSingleFormHandler);
router.put("/form/update-form/:formId", verifyToken, updateFormHandler);
router.post("/form/publish-form/:formId", verifyToken, publishFormHandler);
router.get(
  "/form/get-single-form-stats/:formId",
  verifyToken,
  singleFormStatsHandler
);
router.get("/form/form-by-share-url/:shareUrl", getFormByShareUrlHandler);
router.post("/form/submit/:shareUrl", verifyToken, formSubmitHandler);

export default router;
