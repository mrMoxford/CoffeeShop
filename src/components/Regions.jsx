import styled from "styled-components";
import RegionItem from "./RegionItem";
import { regions } from "../assets/data";
import { tabletDevice, smallDevice } from "../Responsive";

const Container = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  justify-content: flex-end;
  align-items: flex-start;
  background: hsla(0, 0%, 85%, 0.5);
  ${smallDevice({ padding: "1rem" })}
`;
const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: space-between;
  gap: 2rem;
  ${tabletDevice({ flexDirection: "column" })};
`;
const Title = styled.h2`
  flex: 1;
  width: 50%;
  font-size: clamp(1rem, 6vw, 3rem);
  color: black;
  ${tabletDevice({ width: "100%" })}
  ${smallDevice({ marginTop: "4rem" })}
`;

const Regions = () => {
  return (
    <Container id="Explore">
      <Title>Pick a region on the map to start your journey.</Title>
      <Wrapper>
        {regions.map(region => (
          <RegionItem
            key={region.id}
            id={region.id}
            item={region}
            className={region.title}
          />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Regions;
