import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const HistoryService = {
  GetAllHistory: async (skip: number = 0, limit: number = 100) => {
    const response = await axios.get(`${API_BASE_URL}/api/history/`, {
      params: { skip, limit },
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  GetHistoryById: async (historyId: string) => {
    const response = await axios.get(`${API_BASE_URL}/api/history/${historyId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
};
