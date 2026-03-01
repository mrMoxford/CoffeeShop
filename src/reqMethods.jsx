import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const publicRequest = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

export const userRequest = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

// 🔥 ADD THIS
userRequest.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.accessToken) {
        config.headers.Authorization = `Bearer ${parsedUser.accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);
