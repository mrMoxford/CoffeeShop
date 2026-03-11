import styled from "styled-components";
import { regions } from "../assets/data";
import { tabletDevice, smallDevice } from "../Responsive";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  padding: 4rem;
  font-size: 1.5rem;
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  ${smallDevice(`padding: 2rem ,1rem; `)}
`;
const Title = styled.h1`
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 4rem;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  justify-content: space-evenly;
  align-items: center;

  ${tabletDevice(`
    flex-direction: column;
    align-items: center;
  `)}
`;
const ImageContainer = styled.div`
  flex: 1 1 50%; /* wide screen: 50% of wrapper */
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  width: 100%;
  outline: hsla(104, 28%, 15%, 1);
`;
const Img = styled.img`
  width: 100%;
  height: auto; /* preserve aspect ratio */
  object-fit: contain;
  border-radius: 8px;
`;
const Info = styled.div`
  flex: 1 1 50%; /* wide screen: 50% of wrapper */
  padding: 1rem;

  ${tabletDevice(`
    flex: 1 1 100%;
    text-align: center;
  `)}
`;

const P = styled.p`
  margin-top: 1rem;
  line-height: 1.5;
`;
const Region = () => {
  const location = useLocation();
  const name = location.pathname.split("/")[2] || "";
  const region = regions.find(
    (r) => r.title.toLowerCase().trim() === name.toLowerCase().trim(),
  );
  return (
    <Container>
      {region ? (
        <Wrapper>
          <ImageContainer>
            <Img src={region.image} alt={region.title}></Img>
          </ImageContainer>
          <Info>
            <Title>{region.title}</Title>
            <P>{region.info}</P>
          </Info>
        </Wrapper>
      ) : (
        <P>Region not found</P>
      )}
    </Container>
  );
};

export default Region;
