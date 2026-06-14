import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

export const UserService = {

  GetAllUser: async (skip: number = 0, limit: number = 100) => {
    const response = await axios.get(`${API_BASE_URL}/api/user/all`, {
      params: { skip, limit },
      headers: {
        'Content-Type' : 'application/json'
      }
    });
    return response.data;
  }

} 