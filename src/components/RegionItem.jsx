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
  border-left: ${props =>
    props.id === 1 ? "1px solid hsla(104, 28%, 15%, 0.2)" : "none"};
  ${tabletDevice({ border: "none" })};
`;
const Image = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  & svg {
    height: 100%;
    width: 100%;

    @media (min-width: 54.6em) {
      &:hover path {
        fill: hsla(104, 28%, 15%, 1);
      }
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
  return (
    <Container id={id}>
      <Region to={`/regions/${item.title}`}>
        <Image>{item.image}</Image>
      </Region>
      <Info>
        <Title>{item.title}</Title>
      </Info>
    </Container>
  );
};

export default RegionItem;
