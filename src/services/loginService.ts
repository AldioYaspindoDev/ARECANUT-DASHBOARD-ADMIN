import type { LoginResponse, LoginInterface } from "../interface/LoginAdmin";
import { api } from "./api";

export const LoginService = {
    login: async (credentials: LoginInterface): Promise<LoginResponse> => {
        const response: any = await api.post('/api/user/login', credentials);
        // response sudah berupa data langsung (interceptor return response.data)
        const token = response?.access_token || response?.data?.access_token || response?.token;
        if (!token || typeof token !== "string") {
            throw new Error(`Token tidak valid atau tidak ditemukan: ${JSON.stringify(response)}`);
        }
        return { access_token: token, token_type: response?.token_type || "bearer" };
    }
}
