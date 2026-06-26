import { api } from "./api";

export const ArticleService = {
  GetAllService: async (skip: number = 0, limit: number = 100) => {
    return await api.get("api/article/", { params: { skip, limit } });
  },

  GetByIdService: async (articleId: string) => {
    return await api.get(`api/article/${articleId}`);
  },

  CreateService: async (formData: FormData) => {
    return await api.post("api/article/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  UpdateService: async (articleId: string, articleData: { judul?: string; isi?: string; gambar?: string }) => {
    return await api.put(`api/article/${articleId}`, articleData);
  },

  DeleteService: async (articleId: string) => {
    return await api.delete(`api/article/${articleId}`);
  },
};
