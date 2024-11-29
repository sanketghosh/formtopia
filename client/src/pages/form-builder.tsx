// packages
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { DndContext, useDroppable } from "@dnd-kit/core";

// local modules
import { fetchSingleFormAction } from "@/actions/form.actions";

// components
import { Skeleton } from "@/components/ui/skeleton";
import FormBuilderNav from "@/components/nav/form-builder/form-builder-nav";
import { GripIcon } from "lucide-react";
import FormBuilderSidebar from "@/components/form-builder-elements/form-builder-sidebar";

export default function FormBuilder() {
  const { id } = useParams<{ id?: string }>();
  console.log(id);

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["fetch-single-form"],
    queryFn: () => fetchSingleFormAction(id!),
    staleTime: 5000,
  });

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  return (
    <DndContext>
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
                  />
                  {/* main builder */}
                  <div className="bg-chequered-size flex h-full justify-center bg-chequered p-4 md:p-6 lg:p-8">
                    <div className="flex h-full max-w-3xl flex-grow rounded-lg bg-sidebar p-4">
                      <div className="flex h-full w-full select-none flex-col items-center justify-center gap-2 text-muted-foreground">
                        <GripIcon size={30} />
                        <p className="text-lg font-semibold capitalize">
                          drop here
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <FormBuilderSidebar />
      </div>
    </DndContext>
  );
}
