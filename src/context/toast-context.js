import { createContext, useContext, useState } from "react";

const initialValue = {
  type: "",
  message: "",
};

const ToastContext = createContext(initialValue);

const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(initialValue);

  const value = { toastMessage, setToastMessage };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export { ToastProvider, useToast };
