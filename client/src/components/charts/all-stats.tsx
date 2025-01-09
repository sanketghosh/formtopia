// packages
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

// components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { fetchChartDataAction } from "@/actions/chart.actions";

const chartData = [
  {
    date: "2024-04-01",
    formVisits: 222,
    submissions: 150,
    responsePercentage: 40.5,
    bounceRate: 49.5,
  },
  {
    date: "2024-04-02",
    formVisits: 97,
    submissions: 180,
    responsePercentage: 40.5,
    bounceRate: 49.5,
  },
  /* 
  { date: "2024-04-03", formVisits: 167, submissions: 120 },
  { date: "2024-04-04", formVisits: 242, submissions: 260 },
  { date: "2024-04-05", formVisits: 373, submissions: 290 },
  { date: "2024-04-06", formVisits: 301, submissions: 340 },
  { date: "2024-04-07", formVisits: 245, submissions: 180 },
  { date: "2024-04-08", formVisits: 409, submissions: 320 },
  { date: "2024-04-09", formVisits: 59, submissions: 110 },
  { date: "2024-04-10", formVisits: 261, submissions: 190 },
  { date: "2024-04-11", formVisits: 327, submissions: 350 },
  { date: "2024-04-12", formVisits: 292, submissions: 210 },
  { date: "2024-04-13", formVisits: 342, submissions: 380 },
  { date: "2024-04-14", formVisits: 137, submissions: 220 },
  { date: "2024-04-15", formVisits: 120, submissions: 170 },
  { date: "2024-04-16", formVisits: 138, submissions: 190 },
  { date: "2024-04-17", formVisits: 446, submissions: 360 },
  { date: "2024-04-18", formVisits: 364, submissions: 410 },
  { date: "2024-04-19", formVisits: 243, submissions: 180 },
  { date: "2024-04-20", formVisits: 89, submissions: 150 },
  { date: "2024-04-21", formVisits: 137, submissions: 200 },
  { date: "2024-04-22", formVisits: 224, submissions: 170 },
  { date: "2024-04-23", formVisits: 138, submissions: 230 },
  { date: "2024-04-24", formVisits: 387, submissions: 290 },
  { date: "2024-04-25", formVisits: 215, submissions: 250 },
  { date: "2024-04-26", formVisits: 75, submissions: 130 },
  { date: "2024-04-27", formVisits: 383, submissions: 420 },
  { date: "2024-04-28", formVisits: 122, submissions: 180 },
  { date: "2024-04-29", formVisits: 315, submissions: 240 },
  { date: "2024-04-30", formVisits: 454, submissions: 380 },
  { date: "2024-05-01", formVisits: 165, submissions: 220 },
  { date: "2024-05-02", formVisits: 293, submissions: 310 },
  { date: "2024-05-03", formVisits: 247, submissions: 190 },
  { date: "2024-05-04", formVisits: 385, submissions: 420 },
  { date: "2024-05-05", formVisits: 481, submissions: 390 },
  { date: "2024-05-06", formVisits: 498, submissions: 520 },
  { date: "2024-05-07", formVisits: 388, submissions: 300 },
  { date: "2024-05-08", formVisits: 149, submissions: 210 },
  { date: "2024-05-09", formVisits: 227, submissions: 180 },
  { date: "2024-05-10", formVisits: 293, submissions: 330 },
  { date: "2024-05-11", formVisits: 335, submissions: 270 },
  { date: "2024-05-12", formVisits: 197, submissions: 240 },
  { date: "2024-05-13", formVisits: 197, submissions: 160 },
  { date: "2024-05-14", formVisits: 448, submissions: 490 },
  { date: "2024-05-15", formVisits: 473, submissions: 380 },
  { date: "2024-05-16", formVisits: 338, submissions: 400 },
  { date: "2024-05-17", formVisits: 499, submissions: 420 },
  { date: "2024-05-18", formVisits: 315, submissions: 350 },
  { date: "2024-05-19", formVisits: 235, submissions: 180 },
  { date: "2024-05-20", formVisits: 177, submissions: 230 },
  { date: "2024-05-21", formVisits: 82, submissions: 140 },
  { date: "2024-05-22", formVisits: 81, submissions: 120 },
  { date: "2024-05-23", formVisits: 252, submissions: 290 },
  { date: "2024-05-24", formVisits: 294, submissions: 220 },
  { date: "2024-05-25", formVisits: 201, submissions: 250 },
  { date: "2024-05-26", formVisits: 213, submissions: 170 },
  { date: "2024-05-27", formVisits: 420, submissions: 460 },
  { date: "2024-05-28", formVisits: 233, submissions: 190 },
  { date: "2024-05-29", formVisits: 78, submissions: 130 },
  { date: "2024-05-30", formVisits: 340, submissions: 280 },
  { date: "2024-05-31", formVisits: 178, submissions: 230 },
  { date: "2024-06-01", formVisits: 178, submissions: 200 },
  { date: "2024-06-02", formVisits: 470, submissions: 410 },
  { date: "2024-06-03", formVisits: 103, submissions: 160 },
  { date: "2024-06-04", formVisits: 439, submissions: 380 },
  { date: "2024-06-05", formVisits: 88, submissions: 140 },
  { date: "2024-06-06", formVisits: 294, submissions: 250 },
  { date: "2024-06-07", formVisits: 323, submissions: 370 },
  { date: "2024-06-08", formVisits: 385, submissions: 320 },
  { date: "2024-06-09", formVisits: 438, submissions: 480 },
  { date: "2024-06-10", formVisits: 155, submissions: 200 },
  { date: "2024-06-11", formVisits: 92, submissions: 150 },
  { date: "2024-06-12", formVisits: 492, submissions: 420 },
  { date: "2024-06-13", formVisits: 81, submissions: 130 },
  { date: "2024-06-14", formVisits: 426, submissions: 380 },
  { date: "2024-06-15", formVisits: 307, submissions: 350 },
  { date: "2024-06-16", formVisits: 371, submissions: 310 },
  { date: "2024-06-17", formVisits: 475, submissions: 520 },
  { date: "2024-06-18", formVisits: 107, submissions: 170 },
  { date: "2024-06-19", formVisits: 341, submissions: 290 },
  { date: "2024-06-20", formVisits: 408, submissions: 450 },
  { date: "2024-06-21", formVisits: 169, submissions: 210 },
  { date: "2024-06-22", formVisits: 317, submissions: 270 },
  { date: "2024-06-23", formVisits: 480, submissions: 530 },
  { date: "2024-06-24", formVisits: 132, submissions: 180 },
  { date: "2024-06-25", formVisits: 141, submissions: 190 },
  { date: "2024-06-26", formVisits: 434, submissions: 380 },
  { date: "2024-06-27", formVisits: 448, submissions: 490 },
  { date: "2024-06-28", formVisits: 149, submissions: 200 },
  { date: "2024-06-29", formVisits: 103, submissions: 160 },
  { date: "2024-06-30", formVisits: 446, submissions: 400 }, */
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  formVisits: {
    label: "Form Visits",
    color: "hsl(var(--chart-1))",
  },
  submissions: {
    label: "Submissions",
    color: "hsl(var(--chart-2))",
  },
  responsePercentage: {
    label: "Response Percentage",
    color: "hsl(var(--chart-3))",
  },
  bounceRate: {
    label: "Bounce Rate",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

type DataPointType = {
  submissions: number;
  formVisits: number;
  date: Date;
  responsePercentage: number;
  bounceRate: number;
};

export default function AllStats() {
  const { data } = useQuery({
    queryKey: ["fetch-overall-chart-stats"],
    queryFn: fetchChartDataAction,
    staleTime: 5000,
    refetchOnWindowFocus: true,
  });

  // console.log(data?.data);

  const groupedData = data?.data.reduce(
    (acc: DataPointType[], current: DataPointType) => {
      const { date, formVisits, submissions, responsePercentage, bounceRate } =
        current;
      const existing = acc.find((item) => item.date === date);

      if (existing) {
        existing.formVisits += formVisits;
        existing.submissions += submissions;

        // Recalculate aggregated responsePercentage and bounceRate
        const totalVisits = existing.formVisits;
        const totalSubmissions = existing.submissions;
        existing.responsePercentage =
          totalVisits > 0 ? (totalSubmissions / totalVisits) * 100 : 0;
        existing.bounceRate =
          totalVisits > 0 ? 100 - existing.responsePercentage : 0;
      } else {
        acc.push({
          date,
          formVisits,
          submissions,
          responsePercentage, // Use the value from the backend
          bounceRate, // Use the value from the backend
        });
      }

      return acc;
    },
    [] as DataPointType[], // Initial accumulator with correct type
  );

  console.log("@@grouped data", groupedData);

  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = groupedData?.filter((item: DataPointType) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillFormVisits" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-formVisits)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-formVisits)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSubmissions" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-submissions)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-submissions)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id="fillResponsePercentage"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-responsePercentage)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-responsePercentage)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillBounceRate" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-bounceRate)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-bounceRate)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="submissions"
              type="natural"
              fill="url(#fillSubmissions)"
              stroke="var(--color-submissions)"
              stackId="a"
            />
            <Area
              dataKey="formVisits"
              type="natural"
              fill="url(#fillFormVisits)"
              stroke="var(--color-formVisits)"
              stackId="a"
            />
            <Area
              dataKey="responsePercentage"
              type="natural"
              fill="url(#fillResponsePercentage)"
              stroke="var(--color-responsePercentage)"
              stackId="a"
            />
            <Area
              dataKey="bounceRate"
              type="natural"
              fill="url(#fillBounceRate)"
              stroke="var(--color-bounceRate)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
