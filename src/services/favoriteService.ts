// src/services/favoritesService.ts
import { userRequest } from "../reqMethods"; // Axios instance with auth

export const toggleFavorite = async (productId: string) => {
  const res = await userRequest.post(`/favorites/${productId}`);
  return res.data; // { liked: true/false }
};

export const getFavorites = async () => {
  const res = await userRequest.get("/favorites");
  return res.data; // { favorites: [...], totalFavorites: number }
};
