import { api } from "./api";

export const HistoryService = {
  GetAllHistory: async (skip: number = 0, limit: number = 100) => {
    const response = await api.get("api/history/", {
      params: { skip, limit },
    });
    return response.data;
  },

  GetHistoryById: async (historyId: string) => {
    const response = await api.get(`api/history/${historyId}`);
    return response.data;
  },

  DeleteHistory: async (historyId: string) => {
    const response = await api.delete(`api/history/${historyId}`);
    return response.data;
  },
};
