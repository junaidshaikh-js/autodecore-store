import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context";

export function PrivateRoute({ children }) {
  const {
    state: { token },
  } = useAuth();
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ location }} replace />
  );
}
