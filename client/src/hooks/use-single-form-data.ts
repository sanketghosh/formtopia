import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Submission = {
  id: string;
  submittedAt: Date;
  city?: string;
  country?: string;
  browser?: string;
  os?: string;
  device?: string;
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

interface FormStoreType {
  formId: string | null;
  formData: FormData | null;
  setFormId: (id: string) => void;
  setFormData: (data: FormData) => void;
}

export const useSingleFormData = create<FormStoreType>()(
  persist(
    (set) => ({
      formId: null,
      formData: null,
      setFormId: (formId) => {
        console.log("Setting Form ID:", formId);
        set({ formId });
      },
      setFormData: (formData) => {
        console.log("Setting Form Data:", formData);
        set({ formData });
      },
    }),
    {
      name: "single-form-data-store", // Key to save in localStorage
      partialize: (state) => ({
        formId: state.formId,
        formData: state.formData,
      }), // Optional: Save only selected fields
    },
  ),
);
