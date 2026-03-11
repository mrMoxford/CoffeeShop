// src/Redux/auth/authSlice.tsx

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { User } from "../../types/user.type";

// Auth state type
interface AuthState {
  user: User | null;
  token: string | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
// 🔧 Define Redux auth state structure

// Get stored credentials
const storedCredentials =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("auth") as string)
    : null;

const initialState: AuthState = {
  user: storedCredentials?.user ?? null,
  token: storedCredentials?.token ?? null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData: any, thunkAPI) => {
    try {
      return await authService.signup(userData);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (userData: any, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});
// 🔧 Fixed bug: removed thunkAPI usage
// 📌 thunkAPI was not defined in your original code

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // SIGNUP
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(signup.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })

      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        // 🔧 Cast payload type
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: action.payload.user,
            token: action.payload.token,
          }),
        );
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload as string;
        state.user = null;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;

        localStorage.removeItem("auth");
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
