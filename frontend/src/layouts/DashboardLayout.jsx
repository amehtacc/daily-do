import React from "react";
import DashboardHeader from "../components/dashboard/Header.jsx";
import Sidebar from "../components/dashboard/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import { TodoProvider } from "../contexts/TodoContext.jsx";

function DashboardLayout() {
  return (
    <TodoProvider>
      <div className="w-full flex flex-col items-center justify-center">
        <DashboardHeader />
        <div className="relative w-full flex items-start justify-center">
          <div className="w-[20%]">
            <Sidebar />
          </div>
          <main className="w-[80%] flex items-start justify-start px-4 py-2">
            <Outlet />
          </main>
        </div>
      </div>
    </TodoProvider>
  );
}

export default DashboardLayout;
