import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: localStorage.getItem("products")
      ? JSON.parse(localStorage.getItem("products"))
      : [],
    cartQuantity: 0,
    cartTotal: 0,
    shipping: 2000,
    discount: 2000,
  },
  reducers: {
    addToCart: (state, action) => {
      const productInCart = state.products.find(
        (product) => product._id === action.payload._id,
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
          progress: undefined,
          theme: "colored",
        });
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
        toast.success(`${action.payload.name} added to cart`, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      localStorage.setItem("products", JSON.stringify(state.products));
    },

    incrementQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id,
      );
      if (item) {
        item.quantity += 1;
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id,
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.products.filter(
        (item) => item._id !== action.payload._id,
      );
      state.products = removeItem;
      toast.warning(`${action.payload.name} removed from cart`, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    clearCart: (state, action) => {
      state.products = [];
      toast.warning("Cart has been cleared", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    getTotals: (state, action) => {
      let { totalQuantity, totalPrice } = state.products.reduce(
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
