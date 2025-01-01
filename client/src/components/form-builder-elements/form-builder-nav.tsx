// packages
import { Columns2Icon } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import FormPreviewDialog from "./form-preview-dialog";
import { useSingleFormData } from "@/hooks/use-single-form-data";

type FormBuilderNavProps = {
  published: boolean;
  title: string;
  description: string;
};

export default function FormBuilderNav({
  title,
  description,
}: FormBuilderNavProps) {
  const { formData } = useSingleFormData();
  console.log("@@@formnavbar", formData?.title);

  return (
    <div className="sticky top-0 z-20 h-16 w-full border-b border-sidebar-border bg-sidebar">
      <div className="flex h-full items-center justify-between gap-3 px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <h2 className="truncate font-medium">{title}</h2>
        </div>

        <FormPreviewDialog title={title} description={description} />
      </div>
    </div>
  );
}
