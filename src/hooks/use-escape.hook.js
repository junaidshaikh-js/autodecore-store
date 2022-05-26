import { useEffect } from "react/";

export const useEscape = (setModal) => {
  const closeOnEscape = (e) => {
    if (e.keyCode === 27) {
      setModal((s) => s && false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscape);
    };
  }, []);
};
