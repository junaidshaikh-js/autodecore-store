import { DataProvider, useData } from "./data-context";
import { AuthProvider, useAuth } from "./auth-context";
import { ToastProvider, useToast } from "./toast-context";

const Provider = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <DataProvider>{children}</DataProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export { Provider, useData, useAuth, useToast };
