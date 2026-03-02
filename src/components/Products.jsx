import { useEffect, useState } from "react";
import { publicRequest } from "../reqMethods";
import styled from "styled-components";

import Product from "./Product";
import Spinner from "./Spinner";

const Container = styled.div`
  display: grid;
  place-content: center;
  heigth: 100%;
  width: 100%;
  gap: 2rem;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
`;

const Products = ({ region }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          region ? `/products?region=${region}` : `/products`,
        );

        // API returns { success: true, data: [...] }
        setProducts(res.data.data || []);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    getProducts();
  }, [region]);

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        Array.isArray(products) &&
        products.map((item) => <Product key={item._id} item={item} />)
      )}
    </Container>
  );
};

export default Products;
