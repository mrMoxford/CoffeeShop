// hooks/useFavorites.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  toggleFavorite as toggleFavoriteService,
  getFavorites as getFavoritesService,
} from "../services/favoriteService";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { staticProducts } from "../assets/staticData/staticProducts";

export interface Favorite {
  _id: string;
  name?: string;
  image?: string;
}

export interface FavoriteResponse {
  favorites: Favorite[];
  totalFavorites: number;
}

export const useFavorites = () => {
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);

  /*
  ----------------------------------
  Logged-in favorites (from backend)
  ----------------------------------
  */

  const { data: favoritesData, isLoading } = useQuery<FavoriteResponse>({
    queryKey: ["favorites"],
    queryFn: () => getFavoritesService(),
    enabled: !!user,
    staleTime: 1000 * 60, // 1 minute
  });

  /*
  ----------------------------------
  Guest favorites (React Query cache)
  ----------------------------------
  */

  const { data: guestFavorites = [] } = useQuery({
    queryKey: ["guestFavorites"],
    queryFn: () => JSON.parse(localStorage.getItem("favorites") || "[]"),
    staleTime: Infinity,
    enabled: !user,
  });

  /*
  ----------------------------------
  Fast product lookup map
  ----------------------------------
  */

  const productMap = Object.fromEntries(staticProducts.map((p) => [p._id, p]));

  /*
  ----------------------------------
  Convert guest ids → product info
  ----------------------------------
  */

  const guestFavoritesFull: Favorite[] = guestFavorites.map((id: string) => {
    const product = productMap[id];

    return product
      ? { _id: id, name: product.name, image: product.image }
      : { _id: id, name: "Unknown", image: "/placeholder.png" };
  });

  /*
  ----------------------------------
  Toggle favorite mutation (logged in)
  ----------------------------------
  */

  const toggleMutation = useMutation({
    mutationFn: toggleFavoriteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  /*
  ----------------------------------
  Toggle favorite
  ----------------------------------
  */

  const toggleFavorite = (productId: string) => {
    if (!productId) return;

    if (user) {
      toggleMutation.mutate(productId);
    } else {
      let updatedFavorites;

      if (guestFavorites.includes(productId)) {
        updatedFavorites = guestFavorites.filter(
          (id: string) => id !== productId,
        );
      } else {
        updatedFavorites = [...guestFavorites, productId];
      }

      // update React Query cache
      queryClient.setQueryData(["guestFavorites"], updatedFavorites);

      // persist to localStorage
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  /*
  ----------------------------------
  Unified favorites
  ----------------------------------
  */

  const favorites: Favorite[] = user
    ? (favoritesData?.favorites ?? [])
    : guestFavoritesFull;

  return {
    favorites,
    totalFavorites: favorites.length,
    toggleFavorite,
    isLoading,
  };
};
