import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../hooks/useCart";
import { useParams } from "react-router-dom";
import { userRequest } from "../reqMethods";
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
  const { handleClearCart } = useCart();
  const { orderId } = useParams(); // or pass via query params

  useEffect(() => {
    if (!orderId) return;

    const interval = setInterval(async () => {
      const res = await userRequest.get(`/orders/${orderId}`);
      if (res.data.status === "paid") {
        handleClearCart(); // ✅ clears cart
        clearInterval(interval); // stop polling
      }
    }, 2000); // every 2 seconds

    return () => clearInterval(interval);
  }, [orderId, handleClearCart]);

  return (
    <Container>
      <PaymentSuccessful>Your Payment has been successful!</PaymentSuccessful>
      <Small> please wait for your order to be shipped</Small>
    </Container>
  );
};

export default Success;
