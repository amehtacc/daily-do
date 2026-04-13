import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PageLayout() {
  const { isInitialLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (isInitialLoading) {
    return null;
  }

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const isRedirecting = isAuthenticated && isAuthPage;

  return (
    <>
      {!isRedirecting && <Header />}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default PageLayout;
