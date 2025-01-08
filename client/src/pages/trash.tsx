import { fetchTrashedFormsAction } from "@/actions/form.actions";
import FormCard from "@/components/cards/form-card";
import { Skeleton } from "@/components/ui/skeleton";
import { FormCardType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function Trash() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["trashed-forms"],
    queryFn: fetchTrashedFormsAction,
    staleTime: 5000,
  });

  return (
    <div className="space-y-6">
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
