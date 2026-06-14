import type { LoginResponse, LoginInterface } from "../interface/LoginAdmin";
import axios from "axios";

import { API_BASE_URL } from "../utils/constants";

export const LoginService = {
    login: async (credentials: LoginInterface): Promise<LoginResponse> => {
        const response = await axios.post<LoginResponse>(`${API_BASE_URL}/api/user/login`, credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
}
