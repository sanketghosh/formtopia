import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BarChartContinent from "./bar-chart-continent";

export default function GlobalLocationBarCharts() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <BarChartContinent />
          <BarChartContinent />
          <BarChartContinent />
          <BarChartContinent />
        </div>
      </CardContent>
    </Card>
  );
}
