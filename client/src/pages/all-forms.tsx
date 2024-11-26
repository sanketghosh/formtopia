// packages
import { useState } from "react";

// components
import FormCard from "@/components/cards/form-card";

// local modules
import { FormCardType, SortOrderType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchFormActions } from "@/actions/form.actions";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AllForms() {
  const [sortOrder, setSortOrder] = useState<SortOrderType>("latest");

  const { error, data, isLoading, isError } = useQuery({
    queryKey: ["fetch-forms", sortOrder],
    queryFn: () => fetchFormActions(sortOrder),
    staleTime: 5000,
  });

  console.log(data?.data);

  const handleSortChange = (order: SortOrderType) => {
    setSortOrder(order);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-3 md:flex-row">
        <Select
          onValueChange={(value) => handleSortChange(value as SortOrderType)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by creation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>

        {/*    <Select
          onValueChange={(value) => handleSortChange(value as SortOrderType)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select> */}
      </div>

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
              {data?.data.map((form: FormCardType) => (
                <FormCard key={form.id} data={form} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
