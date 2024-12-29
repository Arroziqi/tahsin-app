import axios from "axios";
import { API_BASE_URL } from "@/libs/core/config";

export const mobileApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
