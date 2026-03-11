import { publicRequest } from "../reqMethods";
import { Product } from "../types/product.type";

export const getProducts = async (
  id?: string,
  region?: string,
): Promise<Product | Product[]> => {
  let url = "/products";

  if (id) {
    url = `/products/find/${id}`;
  } else if (region) {
    url = `/products?region=${region}`;
  }

  const res = await publicRequest.get(url);

  return res.data.data;
};
