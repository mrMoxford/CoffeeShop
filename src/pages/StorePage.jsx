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
const Select = styled.select`
  font-size: clamp(0.5rem, 2rem, 3rem);
  cursor: pointer;
  color: ${(props) => (props.active === true ? "red" : "black")};
  ${smallDevice({})}
`;
const Option = styled.option``;
const StorePage = () => {
  const [region, setRegion] = useState(null);
  const handleChange = (e) => {
    const value = e.target.value;
    setRegion(value === "all" ? null : value);
  };
  return (
    <Container>
      <CatContainer>
        <Select onChange={handleChange} value={region || "all"}>
          <Option value="all">All</Option>
          <Option value="Africa">Africa</Option>
          <Option value="Asia">Asia</Option>
          <Option value="South America">South America</Option>
        </Select>
      </CatContainer>
      <Products region={region} />
    </Container>
  );
};

export default StorePage;
