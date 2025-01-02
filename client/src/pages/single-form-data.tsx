// packages
import { useQuery } from "@tanstack/react-query";
import { ArrowRightCircleIcon } from "lucide-react";
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
    },
    {
      title: "Submissions",
      desc: "Number of the total forms has been submitted.",
      statsNumber: data?.data.submissions,
    },
    {
      title: "Response percentage",
      desc: "Percentage of response received.",
      statsNumber: data?.data.submissionRate,
    },
    {
      title: "Bounce rate",
      desc: "Rate of forms have not been submitted.",
      statsNumber: data?.data.bounceRate,
    },
  ];

  console.log(data);

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
          />
        ))}
      </div>
      <Separator />
      <FormSubmissionsTable />
    </div>
  );
}
