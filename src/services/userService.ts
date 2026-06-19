import { api } from "./api";

export const UserService = {
  GetAllUser: async (skip: number = 0, limit: number = 100) => {
    const token = localStorage.getItem("token");
    const endpoint = token ? "api/admin/getuser" : "api/user/all";
    const response = await api.get(endpoint, {
      params: { skip, limit },
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("api/user/me");
    return response.data;
  },

  PromoteUser: async (userId: string) => {
    const response = await api.patch(`api/admin/promote/${userId}`, {});
    return response.data;
  },

  createPhotoProfile: async (file: File) => {
    const formData = new FormData();
    formData.append("gambar", file);
    const response = await api.post("api/user/upload-foto", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updatedPhotoProfile: async (userId: string, file: File) => {
    const formData = new FormData();
    formData.append("gambar", file);
    const response = await api.put(`api/user/${userId}/update-foto`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
};