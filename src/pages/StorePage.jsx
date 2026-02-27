import styled from "styled-components";
import Products from "../components/Products";
import { smallDevice } from "../Responsive";
import React, { useState } from "react";
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: hsla(0, 0%, 85%, 0.5);
  ${smallDevice({
    padding: "4rem 1rem",
  })}
`;
const CatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  width: 100%;
  margin-block: 2rem;
  ${smallDevice({
    alignItems: "flex-start",
  })}
`;
const Cat = styled.p`
  font-size: clamp(0.5rem, 2rem, 3rem);
  cursor: pointer;
  color: ${props => (props.active === true ? "red" : "black")};
  ${smallDevice({})}
`;
const StorePage = () => {
  const [region, setRegion] = useState(null);
  const handleClick = e => {
    setRegion(e.target.getAttribute("value"));
  };
  return (
    <Container>
      <CatContainer>
        <Cat active={region === null ? true : false} onClick={handleClick}>
          All
        </Cat>
        <Cat
          active={region === "Africa" ? true : false}
          value="Africa"
          onClick={handleClick}
        >
          Africa
        </Cat>
        <Cat
          active={region === "Asia" ? true : false}
          value="Asia"
          onClick={handleClick}
        >
          Asia
        </Cat>
        <Cat
          active={region === "South America" ? true : false}
          value="South America"
          onClick={handleClick}
        >
          South America
        </Cat>
      </CatContainer>
      <Products region={region} />
    </Container>
  );
};

export default StorePage;
