import React from "react";
import styled from "styled-components";
import { regions } from "../assets/data";
import ExploreRegion from "./ExploreRegion";
const Container = styled.div`
  padding: 2rem 4rem;
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 3rem;
`;
const Explore = () => {
  return (
    <Container>
      {regions.map(region => (
        <ExploreRegion key={region.id} item={region} />
      ))}
    </Container>
  );
};

export default Explore;
