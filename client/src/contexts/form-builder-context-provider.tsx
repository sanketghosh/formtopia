import { FormElementInstance } from "@/types";
import { createContext, useState } from "react";

type FormBuilderContextType = {
  elements: FormElementInstance[];
  addElementHandler: (index: number, element: FormElementInstance) => void;
};

export const FormBuilderContext = createContext<FormBuilderContextType | null>(
  null,
);

const FormBuilderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [elements, setElements] = useState<FormElementInstance[]>([]);

  const addElementHandler = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const contextValue: FormBuilderContextType = {
    addElementHandler: addElementHandler,
    elements: elements,
  };

  return (
    <FormBuilderContext.Provider value={contextValue}>
      {children}
    </FormBuilderContext.Provider>
  );
};

export default FormBuilderContextProvider;
