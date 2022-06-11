import { createContext, useReducer, useContext } from "react";
import { authReducer } from "./reducers/auth-reducer";

const initialAuthState = {
  userName: localStorage.getItem("userName"),
  token: localStorage.getItem("token"),
  addresses: JSON.parse(localStorage.getItem("data"))?.addresses,
};

const AuthContext = createContext(initialAuthState);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const handleLogout = (dataDispatch, setToastMessage, navigate) => {
    localStorage.clear();
    dispatch({ type: "LOG_OUT", payload: { userName: null, token: null } });
    dataDispatch({
      type: "LOG_OUT",
    });

    setToastMessage({ type: "success", message: "Logout Successful" });

    navigate("/");
  };

  const value = { state, dispatch, handleLogout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
