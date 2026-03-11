import axios, { InternalAxiosRequestConfig } from "axios";
// 🔧 Use InternalAxiosRequestConfig instead of AxiosRequestConfig
// 📌 Axios v1 interceptors require this internal type

export const BASE_URL: string = import.meta.env.VITE_API_URL;

export const publicRequest = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

export const userRequest = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

// Request interceptor
userRequest.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const storedCredentials = localStorage.getItem("auth");

    if (storedCredentials) {
      const parsedCred = JSON.parse(storedCredentials);

      if (parsedCred?.token) {
        config.headers.set("Authorization", `Bearer ${parsedCred.token}`);
        // 🔧 Use headers.set() for Axios v1
        // 📌 AxiosHeaders type requires this method
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);
