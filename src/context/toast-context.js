import { createContext, useContext, useState, useEffect } from "react";

const initialValue = {
  type: "",
  message: "",
};

const ToastContext = createContext(initialValue);

const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(initialValue);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    clearTimeout(timerId);

    let id = setTimeout(() => {
      setToastMessage({
        type: "",
        message: "",
      });
    }, 3000);

    setTimerId(id);
  }, [toastMessage]);

  const value = { toastMessage, setToastMessage };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export { ToastProvider, useToast };
