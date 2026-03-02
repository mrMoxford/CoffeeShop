import { publicRequest } from "../../reqMethods";

// Register user
const signup = async (userData) => {
  const res = await publicRequest.post("auth/signup", userData);

  return res.data;
};

// Login user
const login = async (userData) => {
  const res = await publicRequest.post("auth/login", userData);
  console.log(res.data);
  return res.data;
};

// Logout
const logout = async () => {
  await publicRequest.post("auth/logout");
};

// Default export object (matches import authService)
const authService = {
  signup,
  login,
  logout,
};

export default authService;
