// components
import FormCard from "@/components/cards/form-card";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthContext } from "@/contexts/auth-context-provider";

// local modules
import { submissionPercentage } from "@/utils/submission-percentage";
import { CirclePlusIcon } from "lucide-react";

type StatsCardsType = {
  title: string;
  desc?: string;
  statsNumber: number;
};

const statsCards: StatsCardsType[] = [
  {
    title: "Forms created",
    desc: "Number of the total of forms created.",
    statsNumber: 200,
  },
  {
    title: "Submitted forms",
    desc: "Number of the total forms has been submitted.",
    statsNumber: 100,
  },
  {
    title: "Response percentage",
    desc: "Percentage of response received.",
    statsNumber: submissionPercentage(200, 33),
  },
  {
    title: "Bounce rate",
    desc: "Rate of forms have not been submitted.",
    statsNumber: submissionPercentage(200, 33),
  },
];

export default function Dashboard() {
  const { user } = useAuthContext();

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
          <Card className="cursor-pointer transition-all hover:bg-secondary/30">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </CardHeader>
            <CardContent className="text-2xl font-semibold md:text-3xl lg:text-4xl">
              {item.statsNumber}
              {idx === 2 || idx === 3 ? "%" : ""}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Create Form</Button>
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
