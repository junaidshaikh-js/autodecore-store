import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import "./toast.css";

export const Toast = ({ type, message }) => {
  const location = useLocation();
  const path = location.pathname;

  if (message) {
    return (
      <div className="toast-container flex flex-center">
        <div
          className={`toast toast-${type} txt-bold  flex flex-center`}
          style={
            location.pathname == "/products" && window.innerWidth < 769
              ? {
                  bottom: "80px",
                }
              : {}
          }
        >
          {type == "success" ? <FaCheckCircle /> : <FaInfoCircle />}
          <span className="ml-1">{message}</span>
        </div>
      </div>
    );
  }

  return null;
};
