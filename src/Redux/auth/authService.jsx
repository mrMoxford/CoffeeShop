import { publicRequest } from "../../reqMethods";

// Register user
const signup = async (userData) => {
  const res = await publicRequest.post("auth/signup", userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

// Login user
const login = async (userData) => {
  const res = await publicRequest.post("auth/login", userData);

  if (res.data?.token) {
    localStorage.setItem("user", JSON.stringify({ token: res.data.token }));
  }

  return res.data;
};

// Logout
const logout = () => {
  localStorage.removeItem("user");
};

// Default export object (matches import authService)
const authService = {
  signup,
  login,
  logout,
};

export default authService;
