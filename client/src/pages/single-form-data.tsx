// packages
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeftIcon,
  ArrowRightCircleIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

// local packages/modules
import { singleFormStatsAction } from "@/actions/form.actions";
import { cn } from "@/lib/utils";
import { FormData, StatsCardsType } from "@/types";

// components
import StatsCard from "@/components/cards/stats-card";
import SharableLinkElement from "@/components/commons/sharable-link-element";
import FormSubmissionsTable from "@/components/table/form-submissions-table";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SingleFormData() {
  const { id } = useParams<{ id?: string }>();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["get-single-form-stats", id],
    queryFn: () => singleFormStatsAction(id!),
    staleTime: 5000,
  });

  // const {} = data?.data as FormData;

  const statsCards: StatsCardsType[] = [
    {
      title: "Forms visits",
      desc: "Number of the total of forms visits.",
      statsNumber: data?.data.visits,
      isPercentage: false,
    },
    {
      title: "Submissions",
      desc: "Number of the total forms has been submitted.",
      statsNumber: data?.data.submissions,
      isPercentage: false,
    },
    {
      title: "Response percentage",
      desc: "Percentage of response received.",
      statsNumber: data?.data.submissionRate,
      isPercentage: true,
    },
    {
      title: "Bounce rate",
      desc: "Rate of forms have not been submitted.",
      statsNumber: data?.data.bounceRate,
      isPercentage: true,
    },
  ];

  // console.log(data);
  if (data?.data.published === false) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Oops! Form is not published yet.</CardTitle>
            <CardDescription>
              You need to publish your form after saving to view it here and
              submit.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Link
              to={"/dashboard"}
              className={cn(
                "w-full",
                buttonVariants({
                  variant: "secondary",
                  size: "sm",
                }),
              )}
            >
              <ArrowLeftIcon />
              Go Back To Dashboard
            </Link>
            <Link
              to={`/create-form/${data?.data.formId}`}
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: "sm",
                }),
                "w-full",
              )}
            >
              Go To Editor
              <ArrowRightIcon />
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
          {data?.data.title}
        </h1>
        <p className="text-sm font-medium text-muted-foreground md:text-base">
          {data?.data.description}
        </p>
      </div>

      <div className="flex w-full items-center gap-2">
        <SharableLinkElement sharableUrl={data?.data.shareURL} />
        <Link
          to={`/submit/${data?.data.shareURL}`}
          className={cn(
            buttonVariants({
              size: "sm",
              variant: "secondary",
            }),
          )}
        >
          Checkout Form
          <ArrowRightCircleIcon />
        </Link>
      </div>
      <Separator />
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((item, idx) => (
          <StatsCard
            key={idx}
            statsNumber={item.statsNumber}
            title={item.title}
            description={item.desc}
            itemSerialNo={idx}
            error={error}
            isError={isError}
            isLoading={isLoading}
            isPercentage={item.isPercentage}
          />
        ))}
      </div>
      <Separator />
      <FormSubmissionsTable />
    </div>
  );
}
