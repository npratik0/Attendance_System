import axios from "axios";

const API_URL = "http://localhost:5000"; // Ensure this matches your backend URL

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // The backend should return a token or user object
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};