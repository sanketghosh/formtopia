// packages
import { z } from "zod";

// local modules
import axiosApi from "@/lib/axios-api";
import { LoginSchema, RegisterSchema } from "@/schemas";

/**
 * Registers a new user by sending a POST request to the registration API endpoint.
 *
 * @param {z.infer<typeof RegisterSchema>} formData - The form data required for registration, validated by the `RegisterSchema`.
 *
 * @returns {Promise<any>} A promise that resolves to the data from the API response.
 *
 */
export const registerAction = async (
  formData: z.infer<typeof RegisterSchema>,
) => {
  const response = await axiosApi.post("/api/v1/auth/register", formData);
  return response.data;
};

/**
 * Logs in an existing user by sending a POST request to the login API endpoint.
 *
 * @param {z.infer<typeof LoginSchema>} formData - The form data required for login, validated by the `LoginSchema`.
 *
 * @returns {Promise<any>} A promise that resolves to the data from the API response, typically the user's session or authentication token.
 *
 */
export const loginAction = async (formData: z.infer<typeof LoginSchema>) => {
  const response = await axiosApi.post("/api/v1/auth/login", formData);
  return response.data;
};

/**
 * Logs out the current user by sending a POST request to the logout API endpoint.
 *
 * @returns {Promise<any>} A promise that resolves to the data from the API response, typically confirming the logout action.
 *
 */
export const logoutAction = async () => {
  const response = await axiosApi.post("/api/v1/auth/logout");
  return response.data;
};
