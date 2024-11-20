// packages
import express from "express";

// local modules
import { schemaValidator } from "@/middlewares";
import { LoginSchema, RegisterSchema } from "@/modules/auth/auth.schema";
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from "@/modules/auth/auth.controllers";

const router = express.Router();

router.post("/auth/register", schemaValidator(RegisterSchema), registerHandler);
router.post("/auth/login", schemaValidator(LoginSchema), loginHandler);
router.post("/auth/logout", logoutHandler);

export default router;
