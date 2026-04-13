import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import Input from "../../components/Input.jsx";
import { LogOut, Menu } from "lucide-react";
import Button from "../../components/Button.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { toast } from "react-toastify";
function Header() {
  const [search, setSearch] = useState("");

  const { handleLogout } = useAuth();

  async function logout() {
    try {
      const res = await handleLogout();

      if (res.success) {
        return toast.success(res.message);
      }
    } catch (error) {
      console.error("Logout error", error);
    }
  }

  return (
    <header className="w-full h-20 bg-white shadow-lg px-10 py-4 flex items-center justify-between">
      <NavLink to="/dashboard">
        <img className="w-36 lg:w-40" src={Logo} alt="logo" />
      </NavLink>
      <div className="hidden lg:flex items-center justify-center gap-10">
        <Input
          id="search"
          name="search"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-gray-300! focus:border-[#017ffd]!"
        />
        <Button
          variant="outline"
          size="md"
          className="rounded-md"
          onClick={logout}
        >
          Logout <LogOut className="ml-2" />{" "}
        </Button>
      </div>
      <div className="flex lg:hidden">
        <Menu className="text-blue-500 w-8 h-8" />
      </div>
    </header>
  );
}

export default Header;
