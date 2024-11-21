import axiosApi from "@/lib/axios-api";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { z } from "zod";

/**
 *
 * @param formData
 * @returns
 */
export const registerAction = async (
  formData: z.infer<typeof RegisterSchema>,
) => {
  const response = await axiosApi.post("/api/v1/auth/register", formData);
  return response.data;
};

/**
 *
 * @param formData
 * @returns
 */
export const loginAction = async (formData: z.infer<typeof LoginSchema>) => {
  const response = await axiosApi.post("/api/v1/auth/login", formData);
  return response.data;
};

/**
 *
 * @returns
 */
export const logoutAction = async () => {
  const response = await axiosApi.post("/api/v1/auth/logout");
  return response.data;
};
