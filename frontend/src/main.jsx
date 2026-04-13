import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import PageLayout from "./layouts/PageLayout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/authPages/LoginPage.jsx";
import Signup from "./pages/authPages/SignupPage.jsx";
import Dashboard from "./pages/dashboardPages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RestrictedRoute from "./components/RestrictedRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Layout */}
      <Route element={<PageLayout />}>
        <Route index element={<LandingPage />} />
        <Route element={<RestrictedRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Route>

      {/* Dashboard Layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Route>,
  ),
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
