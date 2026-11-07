import { api } from "../utils/axios";

export const login = async (token) => {
  try {
    const { data } = await api.post("/api/auth/login", {
      token,
    });

    return data;
  } catch (error) {
    console.error(
      "Login API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};