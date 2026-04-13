import React from "react";
import { LayoutDashboard, ListTodo, Settings2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const { user } = useAuth();
  return (
    <aside className="w-full h-[calc(100vh-5rem)] flex flex-col items-start justify-between bg-[#ededf3]">
      <div className="w-full flex flex-col items-start mt-5">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `w-full flex items-center justify-start gap-2 group cursor-pointer p-5 ${isActive ? "bg-[#017ffd]/10" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              <LayoutDashboard
                className={`w-6 h-6 transition-all duration-200 ease-in-out ${isActive ? "text-[#017ffd]/80" : "text-gray-600 group-hover:text-[#017ffd]/80"}`}
              />
              <div
                className={`font-medium transition-all duration-200 ease-in-out ${isActive ? "text-[#017ffd]/80" : "text-gray-600 group-hover:text-[#017ffd]/80"}`}
              >
                Dashboard
              </div>
            </>
          )}
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `w-full flex items-center justify-start gap-2 group cursor-pointer p-5 ${isActive ? "bg-[#017ffd]/10" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              <ListTodo
                className={`w-6 h-6 transition-all duration-200 ease-in-out ${isActive ? "text-[#017ffd]/80" : "text-gray-600 group-hover:text-[#017ffd]/80"}`}
              />
              <div
                className={`font-medium transition-all duration-200 ease-in-out ${isActive ? "text-[#017ffd]/80" : "text-gray-600 group-hover:text-[#017ffd]/80"}`}
              >
                Tasks
              </div>
            </>
          )}
        </NavLink>
      </div>
      <div className="w-full p-5">
        <div className="w-full bg-[#017ffd]/10 rounded-md p-3">
          <h3 className="font-semibold text-lg text-[#017ffd]">{user?.name}</h3>
          <p className="text-sm text-gray-700">{user?.email}</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
