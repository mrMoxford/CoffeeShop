import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import { useCart } from "../hooks/useCart";
import { largeDevice } from "../Responsive";
import Like from "./Like";
import { Link } from "react-router-dom";
import { Product as ProductType } from "../types/product.type";

interface ProductProps {
  product: ProductType;
}
const Image = styled.img`
  height: 40%;
  aspect-ratio: 1/1;
  object-fit: cover;
  transition: scale 300ms ease-in;
`;
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  position: relative;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const SmallCircle = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid hsla(104, 28%, 15%, 0.2);
  color: hsla(104, 28%, 15%, 1);
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  padding: 2rem;
`;

const Size = styled.p`
  font-size: minmax(0.5rem, 2rem);
  padding: 1rem;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-1;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  aspect-ratio: 1/1.2;
  position: relative;
  &:hover ${Image} {
    ${largeDevice(`transform: scale(1.2);`)}
  }
`;

const Icon = styled.i`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  aspect-ratio: 1;
  cursor: pointer;
  transition: transform 0.3s ease;
  opacity: 0;
  transform: translateX(10px);

  transition: all 0.35s ease;

  svg {
    fill: white;
    transition: fill 0.3s ease;
  }
`;
const Price = styled.p`
  font-size: 1.5rem;
  transition: transform 0.35s ease;
`;
const PriceContainer = styled.div`
  flex: 1;
  width: 70%;
  display: flex;
  color: hsla(104, 28%, 15%, 1);
  border: 2px solid hsla(104, 28%, 15%, 1);
  aspect-ratio: 1/0.2;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 1rem;
  margin-top: 1rem;
  overflow: hidden;
  transition: all 0.35s ease;

  &:hover {
    width: 100%;
    justify-content: space-around;
    background: hsla(360, 65%, 20%, 1);
    color: white;
    transform: scale(1.02);
  }

  &:hover ${Icon} {
    opacity: 1;
    transform: translateX(0) rotate(180deg);
  }

  &:hover ${Price} {
    transform: translateX(-5px);
  }
`;

const Product = ({ product }: ProductProps) => {
  const { addItem } = useCart();
  const handleAddToCart = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation(); // prevents navigation
    addItem({ ...product }); // or your add-to-cart action
  };

  return (
    <Container>
      <Like productId={product._id} />
      <ImageContainer>
        <Link to={`/store/${product._id}`}>
          <SmallCircle>
            <Size>{product.size}</Size>
          </SmallCircle>
          <Image src={product.image} />
        </Link>
      </ImageContainer>
      <PriceContainer>
        <Price>¥{product.price}</Price>
        <Icon onClick={(e) => handleAddToCart(e)}>
          <AiOutlinePlus size={30} />
        </Icon>
      </PriceContainer>
    </Container>
  );
};

export default Product;
