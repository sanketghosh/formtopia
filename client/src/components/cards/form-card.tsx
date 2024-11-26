// packages
import { EyeIcon, GlobeIcon, LockIcon, PenIcon } from "lucide-react";

// components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatDate } from "@/utils/format-date";
import { FormCardType } from "@/types";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type FormCardProps = {
  data: FormCardType;
};

export default function FormCard({
  data: {
    updatedAt,
    visitsCount,
    description,
    submissionsCount,
    title,
    published,
    id,
  },
}: FormCardProps) {
  const formattedDate = formatDate(updatedAt);

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="truncate">{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <span className="absolute right-4 top-4 text-muted-foreground">
          {published ? <GlobeIcon size={19} /> : <LockIcon size={19} />}
        </span>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex h-24 flex-col items-center justify-center rounded-lg bg-secondary">
            <h2 className="text-2xl font-semibold md:text-3xl">
              {visitsCount}
            </h2>
            <p>Visits</p>
          </div>
          <div className="flex h-24 flex-col items-center justify-center rounded-lg bg-secondary">
            <h2 className="text-2xl font-semibold md:text-3xl">
              {submissionsCount}
            </h2>
            <p>Submissions</p>
          </div>
        </div>

        <p className="text-sm font-medium text-muted-foreground">
          Last updated on {formattedDate}
        </p>
      </CardContent>
      <CardFooter className="flex w-full items-center justify-end gap-3 lg:justify-between">
        <Link
          to={`/create-form/${id}`}
          className={cn(
            buttonVariants({
              variant: "default",
              size: "sm",
            }),
            "w-full",
          )}
        >
          <PenIcon size={17} />
          <p className="hidden lg:block">Edit Form</p>
        </Link>
        <Link
          to={`/single-form-data/${id}`}
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "sm",
            }),
            "w-full",
          )}
        >
          <EyeIcon size={17} />
          <p className="hidden lg:block">Form Data</p>
        </Link>
      </CardFooter>
    </Card>
  );
}
