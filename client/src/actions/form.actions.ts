import axiosApi from "@/lib/axios-api";
import { StartFormCreationSchema } from "@/schemas";
import { SortOrderType, SubmissionAccessType } from "@/types";
import { z } from "zod";

/**
 *
 * @returns
 */
export const formStatsAction = async () => {
  const response = await axiosApi.get("/api/v1/form/get-form-stats");
  // console.log(response.data);
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
  // console.log(response.data);
  return response.data;
};

/**
 *
 * @param sortOrder
 * @returns
 */
export const fetchFormActions = async (sortOrder: SortOrderType) => {
  const response = await axiosApi.get(
    `/api/v1/form/fetch-forms?sort=${sortOrder}`,
  );
  // console.log(response.data);
  return response.data;
};

/**
 *
 * @param formId
 * @returns
 */
export const fetchSingleFormAction = async (formId: string) => {
  const response = await axiosApi.get(`/api/v1/form/single-form/${formId}`);
  // console.log(response.data);
  return response.data;
};

type UpdateFormActionType = {
  formId?: string;
  formContent?: string;
};

export const updateFormAction = async ({
  formContent,
  formId,
}: UpdateFormActionType) => {
  /* console.log({
    formContent,
    formId,
  }); */

  const response = await axiosApi.put(`/api/v1/form/update-form/${formId}`, {
    formContent,
  });
  // console.log(response.data);
  return response.data;
};

/**
 *
 * @param formId
 * @returns
 */

type PublishFormActionDataTypes = {
  formId: string;
  submissionAccess: SubmissionAccessType;
};

export const publishFormAction = async ({
  formId,
  submissionAccess,
}: PublishFormActionDataTypes) => {
  const response = await axiosApi.post(`/api/v1/form/publish-form/${formId}`, {
    submissionAccess,
  });
  console.log(response.data);
  return response.data;
};

/**
 *
 * @returns
 */
export const singleFormStatsAction = async (formId: string) => {
  const response = await axiosApi.get(
    `/api/v1/form/get-single-form-stats/${formId}`,
  );
  // console.log(response.data);
  return response.data;
};

/**
 *
 * @returns
 */
export const fetchFormByShareUrlAction = async (shareUrl: string) => {
  const response = await axiosApi.get(
    `/api/v1/form/form-by-share-url/${shareUrl}`,
  );
  // console.log(response.data);
  return response.data;
};

/***
 *
 *
 *
 */

type SubmitFormDataTypes = {
  shareURL: string;
  content?: string;
  device?: string;
};

export const submitFormAction = async ({
  content,
  device,
  shareURL,
}: SubmitFormDataTypes) => {
  console.log({
    content,
    device,
    shareURL,
  });

  const response = await axiosApi.post(`/api/v1/form/submit/${shareURL}`, {
    content,
    device,
  });
  console.log(response.data);
  return response.data;
};

/***
 *
 *
 *
 */
/**
 *
 * @returns
 */
export const fetchFormsOverallMetricsAction = async () => {
  const response = await axiosApi.get("/api/v1/form/get-all-form-metrics");
  console.log(response.data);
  return response.data;
};

/***
 *
 *
 *
 */
export const fetchFormWithSubmissionsAction = async (formId: string) => {
  const response = await axiosApi.get(
    `/api/v1/form/form-with-submissions/${formId}`,
  );
  console.log(response.data);
  return response.data;
};

/***
 *
 *
 *
 */

export const moveFormToTrashAction = async (formId: string) => {
  console.log(formId);

  const response = await axiosApi.put(`/api/v1/form/trash-form/${formId}`);
  console.log(response.data);
  return response.data;
};

/***
 *
 *
 *
 *
 */
export const fetchTrashedFormsAction = async () => {
  const response = await axiosApi.get("/api/v1/form/trashed-forms");
  console.log(response.data);
  return response.data;
};

/***
 *
 *
 *
 *
 */
export const recoverFormTrashAction = async (formId: string) => {
  //  console.log(formId);
  const response = await axiosApi.put(
    `/api/v1/form/recover-from-trash/${formId}`,
  );
  console.log(response.data);
  return response.data;
};

/***
 *
 *
 *
 *
 */
export const deletePermanentlyAction = async (formId: string) => {
  //  console.log(formId);
  const response = await axiosApi.delete(
    `/api/v1/form/delete-permanently/${formId}`,
  );
  console.log(response.data);
  return response.data;
};
