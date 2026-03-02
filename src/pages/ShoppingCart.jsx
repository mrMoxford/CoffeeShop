import React, { useEffect } from "react";
import styled from "styled-components";
import { HiMinus, HiPlus } from "react-icons/hi";
import { TiDelete } from "react-icons/ti";
import { tabletDevice, smallDevice, mediumDevice } from "../Responsive";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../reqMethods";
import { Link } from "react-router-dom";

import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
  getTotals,
} from "../Redux/CartSlice";
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
  background: hsla(0, 0%, 85%, 0.5);

  ${smallDevice({ padding: "1rem", fontSize: "1rem" })};
`;
const Title = styled.h1`
  margin-bottom: 4rem;
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-weight: 200;
  text-transform: uppercase;
  ${smallDevice({ marginBottom: "1rem" })};
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mediumDevice({ flexDirection: "column" })};
`;
const Sections = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 4rem;
  ${tabletDevice({ margin: "0" })};
  ${smallDevice({ alignItems: "center" })};
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
  grid-template-areas: "image name  size price quantity delete";
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
//gridTemplateAreas: "image size quantity", "name . price delete"},
const CartItemThumbnail = styled.img`
  width: 5rem;
  aspect-ratio: 1;
  gride-area: image;
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
const ItemQuatity = styled.p`
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
  border: 2px solid hsla(0, 0%, 0%, 0.21);
  background-color: black;
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
  background: hsla(104, 28%, 15%, 1);
  color: white;
  gap: 2rem;
  padding: 1rem;
  ${mediumDevice({ width: "100%" })};
`;

const SummurayTitle = styled.h2`
  font-size: 2rem;
  font-weight: 300;
  align-self: flex-start;
`;
const SummurayItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "1.3rem"};
  margin-bottom: ${(props) => props.type === "total" && "2rem"};
`;
const SummurayText = styled.span``;
const SummurayPrice = styled.span``;
const CheckoutButton = styled.button`
  padding: 1rem;
  outline: transparent;
  cursor: pointer;
  width: 100%;
  color: white;
  border: 2px solid white;
  background: transparent;
  &:hover {
    background-color: hsla(360, 65%, 20%, 1);
  }
  ${mediumDevice({ width: "50%" })};
  ${tabletDevice({ width: "100%" })};
`;
const CartTitleContainer = styled.div`
  display: grid;
  grid-template-areas: "imageTitle nameTitle nameTitle sizeTitle priceTitle quantityTitle deleteTitle ";
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  place-items: start;
  place-content: start;
  ${tabletDevice({ display: "none" })};
`;
const CartTitle = styled.h3`
  text-transform: uppercase;
  font-weight: 300;
`;
const Delete = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: delete;
`;
const Empty = styled.p``;
const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleIncrement = (item) => {
    dispatch(incrementQuantity(item));
  };
  const handleDecrement = (item) => {
    dispatch(decrementQuantity(item));
  };
  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleCheckout = async (products) => {
    try {
      const orderRes = await userRequest.post("/orders", {
        products: products.map((item) => ({
          productId: item._id,
          quantity: item.quantity || 1,
        })),
      });

      const order = orderRes.data?.data;
      if (!order?._id) throw new Error("Order creation failed");

      const sessionRes = await userRequest.post(
        `/orders/${order._id}/checkout`,
      );

      if (sessionRes.data?.url) {
        window.location.href = sessionRes.data.url;
      }
      dispatch(clearCart());
    } catch (err) {
      console.error(err);
    }
  };

  const cartShipping = cart.cartQuantity === 0 ? 0 : cart.shipping;
  const cartDiscount = cart.cartTotal < 10000 ? 0 : cart.discount;
  const summaryTotal = cart.cartTotal + cartShipping - cartDiscount;

  return (
    <Container>
      <Title>review your items</Title>
      <Wrapper>
        <Sections>
          <Topsection>
            <TopButton to="/store" id="back-to-store">
              {" "}
              ← Back to Store{" "}
            </TopButton>
          </Topsection>

          <Bottomsection>
            {cart.cartQuantity ? (
              <>
                {" "}
                <CartTitleContainer>
                  <CartTitle>Image</CartTitle>
                  <CartTitle>Name</CartTitle>
                  <CartTitle>Size</CartTitle>
                  <CartTitle>Price</CartTitle>
                  <CartTitle>Product Quantity</CartTitle>
                </CartTitleContainer>
                <Hr />
                <Info>
                  {cart.products.map((item) => (
                    <CartItem key={item._id}>
                      <CartItemThumbnail
                        src={item.image}
                        alt={item.name}
                      ></CartItemThumbnail>
                      <CartItemName>{item.name}</CartItemName>
                      <CartItemDetails>
                        <i> 100g whole beans</i>
                      </CartItemDetails>

                      <ItemPrice>
                        {" "}
                        {` ¥${(
                          item.price * item.quantity
                        ).toLocaleString()}`}{" "}
                      </ItemPrice>
                      <QuantityContainer>
                        <HiMinus
                          onClick={() => handleDecrement(item)}
                          cursor="pointer"
                          id="decrecrement"
                        />
                        <ItemQuatity>{item.quantity}</ItemQuatity>
                        <HiPlus
                          onClick={() => handleIncrement(item)}
                          cursor="pointer"
                          id="increcrement"
                        />
                      </QuantityContainer>
                      <Delete>
                        <TiDelete
                          onClick={() => handleRemove(item)}
                          size={40}
                          cursor="pointer"
                          id="delete-item"
                        />
                      </Delete>
                    </CartItem>
                  ))}
                </Info>{" "}
                <Hr />
              </>
            ) : (
              <Empty> Your cart is empty please start shopping </Empty>
            )}
          </Bottomsection>
          <ClearButton id="clear-cart" onClick={handleClearCart}>
            Clear Cart
          </ClearButton>
        </Sections>
        <Summary>
          <SummurayTitle>Order Summary</SummurayTitle>
          <SummurayItem>
            <SummurayText>Subtotal ({cart.cartQuantity})</SummurayText>
            <SummurayPrice>{`¥${cart.cartTotal.toLocaleString()}`}</SummurayPrice>
          </SummurayItem>
          <SummurayItem>
            <SummurayText>Shipping</SummurayText>
            <SummurayPrice>{`¥${cartShipping.toLocaleString()}`}</SummurayPrice>
          </SummurayItem>
          <SummurayItem>
            <SummurayText>Discount</SummurayText>
            <SummurayPrice>{`¥${cartDiscount.toLocaleString()}`}</SummurayPrice>
          </SummurayItem>
          <SummurayItem type="total">
            <SummurayText>Estimated Total</SummurayText>
            <SummurayPrice>{` ¥${summaryTotal.toLocaleString()}`}</SummurayPrice>
          </SummurayItem>

          <CheckoutButton
            id="checkout"
            onClick={() => handleCheckout(cart.products)}
          >
            Checkout Now
          </CheckoutButton>
        </Summary>
      </Wrapper>
    </Container>
  );
};

export default ShoppingCart;
