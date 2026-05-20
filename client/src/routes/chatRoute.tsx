import { Route } from "react-router-dom";
import DashboardPage from "../pages/chat/DashboardPage";
import ProtectedRoute from "./protectedRoute";

export const chatRoutes = (
  <Route element={<ProtectedRoute />}>
    <Route path="/chat" element={<DashboardPage />} />
  </Route>
);

export default chatRoutes;

