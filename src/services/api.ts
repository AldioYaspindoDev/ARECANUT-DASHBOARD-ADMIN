import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
}) as any; // cast to any so response interceptor returning response.data works seamlessly

api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: any) => response.data, // return data langsung, sama seperti React Native
  (error: any) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
