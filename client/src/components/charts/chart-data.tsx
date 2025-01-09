import { fetchChartDataAction } from "@/actions/chart.actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function ChartData() {
  const { data } = useQuery({
    queryKey: ["fetch-overall-chart-stats"],
    queryFn: fetchChartDataAction,
    staleTime: 5000,
    refetchOnWindowFocus: true,
  });

  console.log(data?.data);

  return <div>ChartData</div>;
}
