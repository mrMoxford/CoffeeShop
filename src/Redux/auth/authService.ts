//src/Redux/auth/authService.ts
import { publicRequest } from "../../reqMethods";
import { User } from "../../types/user.type";
// 🔧 Import User type
// 📌 Ensures returned user object matches backend schema

// Request payload types
interface AuthCredentials {
  email: string;
  password: string;
}
// 🔧 Define login credentials structure

interface SignupData {
  name: string;
  username: string;
  email: string;
  password: string;
}
// 🔧 Define signup payload structure

// Response type
interface AuthResponse {
  user: User;
  token: string;
}
// 🔧 Define response returned by backend auth endpoints

// Register user
const signup = async (userData: SignupData): Promise<AuthResponse> => {
  const res = await publicRequest.post<AuthResponse>("auth/signup", userData);

  return res.data;
};
// 🔧 Added payload type and response type
// 📌 Prevents incorrect signup payload structure

// Login user
const login = async (userData: AuthCredentials): Promise<AuthResponse> => {
  const res = await publicRequest.post<AuthResponse>("auth/login", userData);

  return res.data;
};
// 🔧 Typed login payload and response

// Logout
const logout = async (): Promise<void> => {
  await publicRequest.post("auth/logout");
};
// 🔧 Explicit void return

const authService = {
  signup,
  login,
  logout,
};

export default authService;
