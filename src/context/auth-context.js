import { createContext, useReducer, useContext } from "react";
import { authReducer } from "./auth-reducer";

const initialAuthState = {
  userName: localStorage.getItem("userName"),
  token: localStorage.getItem("token"),
};

const AuthContext = createContext(initialAuthState);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
