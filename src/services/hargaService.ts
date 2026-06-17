import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const HargaService = {
  GetAllHarga: async (skip: number = 0, limit: number = 100) => {
    const response = await axios.get(`${API_BASE_URL}/api/harga`, {
      params: { skip, limit },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  GetHargaByGrade: async (grade: string) => {
    const response = await axios.get(`${API_BASE_URL}/api/harga/${grade}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  CreateHarga: async (hargaData: { grade: string; harga: string; keterangan?: string }) => {
    const response = await axios.post(`${API_BASE_URL}/api/harga/`, hargaData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  UpdateHarga: async (hargaId: string, hargaData: { harga?: string; keterangan?: string }) => {
    const response = await axios.put(`${API_BASE_URL}/api/harga/${hargaId}`, hargaData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  DeleteHarga: async (hargaId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/api/harga/${hargaId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
};