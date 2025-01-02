export type Submission = {
  id: String;
  submittedAt: Date;
  city?: String;
  country?: String;
  browser?: String;
  os?: String;
  device?: String;
};

export type FormData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  title: string;
  description: string;
  content: string;
  visitsCount: number;
  submissionsCount: number;
  shareURL: string;
  formSubmissions: Submission[];
};

import { create } from "zustand";

interface FormStoreType {
  formId: string | null;
  formData: FormData | null;
  setFormId: (id: string) => void;
  setFormData: (data: FormData) => void;
}

export const useSingleFormData = create<FormStoreType>((set) => ({
  formId: null,
  formData: null,
  setFormId: (formId) => {
    // console.log("setting form id", formId),
    set({ formId });
  },
  setFormData: (formData) => {
    // console.log("setting form data", formData),
    set({ formData });
  },
}));
