import { useContext, useState } from "react";
import { createContext } from "react";
import { signup, signin, logout, checkMe } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function handleSignup(name, email, password) {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return { success: false, message: "All fields are required!" };
    }

    const data = { name, email, password };

    try {
      const res = await signup(data);

      return {
        success: res.data.success,
        message: res.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      };
    }
  }

  async function handleSignin(email, password) {
    if (!email.trim() || !password.trim()) {
      return { success: false, message: "All fields are required!" };
    }

    const data = { email, password };

    try {
      const res = await signin(data);

      setUser(res.data.user);

      return {
        user: res.data.user,
        success: res.data.success,
        message: res.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      };
    }
  }

  async function handleLogout() {
    try {
      const res = await logout();

      setUser(null);

      return {
        success: res.data.success,
        message: res.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      };
    }
  }

  async function handleCheckMe() {
    try {
      const res = await checkMe();

      setUser(res.data.user);

      return {
        user: res.data.user,
        success: res.data.success,
        message: res.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      };
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, handleSignup, handleSignin, handleLogout, handleCheckMe }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
