import axiosApi from "@/lib/axios-api";

export const fetchChartDataAction = async () => {
  const response = await axiosApi.get(`/api/v1/chart/overall-chart-data`);
  console.log(response.data);
  return response.data;
};
