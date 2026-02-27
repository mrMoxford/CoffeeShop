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
