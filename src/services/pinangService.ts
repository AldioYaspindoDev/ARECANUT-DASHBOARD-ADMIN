import { api } from "./api";

export const PinangService = {
  CreatePinang: async (formData: FormData) => {
    const response = await api.post("api/pinang", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  GetAllPinang: async (skip: number = 0, limit: number = 100) => {
    const response = await api.get("api/pinang", {
      params: { skip, limit },
    });
    return response.data;
  },

  GetPinangById: async (pinangId: string) => {
    const response = await api.get(`api/pinang/${pinangId}`);
    return response.data;
  },
};
