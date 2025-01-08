// packages
import { useState } from "react";

// local modules
import { FormCardType, SortOrderType, SortStatusType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchFormActions } from "@/actions/form.actions";

// components
import FormCard from "@/components/cards/form-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormCreateDialog from "@/components/dialogs/form-create-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function AllForms() {
  const [sortOrder, setSortOrder] = useState<SortOrderType>("latest");
  const [filterStatus, setFilterStatus] = useState<SortStatusType>("all");

  const { error, data, isLoading, isError } = useQuery({
    queryKey: ["fetch-forms", sortOrder],
    queryFn: () => fetchFormActions(sortOrder),
    staleTime: 5000,
  });

  // console.log(data?.data);

  // Filter the forms based on the selected status
  const filteredForms = data?.data.filter((form: FormCardType) => {
    if (form.isTrashed) return false;

    if (filterStatus === "all") return true;
    if (filterStatus === "published") return form.published === true;
    if (filterStatus === "unpublished") return form.published === false;
    return true;
  });

  // Apply sorting to the filtered forms
  const sortedForms = filteredForms?.sort(
    (a: FormCardType, b: FormCardType) => {
      if (sortOrder === "latest")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortOrder === "oldest")
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      return 0;
    },
  );

  const handleSortChange = (order: SortOrderType) => {
    setSortOrder(order);
  };

  const handleFilterChange = (status: SortStatusType) => {
    setFilterStatus(status);
  };

  return (
    <div className="space-y-6">
      <FormCreateDialog />
      {data?.data.length <= 0 ? (
        <div>
          <p>
            Still no form created, you must create one first to view it here.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <Select
              onValueChange={(value) =>
                handleSortChange(value as SortOrderType)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by creation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
            <RadioGroup
              defaultValue={filterStatus}
              onValueChange={(value) =>
                handleFilterChange(value as "all" | "published" | "unpublished")
              }
              className="flex items-center gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="radio-all" />
                <Label htmlFor="radio-all">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="published" id="radio-published" />
                <Label htmlFor="radio-published">Published</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unpublished" id="radio-unpublished" />
                <Label htmlFor="radio-unpublished">Unpublished</Label>
              </div>
            </RadioGroup>
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
                  {sortedForms?.map((form: FormCardType) => (
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
