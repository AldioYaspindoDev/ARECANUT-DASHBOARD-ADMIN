import { api } from "./api";

export const UserService = {
  GetAllUser: async (skip: number = 0, limit: number = 100) => {
    const token = localStorage.getItem("token");
    const endpoint = token ? "api/admin/getuser/" : "api/user/all/";
    return await api.get(endpoint, { params: { skip, limit } });
  },

  getCurrentUser: async () => {
    return await api.get("api/user/me/");
  },

  PromoteUser: async (userId: string) => {
    return await api.patch(`api/admin/promote/${userId}`, {});
  },

  createPhotoProfile: async (file: File) => {
    const formData = new FormData();
    formData.append("gambar", file);
    return await api.post("api/user/upload-foto", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateUser: async (userId: string, userData: { username?: string; email?: string; password?: string }) => {
    return await api.put(`api/user/${userId}`, userData);
  },

  updatedPhotoProfile: async (userId: string, file: File) => {
    const formData = new FormData();
    formData.append("gambar", file);
    return await api.put(`api/user/${userId}/update-foto`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deletePhotoProfile: async (userId: string) => {
    return await api.delete(`api/user/${userId}/delete-foto`);
  },

  deleteUser: async (userId: string) => {
    return await api.delete(`api/user/${userId}`);
  },
};
