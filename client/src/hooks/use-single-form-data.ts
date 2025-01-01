import { FormData } from "@/types";
import { create } from "zustand";

interface FormStoreType {
  formId: string | null;
  formData: any | null;
  setFormId: (id: string) => void;
  setFormData: (data: any) => void;
}

export const useSingleFormData = create<FormStoreType>((set) => ({
  formId: null,
  formData: null,
  setFormId: (formId) => {
    console.log("setting form id", formId), set({ formId });
  },
  setFormData: (formData) => {
    console.log("setting form data", formData), set({ formData });
  },
}));
