import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  if (!isLoggedIn) {

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
