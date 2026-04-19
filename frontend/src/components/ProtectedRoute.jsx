import { useAuth } from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function ProtectedRoute() {
  const { isAuthenticated, isInitialLoading } = useAuth();

  if (isInitialLoading) return <div className="w-full h-[calc(100vh-5rem)] flex items-center justify-center"><LoadingSpinner /></div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
