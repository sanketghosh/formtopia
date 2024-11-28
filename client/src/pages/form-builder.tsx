import { fetchSingleFormAction } from "@/actions/form.actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronRightCircleIcon,
  Columns2Icon,
  Globe2Icon,
  SaveIcon,
} from "lucide-react";
import { useParams } from "react-router-dom";

export default function FormBuilder() {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const { data, isError, error, isSuccess } = useQuery({
    queryKey: ["fetch-single-form"],
    queryFn: () => fetchSingleFormAction(id!),
    staleTime: 5000,
  });

  console.log(data?.data);

  return (
    <div className="flex min-h-full">
      <div className="flex flex-1 flex-col">
        <FormBuilderNav
          published={data?.data.published}
          title={data?.data.title}
        />
        <div className="bg-chequered-size flex min-h-[calc(100vh-64px)] justify-center bg-chequered p-4 md:p-6 lg:p-8">
          <div className="bg-sidebar p-3">h2</div>
        </div>
      </div>
      <div className="hidden w-[500px] border-l border-sidebar-border bg-sidebar lg:block"></div>
    </div>
  );
}

function FormBuilderNav({
  published,
  title,
}: {
  title: string;
  published: boolean;
}) {
  return (
    <div className="h-16 w-full border-b border-sidebar-border bg-sidebar">
      <div className="flex h-full items-center justify-between gap-3 px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <h2 className="truncate font-medium">{title}</h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"sm"}>
              Next
              <ChevronRightCircleIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-6 w-40">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {!published && (
              <DropdownMenuItem className="cursor-pointer">
                <Globe2Icon />
                Publish
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="cursor-pointer">
              <SaveIcon />
              Save
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Columns2Icon />
              Preview
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

/**
 * <div className="flex items-center gap-3">
          {!published && (
            <Button size={"sm"}>
              <Globe2Icon />
              <p className="hidden xl:block">Publish</p>
            </Button>
          )}
          <Button size={"sm"} variant={"secondary"}>
            <SaveIcon />
            <p className="hidden xl:block">Save</p>
          </Button>
          <Button size={"sm"} variant={"secondary"}>
            <Columns2Icon />
            <p className="hidden xl:block">Preview</p>
          </Button>
        </div>
 * 
 */
