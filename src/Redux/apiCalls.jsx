import { publicRequest } from "../reqMethods";
import { login, signup, logout } from "./authSlice"; // asyncThunk actions

export const loginUser = (user) => async (dispatch) => {
  try {
    await dispatch(login(user)).unwrap();
  } catch (err) {
    console.error("Login failed:", err);
  }
};

export const signupUser = (user) => async (dispatch) => {
  try {
    await dispatch(signup(user)).unwrap();
  } catch (err) {
    console.error("Signup failed:", err);
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};
