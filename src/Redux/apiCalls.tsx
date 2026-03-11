import { publicRequest } from "../reqMethods";
import { User } from "../types/user.type";
import { login, signup, logout } from "./auth/authSlice"; // asyncThunk actions
import { AppDispatch } from "../Redux/store";

export const loginUser = (user: User) => async (dispatch: AppDispatch) => {
  try {
    await dispatch(login(user)).unwrap();
  } catch (err) {
    console.error("Login failed:", err);
  }
};

export const signupUser = (user: User) => async (dispatch: AppDispatch) => {
  try {
    await dispatch(signup(user)).unwrap();
  } catch (err) {
    console.error("Signup failed:", err);
  }
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(logout());
};
