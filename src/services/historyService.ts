import { api } from "./api";

export const HistoryService = {
  GetAllHistory: async (skip: number = 0, limit: number = 100) => {
    return await api.get("api/history/", { params: { skip, limit } });
  },

  GetHistoryById: async (historyId: string) => {
    return await api.get(`api/history/${historyId}`);
  },

  DeleteHistory: async (historyId: string) => {
    return await api.delete(`api/history/${historyId}`);
  },
};
