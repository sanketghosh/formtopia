// packages
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

// components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";

const chartData = [
  { date: "2024-04-03", continent: "Africa", submissions: 120 },
  { date: "2024-04-04", continent: "Asia", submissions: 260 },
  { date: "2024-04-05", continent: "Oceania", submissions: 290 },
  { date: "2024-04-06", continent: "North America", submissions: 340 },
  { date: "2024-04-07", continent: "Africa", submissions: 180 },
  { date: "2024-04-08", continent: "South America", submissions: 320 },
  { date: "2024-04-09", continent: "Oceania", submissions: 110 },
  { date: "2024-04-10", continent: "Europe", submissions: 190 },
  { date: "2024-04-11", continent: "Asia", submissions: 350 },
  { date: "2024-04-12", continent: "Asia", submissions: 210 },
  { date: "2024-04-13", continent: "South America", submissions: 380 },
  { date: "2024-04-14", continent: "Oceania", submissions: 220 },
  { date: "2024-04-15", continent: "Asia", submissions: 170 },
  { date: "2024-04-16", continent: "Africa", submissions: 190 },
];

const chartConfig = {
  continent: {
    label: "Continent",
    color: "hsl(var(--chart-2))",
  },
  submissions: {
    label: "Submissions",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export default function BarChartContinent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Custom Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <Input className="mb-3 w-full md:w-64 lg:w-72" placeholder="Search" />
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="continent"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="submissions" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="submissions"
              layout="vertical"
              fill="var(--color-submissions)"
              radius={4}
            >
              <LabelList
                dataKey="continent"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="submissions"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
