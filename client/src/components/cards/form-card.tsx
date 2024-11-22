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
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/format-date";

type FormCardProps = {
  title: string;
  description: string;
  clicks: number;
  responses: number;
  updatedOnDate: Date;
  isPublic: boolean;
};

export default function FormCard({
  description,
  title,
  updatedOnDate,
  clicks,
  responses,
  isPublic,
}: FormCardProps) {
  const formattedDate = formatDate(updatedOnDate);

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <span className="absolute right-6 top-6 text-muted-foreground">
          {isPublic ? <GlobeIcon size={20} /> : <LockIcon size={20} />}
        </span>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex h-24 flex-col items-center justify-center rounded-lg bg-secondary">
            <h2 className="text-2xl font-semibold md:text-3xl">{clicks}</h2>
            <p>Clicks</p>
          </div>
          <div className="flex h-24 flex-col items-center justify-center rounded-lg bg-secondary">
            <h2 className="text-2xl font-semibold md:text-3xl">{responses}</h2>
            <p>Responses</p>
          </div>
        </div>

        <p className="text-sm font-medium text-muted-foreground">
          Last updated on {formattedDate}
        </p>
      </CardContent>
      <CardFooter className="flex w-full items-center justify-end gap-3 lg:justify-between">
        <Button size={"sm"} className="lg:w-full">
          <PenIcon />
          <p className="hidden lg:block">Edit Form</p>
        </Button>
        <Button variant={"secondary"} size={"sm"} className="lg:w-full">
          <EyeIcon />
          <p className="hidden lg:block">View Form Details</p>
        </Button>
      </CardFooter>
    </Card>
  );
}
