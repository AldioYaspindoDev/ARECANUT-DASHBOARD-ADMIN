import type { LoginResponse, LoginInterface } from "../interface/LoginAdmin";
import { api } from "./api";

export const LoginService = {
    login: async (credentials: LoginInterface): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>("api/user/login", credentials);
        return response.data;
    }
}
