import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../components/Spinner";
import { useProduct } from "../hooks/useProduct";
import { addToCart } from "../Redux/CartSlice";
import { smallDevice, tabletDevice } from "../Responsive";
import { Product } from "../types/product.type";

const Container = styled.div`
  padding: 2rem 6rem;
  min-height: 100vh;
  width: 100%;
  display: flex;
  font-weight: 200;
  font-size: 1.5rem;
  color: black;
  background: hsl(0, 0%, 100%);
  ${smallDevice(`padding: 1rem; `)};
`;

const Wrapper = styled.div`
  flex: 1;
  margin-top: 5rem;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${tabletDevice(`flex-direction: column-reverse;`)};
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  ${tabletDevice(`marginBottom: 2rem;`)};
`;

const ProductInfo = styled.ul`
  display: flex;
  flex: 1;
  margin: 0;
  padding-right: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  list-style: none;
  ${tabletDevice(`padding: 0;`)};
`;

const Selects = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${smallDevice(`flex-direction: column; align-items: flex-start; `)};
`;

const Image = styled.img``;

const Name = styled.h1`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 200;
`;

const Brand = styled.li``;
const Region = styled.li``;
const Country = styled.li``;
const RoastLevel = styled.li``;
const FlavourProfile = styled.li`
  margin-bottom: 2rem;
`;

const Price = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 2rem;
`;

const Button = styled.button`
  padding: 1rem;
  font-weight: 500;
  font-size: 1rem;
  outline: none;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: hsla(104, 28%, 15%, 1);
  cursor: pointer;
  &:hover {
    background-color: hsla(360, 65%, 20%, 1);
    color: white;
  }
  ${smallDevice(`width: 100%;`)};
`;

const SingleProduct = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data: product, isLoading, isError } = useProduct(id);
  const dispatch = useDispatch();
  const handleClick = (product: Product) => {
    if (product) {
      dispatch(addToCart({ ...product }));
    }
  };

  if (isLoading) return <Spinner />;

  if (!product) return <p>Product not found.</p>;

  return (
    <Container>
      <Wrapper>
        <ProductInfo>
          <Name>{product.name}</Name>
          <Brand>
            <b>Brand:</b> {product.brand}
          </Brand>
          <Region>
            <b>Region:</b> {product.region}
          </Region>
          <Country>
            <b>Origin:</b> {product.country}
          </Country>
          <RoastLevel>
            <b>Roast Level:</b> {product.roastLevel}
          </RoastLevel>
          <FlavourProfile>
            <b>Flavour Profile:</b> {product.flavourProfile}
          </FlavourProfile>
          <Selects>
            <Price>¥{product.price}</Price>
            <Button onClick={() => handleClick(product)}>Add to Basket</Button>
          </Selects>
        </ProductInfo>

        <ImageContainer>
          <Image src={product.image} alt={product.name} />
        </ImageContainer>
      </Wrapper>
    </Container>
  );
};

export default SingleProduct;
