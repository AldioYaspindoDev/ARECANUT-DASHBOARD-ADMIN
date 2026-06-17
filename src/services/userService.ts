import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const UserService = {
  GetAllUser: async (skip: number = 0, limit: number = 100) => {
    // Sebagai admin dashboard, kita gunakan endpoint admin jika ada token
    const token = localStorage.getItem("token");
    const endpoint = token ? "/api/admin/getuser" : "/api/user/all";
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      params: { skip, limit },
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  PromoteUser: async (userId: string) => {
    const response = await axios.patch(
      `${API_BASE_URL}/api/admin/promote/${userId}`,
      {},
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  },
};