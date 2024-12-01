import { FormBuilderContext } from "@/contexts/form-builder-context-provider";
import { useContext } from "react";

export const useFormBuilderContext = () => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error(
      "ERROR! useAuthContext must be used within an AuthContextProvider",
    );
  }
  return context;
};
