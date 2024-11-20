import { z } from "zod";

// env parser
const EnvSchema = z.object({
  VITE_API_BASE_URL: z.string(),
});
const processEnv = EnvSchema.parse(import.meta.env);

export const API_BASE_URL = processEnv.VITE_API_BASE_URL;
export const DEFAULT_AUTH_REDIRECT_ROUTE = "/dashboard";
