import styled from "styled-components";
import { useProducts } from "../hooks/useProducts";
import Product from "./Product";
import Spinner from "./Spinner";
import { Product as ProductType } from "../types/product.type";

const Container = styled.div`
  display: grid;
  place-content: center;
  height: 100%;
  width: 100%;
  gap: 2rem;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
`;

interface ProductsProps {
  region?: string;
}

const Products = ({ region }: ProductsProps) => {
  const { data: products, isLoading, isError } = useProducts(region);

  if (isError) {
    return <p>Something went wrong. Please try again.</p>;
  }

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        Array.isArray(products) &&
        (products as ProductType[]).map((item) => (
          <Product key={item._id} product={item} />
        ))
      )}
    </Container>
  );
};

export default Products;
