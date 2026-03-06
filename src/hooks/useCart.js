import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../reqMethods";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
  addToCart,
  getTotals,
} from "../Redux/CartSlice";

export const useCart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);

  const [checkoutError, setCheckoutError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  const addItem = (product) => {
    dispatch(addToCart(product));
  };
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
    if (!user?.user) {
      setCheckoutError("Please login or signup before checking out.");
      return;
    }

    try {
      const orderRes = await userRequest.post("/orders", {
        products: products.map((item) => ({
          productId: item._id,
          quantity: item.quantity || 1,
        })),
      });

      const order = orderRes.data?.data;

      if (!order?._id) {
        throw new Error("Order creation failed");
      }

      const sessionRes = await userRequest.post(
        `/orders/${order._id}/checkout`,
      );

      if (sessionRes.data?.url) {
        window.location.href = sessionRes.data.url;
      }

      dispatch(clearCart());
    } catch (err) {
      console.error(err);
      setCheckoutError("Checkout failed. Please try again.");
    }
  };

  const cartShipping = cart.cartQuantity === 0 ? 0 : cart.shipping;
  const cartDiscount = cart.cartTotal < 10000 ? 0 : cart.discount;
  const summaryTotal = cart.cartTotal + cartShipping - cartDiscount;

  return {
    cart,
    user,
    addItem,
    checkoutError,
    summaryTotal,
    cartShipping,
    cartDiscount,
    handleIncrement,
    handleDecrement,
    handleRemove,
    handleClearCart,
    handleCheckout,
  };
};
