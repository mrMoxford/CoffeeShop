// src/types/favorites.type.ts

import { Product } from "./product.type";

export interface FavoritesResponse {
  favorites: Product[];
  totalFavorites: number;
}

export interface ToggleFavoriteResponse {
  liked: boolean;
}
