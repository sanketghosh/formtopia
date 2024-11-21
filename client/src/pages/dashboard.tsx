// components
import { Button, buttonVariants } from "@/components/ui/button";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthContext } from "@/contexts/auth-context-provider";
import { cn } from "@/lib/utils";

// local modules
import { submissionPercentage } from "@/utils/submission-percentage";
import { CirclePlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

type StatsCardsType = {
  title: string;
  desc?: string;
  statsNumber: number;
};

const statsCards: StatsCardsType[] = [
  {
    title: "Forms created",
    desc: "Number of the total of forms created by you.",
    statsNumber: 200,
  },
  {
    title: "Submitted forms",
    desc: "Number of the total forms has been submitted by you.",
    statsNumber: 100,
  },
  {
    title: "Submitted forms percentage",
    desc: "Number of the total forms has been submitted by you.",
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
      <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-3">
        {statsCards.map((item: StatsCardsType, idx) => (
          <Card className="cursor-pointer transition-all hover:bg-secondary/30">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </CardHeader>
            <CardContent className="text-xl font-semibold md:text-3xl lg:text-4xl">
              {item.statsNumber}
              {idx === 2 ? "%" : ""}
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <Link
          to={"/create-form"}
          className={cn(
            buttonVariants({
              size: "lg",
              variant: "secondary",
            }),
          )}
        >
          <CirclePlusIcon />
          Create Form
        </Link>
      </div>
    </div>
  );
}
