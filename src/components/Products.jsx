import React, { useEffect, useState } from "react";
import { BASE_URL } from "../reqMethods";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Product from "./Product";
import Spinner from "./Spinner";
import axios from "axios";
// import { products } from "../assets/data";

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
        const res = await axios.get(
          region
            ? `${BASE_URL}/products?region=${region}`
            : `${BASE_URL}/products`
        );
        setProducts(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, [region]);
  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        products.map(item => (
          <Cart to={`/store/${item._id}`} key={item._id}>
            <Product item={item} />
          </Cart>
        ))
      )}
    </Container>
  );
};

export default Products;
