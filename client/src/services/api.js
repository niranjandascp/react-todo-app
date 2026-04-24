import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: "http://localhost:9002/api", // backend URL
  withCredentials: true, // useful if you use cookies later
});

// 🔐 Attach token automatically
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Handle global errors (optional but powerful)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    // 🔥 Auto logout if token invalid (optional)
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;