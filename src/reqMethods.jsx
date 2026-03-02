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
    const storedCredentials = localStorage.getItem("auth");

    if (storedCredentials) {
      const parsedCred = JSON.parse(storedCredentials);

      if (parsedCred.token) {
        config.headers.Authorization = `Bearer ${parsedCred.token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);
