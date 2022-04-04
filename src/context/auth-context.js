import { createContext, useReducer, useContext } from "react";
import { authReducer } from "./auth-reducer";

const initialAuthState = {
  userName: localStorage.getItem("userName"),
  token: localStorage.getItem("token"),
};

const AuthContext = createContext(initialAuthState);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const handleLogout = (dataDispatch) => {
    localStorage.clear();
    dispatch({ type: "LOG_OUT", payload: { userName: null, token: null } });
    dataDispatch({
      type: "LOG_OUT",
    });
  };

  const value = { state, dispatch, handleLogout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
