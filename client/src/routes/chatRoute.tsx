import { Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";

export const chatRoutes = (
  <Route path="/chat" element={<DashboardPage />} />
);

export default chatRoutes;
