import styled from "styled-components";
import { useLocation } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  font-size: 3rem;
`;
const PaymentSuccessful = styled.p`
  background: red;
`;
const Small = styled.p`
  font-size: 1.5rem;
  color: black;
`;

const Success = () => {
  const location = useLocation();
  console.log(location);
  return (
    <Container>
      <PaymentSuccessful>Your Payment has been successful!</PaymentSuccessful>
      <Small> please wait for your order to be shipped</Small>
    </Container>
  );
};

export default Success;
