import { useAuth } from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

function ProtectedRoute() {
  const { isAuthenticated, isInitialLoading } = useAuth();

  if (isInitialLoading) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
