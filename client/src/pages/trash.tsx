// packages
import { useQuery } from "@tanstack/react-query";
import { AlertTriangleIcon } from "lucide-react";

// local modules
import { fetchTrashedFormsAction } from "@/actions/form.actions";
import { FormCardType } from "@/types";

// components
import FormCard from "@/components/cards/form-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Trash() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["fetch-trashed-forms"],
    queryFn: fetchTrashedFormsAction,
    staleTime: 5000,
  });

  // console.log(data?.data);

  return (
    <div className="space-y-6">
      <div className="flex w-full items-center gap-5 rounded-md border border-destructive bg-destructive px-6 py-4 md:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="rounded-lg border-2 border-white p-2">
          <AlertTriangleIcon />
        </div>
        <h2 className="text-sm font-medium leading-tight tracking-tight md:text-base">
          Form will be permanently deleted from trash after 2 mins of moving the
          form into trash.
        </h2>
      </div>
      {data?.data.length <= 0 ? (
        <div>
          <p>Trash is empty.</p>
        </div>
      ) : (
        <>
          {isError ? (
            <p>{error.message}</p>
          ) : (
            <>
              {isLoading ? (
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Skeleton className="h-44" key={item} />
                  ))}
                </div>
              ) : (
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {data?.data?.map((form: FormCardType) => (
                    <FormCard key={form.id} data={form} />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
