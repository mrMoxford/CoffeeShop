import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 4rem;
  display: flex;
  gap: 3rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
`;

const H1 = styled.h1`
  font-size: 3rem;
`;

const P = styled.p`
  font-size: 2rem;
  background: red;
  color: white;
`;

const LittleP = styled.p`
  font-size: 1rem;
`;

const I = styled.i``;

const Error404 = () => {
  const error = useRouteError();

  console.error(error);

  return (
    <Container>
      <H1>Oops!</H1>
      <P>Sorry, an unexpected error has occurred.</P>
      <LittleP>
        <I>{error?.statusText || error?.message || "Unknown error"}</I>
      </LittleP>
    </Container>
  );
};

export default Error404;
