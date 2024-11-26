// packages
import { useQuery } from "@tanstack/react-query";
import { CirclePlusIcon, EyeIcon, Loader2Icon } from "lucide-react";

// components
import DialogContentWrapper from "@/components/dialogs/dialog-content-wrapper";
import StartFormCreation from "@/components/forms/create-form/start-form-creation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

// local modules
import { useAuthContext } from "@/contexts/auth-context-provider";
import { formStatsAction } from "@/actions/form.actions";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type StatsCardsType = {
  title: string;
  desc?: string;
  statsNumber: number;
};

export default function Dashboard() {
  const { user } = useAuthContext();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: formStatsAction,
    queryKey: ["get-form-stats"],
    staleTime: 5000,
    refetchOnWindowFocus: true,
  });

  // stats cards
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
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"lg"}>
              <CirclePlusIcon size={22} />
              Create Form
            </Button>
          </DialogTrigger>
          <DialogContentWrapper
            title="Start creating form"
            description="Entering a title and description will redirect you to the form creation page."
          >
            <StartFormCreation />
          </DialogContentWrapper>
        </Dialog>

        <Link
          className={cn(
            buttonVariants({
              size: "lg",
              variant: "ghost",
            }),
          )}
          to={"/all-forms"}
        >
          <EyeIcon size={22} />
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
            <Card
              className="cursor-pointer transition-all hover:bg-secondary/30"
              key={idx}
            >
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
              <CardContent className="text-2xl font-semibold md:text-3xl lg:text-4xl">
                {isError ? (
                  <p className="text-sm text-destructive">{error.message}</p>
                ) : (
                  <>
                    {isLoading ? (
                      <Loader2Icon className="animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        {item.statsNumber}
                        {idx === 2 || idx === 3 ? "%" : ""}
                      </>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />
    </div>
  );
}
