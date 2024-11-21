// components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//
import { submissionPercentage } from "@/utils/submission-percentage";

type StatsCardsType = {
  title: string;
  desc?: string;
  statsNumber: number;
};

export default function Dashboard() {
  const statsCards = [
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

  return (
    <div>
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
    </div>
  );
}
