// src/hooks/useProduct.ts
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import { Product } from "../types/product.type";
import { staticProducts } from "../assets/staticData/staticProducts";
export const useProduct = (id: string) => {
  return useQuery<Product | undefined>({
    queryKey: ["product", id],
    queryFn: async () => {
      const data = await getProducts(id);
      // Backend might return an array or single object
      if (Array.isArray(data)) return data[0];
      return data;
    },
    enabled: !!id,
    initialData: () => staticProducts.find((product) => product._id === id),
  });
};
