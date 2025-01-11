// packages
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LibraryIcon } from "lucide-react";

// local modules
import { useAuthContext } from "@/hooks/use-auth-context";
import { formStatsAction } from "@/actions/form.actions";
import { cn } from "@/lib/utils";
import { StatsCardsType } from "@/types";

// components
import { Separator } from "@/components/ui/separator";
import FormCreateDialog from "@/components/dialogs/form-create-dialog";
import StatsCard from "@/components/cards/stats-card";
import { buttonVariants } from "@/components/ui/button";
import {
  GlobalFormMetrics,
  GlobalLocationBarCharts,
} from "@/components/charts";

export default function Dashboard() {
  const { user } = useAuthContext();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: formStatsAction,
    queryKey: ["get-form-stats"],
    staleTime: 5000,
    refetchOnWindowFocus: true,
  });

  /*  const { data: _data } = useQuery({
    queryKey: ["get-overall-form-metrics"],
    queryFn: fetchFormsOverallMetricsAction,
    staleTime: 5000,
  });
  console.log(_data?.data); */

  // stats cards
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

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">
          Hello {user?.username} ! Whassup ?
        </h1>
        <p className="font-medium text-muted-foreground">
          Welcome to your dashboard. You can create, manage, organize and check
          form stats here.
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <FormCreateDialog />
        <Link
          className={cn(
            buttonVariants({
              size: "lg",
              variant: "secondary",
            }),
          )}
          to={"/all-forms"}
        >
          <LibraryIcon size={22} />
          View All Forms
        </Link>
      </div>
      <Separator />
      {/* overall form stats */}
      <div className="space-y-3">
        <h2 className="font-medium text-muted-foreground">
          Overall form statistics.
        </h2>
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {statsCards.map((item: StatsCardsType, idx) => (
            <StatsCard
              key={idx}
              description={item.desc}
              title={item.title}
              itemSerialNo={idx}
              statsNumber={item.statsNumber}
              error={error}
              isError={isError}
              isLoading={isLoading}
              isPercentage={item.isPercentage}
            />
          ))}
        </div>
      </div>
      <Separator />
      <GlobalFormMetrics />
      <GlobalLocationBarCharts />
    </div>
  );
}
