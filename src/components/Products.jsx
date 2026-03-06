import styled from "styled-components";
import { useProducts } from "../hooks/useProducts";
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
  const { products, isLoading, error } = useProducts({ region });
  if (error) {
    return <p>Something went wrong. Please try again.</p>;
  }
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
