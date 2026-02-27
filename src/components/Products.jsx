import React, { useEffect, useState } from "react";
import { publicRequest } from "../reqMethods";
import styled from "styled-components";
import { Link } from "react-router-dom";
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

const Cart = styled(Link)`
  text-decoration: none;
  color: white;
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
        products.map((item) => (
          <Cart to={`/store/${item._id}`} key={item._id}>
            <Product item={item} />
          </Cart>
        ))
      )}
    </Container>
  );
};

export default Products;
