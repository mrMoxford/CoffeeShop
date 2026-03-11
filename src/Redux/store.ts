import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./CartSlice";
import authReducer from "./auth/authSlice";
// 🔧 Same reducers as before
// 📌 No change needed here

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});
// 🔧 Exported store as a named export
// 📌 This allows us to infer RootState and AppDispatch types from it

// Root state type
export type RootState = ReturnType<typeof store.getState>;
// 🔧 Automatically infers the full Redux state shape
// 📌 Example resulting type:
// {
//   cart: CartState
//   auth: AuthState
// }

// Dispatch type
export type AppDispatch = typeof store.dispatch;
// 🔧 Typed dispatch function
// 📌 Enables proper typing for dispatching actions

export default store;
