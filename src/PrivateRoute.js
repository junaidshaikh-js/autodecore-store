import { Navigate } from "react-router-dom";
import { useAuth } from "./context";

export function PrivateRoute({ children }) {
  const {
    state: { token },
  } = useAuth();

  return token ? children : <Navigate to="/login" replace />;
}
