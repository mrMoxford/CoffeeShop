import React from "react";
import styled from "styled-components";
import { tabletDevice, smallDevice } from "../Responsive";
import { Link } from "react-router-dom";
const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-right: 1px solid hsla(104, 28%, 15%, 0.2);
  border-left: ${(props) =>
    props.id === 1 ? "1px solid hsla(104, 28%, 15%, 0.2)" : "none"};
  ${tabletDevice({ border: "none" })};
`;

const Img = styled.img`
  height: 50vh;
  width: auto;
  filter: grayscale(100%) brightness(0.8);
  @media (min-width: 54.6em) {
    &:hover {
      filter: hue-rotate(90deg);
    }
  }
`;
const Info = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.p`
  color: black;
  font-weight: bold;
  font-size: 2rem;
`;
const Region = styled(Link)``;
const RegionItem = ({ id, item }) => {
  console.log(item.image);
  return (
    <Container id={id}>
      <Region to={`/regions/${item.title}`}>
        <Img src={item.image} alt={item.title} />
      </Region>
      <Info>
        <Title>{item.title}</Title>
      </Info>
    </Container>
  );
};

export default RegionItem;
