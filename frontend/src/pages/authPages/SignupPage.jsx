import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { handleSignup } = useAuth();

  async function handleRegister() {
    if (!fullName.trim()) {
      return toast.error("Name is required!");
    }
    if (!email.trim()) {
      return toast.error("Email is required!");
    }
    if (!password.trim()) {
      return toast.error("Password is required!");
    }

    try {
      setLoading(true);

      const res = await handleSignup(fullName, email, password);

      if (res.success) {
        toast.success(res.message);
        navigate("/login");
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
            Signup to Daily Do
          </h2>

          <div className="w-full flex flex-col gap-4">
            <Input
              label="Full Name"
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
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
              onClick={handleRegister}
              disabled={loading}
            >
              Signup
            </Button>
            <p className="font-medium text-gray-700">
              Have an account?{" "}
              <NavLink
                to="/login"
                className="underline text-[#017ffd] hover:text-[#046ed8] cursor-pointer transition-colors duration-200 ease-in-out"
              >
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
