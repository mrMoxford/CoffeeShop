import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// 🔧 Imported PayloadAction
// 📌 Used to type Redux action payloads

import { User } from "../types/user.type";
// 🔧 Import your existing User type
// 📌 Keeps Redux aligned with backend user model

// Redux user state type
interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
// 🔧 Created UserState interface
// 📌 Explicitly defines the structure of Redux user state

const initialState: UserState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  // 🔧 Added null check and type assertion
  // 📌 localStorage.getItem returns string | null

  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      // 🔧 Typed payload as User
      // 📌 Ensures only valid User objects can be stored in Redux

      state.user = action.payload;
    },

    logout: (state) => {
      // 🔧 No payload needed

      state.user = null;

      localStorage.removeItem("user");
      // 📌 Clear persisted user session
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
