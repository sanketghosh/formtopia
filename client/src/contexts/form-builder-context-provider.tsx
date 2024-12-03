import { FormElementInstance } from "@/types";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type FormBuilderContextType = {
  elements: FormElementInstance[];
  addElementHandler: (index: number, element: FormElementInstance) => void;
  removeElementHandler: (id: string) => void;
  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
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
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

  const addElementHandler = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElementHandler = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const contextValue: FormBuilderContextType = {
    addElementHandler: addElementHandler,
    elements: elements,
    removeElementHandler: removeElementHandler,
    selectedElement,
    setSelectedElement,
  };

  return (
    <FormBuilderContext.Provider value={contextValue}>
      {children}
    </FormBuilderContext.Provider>
  );
};

export default FormBuilderContextProvider;
