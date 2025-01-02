import { FormData } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormStoreType {
  formId: string | null;
  formData: FormData | null;
  dataQueryState: {
    isError: boolean;
    error: any;
    isLoading: boolean;
  };
  setFormId: (id: string) => void;
  setFormData: (data: FormData) => void;
  setDataQueryingState: (state: {
    isError: boolean;
    error: Error | null;
    isLoading: boolean;
  }) => void;
}

export const useSingleFormData = create<FormStoreType>()(
  persist(
    (set) => ({
      formId: null,
      formData: null,
      dataQueryState: {
        isError: false,
        error: null,
        isLoading: false,
      },
      setFormId: (formId) => {
        console.log("Setting Form ID:", formId);
        set({ formId });
      },
      setFormData: (formData) => {
        console.log("Setting Form Data:", formData);
        set({ formData });
      },
      setDataQueryingState: (dataQueryState) => {
        console.log("Setting Query State:", dataQueryState);
        set({ dataQueryState });
      },
    }),
    {
      name: "single-form-data-store", // Key to save in localStorage
      partialize: (state) => ({
        formId: state.formId,
        formData: state.formData,
        dataQueryState: state.dataQueryState,
      }), // Optional: Save only selected fields
    },
  ),
);
