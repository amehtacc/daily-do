import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { handleSignin } = useAuth();

  async function handleLogin() {
    if (!email.trim()) {
      return toast.error("Email is required!");
    }
    if (!password.trim()) {
      return toast.error("Password is required!");
    }

    try {
      setLoading(true);
      const res = await handleSignin(email, password);

      if (res.success) {
        toast.success(res.message);
        navigate("/dashboard");
        return;
      }
    } catch (error) {
      toast.error(error.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-full flex items-center justify-center p-5">
      <div className="max-w-[600px] shadow-2xl rounded-xl">
        <div className="w-full p-5 lg:p-10 flex items-center flex-col gap-10">
          <h2 className="font-bold text-4xl text-[#0c2541]">
            Login to Daily Do
          </h2>

          <div className="w-full flex flex-col gap-4">
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="w-full flex flex-col items-center gap-4">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              Login
            </Button>
            <p className="font-medium text-gray-700">
              Don't have an account?{" "}
              <NavLink
                to="/signup"
                className="underline text-[#017ffd] hover:text-[#046ed8] cursor-pointer transition-colors duration-200 ease-in-out"
              >
                Signup
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
