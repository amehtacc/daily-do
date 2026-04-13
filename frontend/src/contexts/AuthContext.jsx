import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { signup, signin, logout, checkMe } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

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
      throw error.response;
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
      setIsAuthenticated(true);

      return {
        user: res.data.user,
        success: res.data.success,
        message: res.data.message,
      };
    } catch (error) {
      throw error.response;
    }
  }

  async function handleLogout() {
    try {
      const res = await logout();

      return {
        success: res.data?.success,
        message: res.data?.message || "Logged out successfully",
      };
    } catch (error) {
      throw error.response;
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  }

  useEffect(() => {
    async function handleCheckMe() {
      try {
        const res = await checkMe();

        if (res.data.success) {
          setUser(res.data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
        console.error(
          "Auth check failed:",
          error.response?.data || error.message,
        );
      } finally {
        setIsInitialLoading(false);
      }
    }

    handleCheckMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isInitialLoading,
        handleSignup,
        handleSignin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
