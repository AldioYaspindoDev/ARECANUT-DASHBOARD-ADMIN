import { api } from "./api";

export const HargaService = {
  GetAllHarga: async (skip: number = 0, limit: number = 100) => {
    const response = await api.get("api/harga", {
      params: { skip, limit },
    });
    return response.data;
  },

  GetHargaByGrade: async (grade: string) => {
    const response = await api.get(`api/harga/${grade}`);
    return response.data;
  },

  CreateHarga: async (hargaData: { grade: string; harga: string; keterangan?: string }) => {
    const response = await api.post("api/harga/", hargaData);
    return response.data;
  },

  UpdateHarga: async (hargaId: string, hargaData: { harga?: string; keterangan?: string }) => {
    const response = await api.put(`api/harga/${hargaId}`, hargaData);
    return response.data;
  },

  DeleteHarga: async (hargaId: string) => {
    const response = await api.delete(`api/harga/${hargaId}`);
    return response.data;
  },
};