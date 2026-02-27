import React from "react";
import styled from "styled-components";
import { regions } from "../assets/data";
import { tabletDevice, smallDevice } from "../Responsive";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  padding: 4rem;
  width: 100%;
  height: 100%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  ${smallDevice({ padding: "4rem ,1rem" })}
`;
const Title = styled.h1`
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 4rem;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  ${tabletDevice({ flexDirection: "column" })}
`;
const Image = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: hsla(104, 28%, 15%, 1);
  & svg {
    height: 100%;
    width: 100%;
  }
`;

const Info = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const P = styled.p`
  display: flex;
`;
const ExploreRegion = () => {
  const location = useLocation();
  const name = location.pathname.split("/")[2];
  const region = regions.filter(r => r.title === name);

  return (
    <Container>
      {region.map(r => (
        <Wrapper key={r.title}>
          <Image>{r.image}</Image>
          <Info>
            <Title>{r.title}</Title>
            <P>{r.info}</P>
          </Info>
        </Wrapper>
      ))}
    </Container>
  );
};

export default ExploreRegion;
