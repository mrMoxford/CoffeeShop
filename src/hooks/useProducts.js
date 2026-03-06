import { useEffect, useState } from "react";
import { publicRequest } from "../reqMethods";

export const useProducts = ({ id, region } = {}) => {
  const [products, setProducts] = useState(id ? null : []);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        let url = "/products";

        if (id) {
          url = `/products/find/${id}`;
        } else if (region) {
          url = `/products?region=${region}`;
        }

        const res = await publicRequest.get(url);

        setProducts(res.data.data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [id, region]);

  return { products, isLoading, error };
};
