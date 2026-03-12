// src/pages/ShoppingCart.tsx
import React from "react";
import styled from "styled-components";
import { HiMinus, HiPlus } from "react-icons/hi";
import { TiDelete } from "react-icons/ti";
import { tabletDevice, smallDevice, mediumDevice } from "../Responsive";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: black;
  font-size: 1.2rem;
  background: hsl(0, 0%, 100%);
  ${smallDevice(`padding: 1rem; font-size: 1rem ;`)};
`;

const Title = styled.h1`
  margin-block: 4rem;
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-weight: 200;
  text-transform: uppercase;
  ${smallDevice(`margin-bottom: "1rem";`)};
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mediumDevice(`flex-direction: column;`)};
`;

const Sections = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 4rem;
  ${tabletDevice(` margin: 0; `)};
  ${smallDevice(`align-items: center; `)};
`;

const Topsection = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 4rem;
`;

const TopButton = styled(Link)`
  padding: 1rem;
  cursor: pointer;
  background: transparent;
  text-decoration: none;
  border: none;
  color: black;
`;

const Bottomsection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
`;

const CartItem = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas: "image name size price quantity delete";
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  place-content: center;
  place-items: center start;
  text-align: start;
  column-gap: 2rem;

  @media (max-width: 56.25em) {
    grid-template-areas: "image quantity size" "name price delete";
    grid-template-columns: repeat(3, 1fr);
    place-content: center;
    place-items: center;
    text-align: center;
  }
  @media (max-width: 31.25em) {
    grid-template-areas: "image quantity" "name price" "size delete";
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
`;

const CartItemThumbnail = styled.img`
  width: 5rem;
  aspect-ratio: 1;
  grid-area: image;
`;

const CartItemName = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  grid-area: name;
`;

const CartItemDetails = styled.i`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  grid-area: size;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  grid-area: quantity;
`;

const ItemQuantity = styled.p`
  padding: 0.5rem;
  border-radius: 50%;
`;

const ItemPrice = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  grid-area: price;
`;

const Hr = styled.hr`
  background-color: hsla(360, 65%, 20%, 0.1);
  border: none;
  height: 1px;
  width: 100%;
`;

const ClearButton = styled.button`
  font-size: 1.5rem;
  padding: 1rem;
  margin-block: 2rem;
  border: none;
  background-color: hsl(0, 100%, 19%);
  color: white;
  outline: transparent;
  cursor: pointer;
`;

const Summary = styled.div`
  flex: 1;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  color: hsla(104, 28%, 15%, 1);
  gap: 2rem;
  padding: 1rem;
  ${mediumDevice(`width: 100%;`)};
`;

const SummaryTitle = styled.h2`
  font-size: 2rem;
  font-weight: 300;
  align-self: flex-start;
`;

const SummaryItem = styled.div<{ type?: string }>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: ${(props) => (props.type === "total" ? 500 : "normal")};
  font-size: ${(props) => (props.type === "total" ? "1.3rem" : "1rem")};
  margin-bottom: ${(props) => (props.type === "total" ? "2rem" : "0")};
`;

const SummaryText = styled.span``;
const SummaryPrice = styled.span``;

const CheckoutButton = styled.button`
  padding: 1rem;
  outline: transparent;
  cursor: pointer;
  width: 100%;
  color: black;
  border: 2px solid black;
  background: transparent;
  &:hover {
    color: white;
    background-color: hsla(104, 28%, 15%, 1);
  }
  ${mediumDevice(`width: 50%;`)};
  ${tabletDevice(`width: 100%;`)};
`;

const Empty = styled.p``;
const ErrorContainer = styled.div`
  display: flex;
  gap: 1rem;
  text-decoration: none;
`;
const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ShoppingCart = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    cart,
    checkoutError,
    summaryTotal,
    cartShipping,
    cartDiscount,
    handleIncrement,
    handleDecrement,
    handleRemove,
    handleClearCart,
    handleCheckout,
    isCheckoutLoading,
  } = useCart();

  return (
    <Container>
      <Title>Cart</Title>
      <Wrapper>
        <Sections>
          <Topsection>
            <TopButton to="/store">← Back to Store</TopButton>
          </Topsection>

          <Bottomsection>
            {cart.cartQuantity ? (
              <>
                <Info>
                  {cart.products.map((item) => (
                    <CartItem key={item.productId}>
                      <CartItemThumbnail src={item.image} alt={item.name} />
                      <CartItemName>{item.name}</CartItemName>
                      <CartItemDetails>
                        <i>{item.size} whole beans</i>
                      </CartItemDetails>
                      <ItemPrice>
                        ¥{(item.price * item.quantity).toLocaleString()}
                      </ItemPrice>
                      <QuantityContainer>
                        <HiMinus
                          onClick={() => handleDecrement(item)}
                          cursor="pointer"
                        />
                        <ItemQuantity>{item.quantity}</ItemQuantity>
                        <HiPlus
                          onClick={() => handleIncrement(item)}
                          cursor="pointer"
                        />
                      </QuantityContainer>
                      <TiDelete
                        onClick={() => handleRemove(item)}
                        size={40}
                        cursor="pointer"
                      />
                    </CartItem>
                  ))}
                </Info>
                <Hr />
                <ClearButton onClick={handleClearCart}>Clear Cart</ClearButton>
              </>
            ) : (
              <Empty>Your cart is empty. Start shopping!</Empty>
            )}
          </Bottomsection>
        </Sections>

        <Summary>
          <SummaryTitle>Order Summary</SummaryTitle>
          <SummaryItem>
            <SummaryText>Subtotal ({cart.cartQuantity})</SummaryText>
            <SummaryPrice>¥{cart.cartTotal.toLocaleString()}</SummaryPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryText>Shipping</SummaryText>
            <SummaryPrice>¥{cartShipping.toLocaleString()}</SummaryPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryText>Discount</SummaryText>
            <SummaryPrice>¥{cartDiscount.toLocaleString()}</SummaryPrice>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryText>Estimated Total</SummaryText>
            <SummaryPrice>¥{summaryTotal.toLocaleString()}</SummaryPrice>
          </SummaryItem>

          <ErrorMessage>{checkoutError}</ErrorMessage>
          {checkoutError && !user && (
            <ErrorContainer>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </ErrorContainer>
          )}

          <CheckoutButton onClick={handleCheckout} disabled={isCheckoutLoading}>
            {isCheckoutLoading ? "Redirecting..." : "Checkout Now"}
          </CheckoutButton>
        </Summary>
      </Wrapper>
    </Container>
  );
};

export default ShoppingCart;
