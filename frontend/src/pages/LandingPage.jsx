import React from "react";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
function LandingPage() {
  return (
    <main className="w-full">
      <section className="w-full h-full flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-10 lg:py-16">
        <div className="lg:w-[50%] lg:p-5 flex flex-col gap-10">
          <div className="w-full">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-[#0c2541] mb-6">
              Master Your Day with Daily Do
            </h1>
            <p className="text-lg font-semibold text-gray-700">
              Your intelligent companion for seamless task management, goal
              tracking, and productivity boosting
            </p>
          </div>

          <div className="w-fit">
            <NavLink to="/login">
              <Button variant="primary" size="lg" className="shadow-lg">
                Save Your Today
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="lg:w-[50%] lg:p-5">
          <img src="" alt="" />
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
