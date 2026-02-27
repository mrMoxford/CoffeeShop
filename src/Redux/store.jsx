import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./CartSlice";
import authReducer from "./auth/authSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});
