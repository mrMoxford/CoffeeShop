// src/hooks/useCart.ts
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
  addToCart,
  getTotals,
  CartState,
  CartItem,
} from "../Redux/CartSlice";
import { RootState, AppDispatch } from "../Redux/store";
import { CartProduct } from "../types/cart.type";
import { Product } from "../types/product.type";
import { User } from "../types/user.type";
import { useMutation } from "@tanstack/react-query";
import { checkout as checkoutService } from "../services/cartService";

export const useCart = () => {
  // ✅ Redux state
  const cart = useSelector((state: RootState) => state.cart) as CartState;
  const user = useSelector(
    (state: RootState) => state.auth.user,
  ) as User | null;
  const dispatch = useDispatch<AppDispatch>();

  const [checkoutError, setCheckoutError] = useState<string>("");

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  // --- Redux actions ---
  const addItem = (product: Product) => dispatch(addToCart(product));
  const handleIncrement = (item: CartItem) => dispatch(incrementQuantity(item));
  const handleDecrement = (item: CartItem) => dispatch(decrementQuantity(item));
  const handleRemove = (item: CartItem) => dispatch(removeItem(item));
  const handleClearCart = () => dispatch(clearCart());

  // --- React Query checkout mutation ---
  const checkoutMutation = useMutation({
    mutationFn: (products: CartProduct[]) => {
      if (!user) throw new Error("Please login or signup before checking out.");
      return checkoutService(products);
    },
    onSuccess: (url: string) => {
      dispatch(clearCart());
      window.location.href = url;
    },
    onError: (error: any) => {
      console.error(error);
      setCheckoutError(error.message || "Checkout failed. Please try again.");
    },
  });

  // --- Checkout handler ---
  const handleCheckout = () => {
    if (!cart.products.length) {
      setCheckoutError("Your cart is empty.");
      return;
    }

    // Map Redux CartItem[] -> backend CartProduct[]
    const productsToSend: CartProduct[] = cart.products.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    checkoutMutation.mutate(productsToSend);
  };

  // --- Cart summary calculations ---
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
    isCheckoutLoading: checkoutMutation.isPending,
  };
};
