import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const getAuthHeaders = (isMultipart = false) => {
  const token = localStorage.getItem("token");
  return {
    ...(isMultipart ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const ArticleService = {
  GetAllService: async (skip: number = 0, limit: number = 100) => {
    const response = await axios.get(`${API_BASE_URL}/api/article`, {
      params: { skip, limit },
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  GetByIdService: async (articleId: string) => {
    const response = await axios.get(`${API_BASE_URL}/api/article/${articleId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  CreateService: async (formData: FormData) => {
    const response = await axios.post(`${API_BASE_URL}/api/article/`, formData, {
      headers: getAuthHeaders(true),
    });
    return response.data;
  },

  UpdateService: async (articleId: string, articleData: { judul?: string; isi?: string; gambar?: string }) => {
    const response = await axios.put(`${API_BASE_URL}/api/article/${articleId}`, articleData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  DeleteService: async (articleId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/api/article/${articleId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
};