// src/hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import { Product } from "../types/product.type";
import { staticProducts } from "../assets/staticData/staticProducts";
export const useProducts = (region?: string) => {
  return useQuery<Product[]>({
    queryKey: ["products", region],
    queryFn: () => getProducts(undefined, region) as Promise<Product[]>,
    initialData: staticProducts,
  });
};
