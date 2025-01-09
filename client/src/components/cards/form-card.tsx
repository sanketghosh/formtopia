// packages
import { EyeIcon, GlobeIcon, LockIcon, PenIcon } from "lucide-react";
import { Link } from "react-router-dom";

// local modules
import { FormCardType } from "@/types";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format-date";

// components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import TrashAlert from "@/components/alert-dialog/trash-alert";
import RecoverFromTrashAlert from "@/components/alert-dialog/recover-from-trash-alert";
import DeleteFromTrashAlert from "@/components/alert-dialog/delete-from-trash-alert";

type FormCardProps = {
  data: FormCardType;
};

export default function FormCard({
  data: {
    createdAt,
    visitsCount,
    description,
    submissionsCount,
    title,
    published,
    id,
    isTrashed,
    trashedAt,
  },
}: FormCardProps) {
  const formattedDate = formatDate(createdAt);

  /*  
  // COUNTDOWN


  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!isTrashed) {
      return;
    }

    const trashedAtTime = new Date(trashedAt).getTime();
    const expiryTime = trashedAtTime + 2 * 60 * 1000;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeRemaining = Math.max(expiryTime - now, 0); // Ensure it doesn't go below 0

      setTimeLeft(timeRemaining);

      if (timeRemaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [trashedAt, isTrashed]);

  const minutes = Math.floor(timeLeft! / (1000 * 60));
  const seconds = Math.floor((timeLeft! % (1000 * 60)) / 1000); */

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="truncate">{title}</CardTitle>
        <CardDescription className="line-clamp-1">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="absolute right-2 top-2 space-x-2 text-muted-foreground">
          {published ? <GlobeIcon size={15} /> : <LockIcon size={15} />}
        </div>
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
          {/* {published ? "Published" : "Last updated"} on {formattedDate} */}
          {isTrashed ? (
            <div>
              <p>Trashed {formatDate(trashedAt)}</p>
              {/* {timeLeft! > 0 && (
                <p>
                  Will be deleted in {minutes}:
                  {seconds.toString().padStart(2, "0")}
                </p>
              )} */}
            </div>
          ) : (
            <>Created {formattedDate}</>
          )}
        </p>
      </CardContent>
      <CardFooter className="flex w-full items-center justify-end gap-3 lg:justify-between">
        {isTrashed ? (
          <>
            <RecoverFromTrashAlert formId={id} />
            <DeleteFromTrashAlert formId={id} />
          </>
        ) : (
          <>
            {!published ? (
              <div className="flex w-full items-center gap-3">
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
                  <p>Edit Form</p>
                </Link>
                <TrashAlert formId={id} />
              </div>
            ) : (
              <div className="flex w-full items-center gap-3">
                <Link
                  to={`/single-form-data/${id}`}
                  className={cn(
                    buttonVariants({
                      variant: "default",
                      size: "sm",
                    }),
                    "w-full",
                  )}
                >
                  <EyeIcon size={17} />
                  <p>Form Data</p>
                </Link>
                <TrashAlert formId={id} />
              </div>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
