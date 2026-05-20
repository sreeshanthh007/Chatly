import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const PublicRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  if (isLoggedIn) {
    // If user is already logged in, redirect them away from auth pages (like login/register)
    return <Navigate to="/chat" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
