// components
import { formStatsAction } from "@/actions/form.actions";
import DialogContentWrapper from "@/components/dialogs/dialog-content-wrapper";
import StartFormCreation from "@/components/forms/create-form/start-form-creation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useAuthContext } from "@/contexts/auth-context-provider";

// local modules
import { useQuery } from "@tanstack/react-query";
import { CirclePlusIcon, Loader2Icon } from "lucide-react";

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
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
          minima itaque quae dolorem id hic, aperiam consequatur animi harum
          ipsum.
        </p>
      </div>
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
                <>{error.message}</>
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

      <Dialog>
        <DialogTrigger asChild>
          <Button>
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
    </div>
  );
}
