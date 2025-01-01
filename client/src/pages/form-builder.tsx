// packages
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

// local modules
import { fetchSingleFormAction } from "@/actions/form.actions";

// components
import { Skeleton } from "@/components/ui/skeleton";
import FormBuilderNav from "@/components/form-builder-elements/form-builder-nav";
import FormBuilderSidebar from "@/components/form-builder-elements/form-builder-sidebar";
import DragOverlayWrapper from "@/components/form-builder-elements/drag-overlay-wrapper";
import FormBuilderPad from "@/components/form-builder-elements/form-builder-pad";
import { useSingleFormData } from "@/hooks/use-single-form-data";
import { useEffect } from "react";

export default function FormBuilder() {
  const { setFormId, setFormData, formId, formData } = useSingleFormData();

  const { id } = useParams<{ id?: string }>();
  console.log(id);

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["fetch-single-form"],
    queryFn: () => fetchSingleFormAction(id!),
    staleTime: 5000,
  });

  // console.log("fetch single form data", data.data);

  useEffect(() => {
    if (data && id) {
      console.log("Fetched Data:", data); // Log fetched data
      setFormData(data);
      setFormId(id);
    }
  }, [data, id, setFormData, setFormId]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
      <div className="flex min-h-full">
        <div className="flex flex-1 flex-col">
          {isError ? (
            <p className="text-sm font-medium text-destructive">
              {error.message}
            </p>
          ) : (
            <>
              {isLoading ? (
                <div className="flex h-16 items-center justify-between border-b border-sidebar-border bg-sidebar p-4">
                  <Skeleton className="h-full w-40" />
                  <Skeleton className="h-full w-40" />
                </div>
              ) : (
                <>
                  <FormBuilderNav
                    published={data?.data.published}
                    title={data?.data.title}
                    description={data?.data.description}
                  />
                  {/* main builder */}
                  <div className="bg-chequered-size flex h-full justify-center bg-chequered p-4 md:p-6 lg:p-8">
                    <FormBuilderPad />
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <FormBuilderSidebar published={data?.data.published} />
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
}
