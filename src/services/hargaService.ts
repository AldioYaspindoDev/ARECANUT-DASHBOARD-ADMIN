import { api } from "./api";

export const HargaService = {
  GetAllHarga: async (skip: number = 0, limit: number = 100) => {
    return await api.get("api/harga", { params: { skip, limit } });
  },

  GetHargaByGrade: async (grade: string) => {
    return await api.get(`api/harga/${grade}`);
  },

  CreateHarga: async (hargaData: { grade: string; harga: string; keterangan?: string }) => {
    return await api.post("api/harga/", hargaData);
  },

  UpdateHarga: async (hargaId: string, hargaData: { harga?: string; keterangan?: string }) => {
    return await api.put(`api/harga/${hargaId}`, hargaData);
  },

  DeleteHarga: async (hargaId: string) => {
    return await api.delete(`api/harga/${hargaId}`);
  },
};
