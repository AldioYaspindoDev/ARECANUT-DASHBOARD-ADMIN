import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const getAuthHeaders = (isMultipart = false) => {
  const token = localStorage.getItem("token");
  return {
    ...(isMultipart ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const PinangService = {
  CreatePinang: async (formData: FormData) => {
    const response = await axios.post(`${API_BASE_URL}/api/pinang`, formData, {
      headers: getAuthHeaders(true),
    });
    return response.data;
  },

  GetAllPinang: async (skip: number = 0, limit: number = 100) => {
    const response = await axios.get(`${API_BASE_URL}/api/pinang`, {
      params: { skip, limit },
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  GetPinangById: async (pinangId: string) => {
    const response = await axios.get(`${API_BASE_URL}/api/pinang/${pinangId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
};
