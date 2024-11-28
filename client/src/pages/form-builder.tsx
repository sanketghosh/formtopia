// packages
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// local modules
import { fetchSingleFormAction } from "@/actions/form.actions";

// components
import { Skeleton } from "@/components/ui/skeleton";
import FormBuilderNav from "@/components/nav/form-builder/form-builder-nav";

export default function FormBuilder() {
  const { id } = useParams<{ id?: string }>();
  console.log(id);

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["fetch-single-form"],
    queryFn: () => fetchSingleFormAction(id!),
    staleTime: 5000,
  });

  return (
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
                <div className="bg-chequered-size flex min-h-[calc(100vh-64px)] justify-center bg-chequered p-4 md:p-6 lg:p-8">
                  <div className="bg-sidebar p-3">h2</div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="hidden w-[500px] border-l border-sidebar-border bg-sidebar lg:block"></div>
    </div>
  );
}
