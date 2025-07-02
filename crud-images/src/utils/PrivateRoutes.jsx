import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

function PrivateRoutes() {
  const user = getCurrentUser();

  return user?.id === "admin" ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
