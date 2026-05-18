import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import authRoutes from "./routes/authRoute";
import chatRoutes from "./routes/chatRoute";
import NotFoundPage from "./pages/NotFoundPage";

export function AppConfig() {
  return (
    <BrowserRouter>
      <Routes>
        {authRoutes}
        {chatRoutes}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AppConfig />
  );
}

export default App;
