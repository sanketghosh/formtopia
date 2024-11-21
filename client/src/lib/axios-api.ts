import { API_BASE_URL } from "@/constants";
import axios from "axios";

const axiosApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// request interceptor
axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("ERR0R!Unauthorized access.");
      throw new Error("ERROR! Unauthorized access.");
    }
    return Promise.reject(error);
  },
);

export default axiosApi;
