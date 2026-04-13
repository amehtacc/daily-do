import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function RestrictedRoute() {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

export default RestrictedRoute;
