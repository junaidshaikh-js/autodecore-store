import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import "./toast.css";

export const Toast = ({ type, message }) => {
  const location = useLocation();
  const [isToastShown, setIsToastShown] = useState(false);
  const path = location.pathname;

  useEffect(() => {
    setIsToastShown(true);

    let id = setTimeout(() => {
      setIsToastShown(false);
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [message]);

  return (
    <>
      {isToastShown && message ? (
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
      ) : null}
    </>
  );
};
