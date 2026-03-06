import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import { useCart } from "../hooks/useCart";
import { largeDevice } from "../Responsive";

import { useNavigate } from "react-router-dom";
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
  cursor: pointer;
  &:hover {
    ${largeDevice({
      transform: "scale(1.1)",
      transition: " scale 500ms ease-in",
    })}
  }
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
  aspect-ratio: 1/1.2;
  position: relative;
`;

const Image = styled.img`
  heigth: 40%;
  aspect-ratio: 1/1;
  object-fit: cover;
`;

const PriceContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  color: white;
  aspect-ratio: 1/0.2;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: hsla(360, 65%, 20%, 1);
  margin-top: 1rem;
`;
const Price = styled.p`
  font-size: 1.5rem;
`;
const Icon = styled.i`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  aspect-ratio: 1;
`;

const Product = ({ item }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevents navigation
    addItem({ ...item }); // or your add-to-cart action
  };
  const handleNavigate = () => {
    navigate(`/store/${item._id}`);
  };

  return (
    <Container onClick={handleNavigate}>
      <ImageContainer>
        <SmallCircle>
          <Size>{item.size}</Size>
        </SmallCircle>
        <Image src={item.image} />
      </ImageContainer>

      <PriceContainer onClick={(e) => handleAddToCart(e)}>
        <Price>¥{item.price}</Price>
        <Icon>
          <AiOutlinePlus color="white" size={30} />
        </Icon>
      </PriceContainer>
    </Container>
  );
};

export default Product;
