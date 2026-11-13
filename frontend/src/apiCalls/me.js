import { api } from "../utils/axios";

export const me = async () => {
  try {
    const { data } = await api.get("/api/me");

    return data;
  } catch (error) {
    console.error(
      "Login API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};