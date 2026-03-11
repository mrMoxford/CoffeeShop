import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CartProduct } from "../types/cart.type";
import { Product } from "../types/product.type";
// 🔧 Import your existing Product type
// 📌 Ensures Redux stays consistent with backend/frontend models
// Cart item in Redux: full product + quantity
export interface CartItem {
  productId: string; // matches CartProduct
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  roastLevel?: string;
  flavourProfile?: string;
}
export interface CartState {
  products: CartItem[];
  cartQuantity: number;
  cartTotal: number;
  shipping: number;
  discount: number;
}
// 🔧 Define Redux state shape

const initialState: CartState = {
  products: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products") as string)
    : [],
  // 🔧 Type assertion for localStorage
  // 📌 getItem returns string | null

  cartQuantity: 0,
  cartTotal: 0,
  shipping: 2000,
  discount: 2000,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const productInCart = state.products.find(
        (product) => product.productId === action.payload._id,
      );

      if (productInCart) {
        productInCart.quantity += 1;

        toast.info(`${action.payload.name} quantity increased`, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else {
        state.products.push({
          productId: action.payload._id, // map _id -> productId
          name: action.payload.name,
          price: action.payload.price,
          image: action.payload.image,
          size: action.payload.size,
          quantity: 1,
        });

        toast.success(`${action.payload.name} added to cart`, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }

      state.cartQuantity += 1;

      localStorage.setItem("products", JSON.stringify(state.products));
    },

    incrementQuantity: (state, action: PayloadAction<CartItem>) => {
      const item = state.products.find(
        (item) => item.productId === action.payload.productId,
      );

      if (item) {
        item.quantity += 1;
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },

    decrementQuantity: (state, action: PayloadAction<CartItem>) => {
      const item = state.products.find(
        (item) => item.productId === action.payload.productId,
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },

    removeItem: (state, action: PayloadAction<CartItem>) => {
      const filteredItems = state.products.filter(
        (item) => item.productId !== action.payload.productId,
      );

      state.products = filteredItems;

      toast.warning(`${action.payload.name} removed from cart`, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      localStorage.setItem("products", JSON.stringify(state.products));
    },

    clearCart: (state) => {
      // 🔧 Removed action parameter
      // 📌 Fixes TypeScript payload error

      state.products = [];

      toast.warning("Cart has been cleared", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      localStorage.setItem("products", JSON.stringify(state.products));
    },

    getTotals: (state) => {
      // 🔧 Removed action parameter

      const { totalQuantity, totalPrice } = state.products.reduce(
        (productsTotal, product) => {
          const { quantity, price } = product;

          const productTotal = quantity * price;

          productsTotal.totalPrice += productTotal;
          productsTotal.totalQuantity += quantity;

          return productsTotal;
        },
        {
          totalQuantity: 0,
          totalPrice: 0,
        },
      );

      state.cartQuantity = totalQuantity;
      state.cartTotal = totalPrice;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
  getTotals,
} = cartSlice.actions;
