import { api } from "./api";

export const ArticleService = {
  GetAllService: async (skip: number = 0, limit: number = 100) => {
    const response = await api.get("api/article", {
      params: { skip, limit },
    });
    return response.data;
  },

  GetByIdService: async (articleId: string) => {
    const response = await api.get(`api/article/${articleId}`);
    return response.data;
  },

  CreateService: async (formData: FormData) => {
    const response = await api.post("api/article/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  UpdateService: async (articleId: string, articleData: { judul?: string; isi?: string; gambar?: string }) => {
    const response = await api.put(`api/article/${articleId}`, articleData);
    return response.data;
  },

  DeleteService: async (articleId: string) => {
    const response = await api.delete(`api/article/${articleId}`);
    return response.data;
  },
};