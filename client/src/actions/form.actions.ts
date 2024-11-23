import axiosApi from "@/lib/axios-api";
import { StartFormCreationSchema } from "@/schemas";
import { z } from "zod";

/**
 *
 * @returns
 */
export const formStatsAction = async () => {
  const response = await axiosApi.get("/api/v1/form/get-form-stats");
  console.log(response.data);
  return response.data;
};

/**
 *
 * @param formData
 * @returns
 */
export const createFormAction = async (
  formData: z.infer<typeof StartFormCreationSchema>,
) => {
  const response = await axiosApi.post("/api/v1/form/create-form", formData);
  console.log(response.data);
  return response.data;
};
