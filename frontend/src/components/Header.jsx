import React, { useState } from "react";
import Button from "./Button";
import Logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      <header className="relative w-full h-20 flex bg-white items-center justify-between px-6 md:px-10 lg:px-20 py-5 z-50 lg:z-0">
        <NavLink to="/">
          <img className="w-40 lg:w-52" src={Logo} alt="logo" />
        </NavLink>
        <div className="hidden lg:flex items-center justify-center gap-5">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </div>

        <div
          className="flex lg:hidden cursor-pointer"
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          {openMenu ? (
            <X className="text-blue-500 w-8 h-8" />
          ) : (
            <Menu className="text-blue-500 w-8 h-8" />
          )}
        </div>
      </header>
      <div
        className={`absolute left-0 w-full flex flex-col lg:hidden justify-start h-[calc(100vh-5rem)] bg-white 
          gap-5 transition-all duration-300 ease-in-out p-8 z-10
          ${openMenu ? "top-20 translate-y-0 opacity-100" : "top-20 -translate-y-full opacity-0 pointer-events-none"}
          `}
      >
        <Button variant="outline" size="md" onClick={() => navigate("/login")}>
          Login
        </Button>

        <Button variant="primary" size="md" onClick={() => navigate("/signup")}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default Header;
