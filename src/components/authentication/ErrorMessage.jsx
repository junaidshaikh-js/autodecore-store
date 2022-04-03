import { FaInfoCircle } from "react-icons/fa";

export function ErrorMessage({ text }) {
  return (
    <span className="error flex align-center my-sm">
      <FaInfoCircle className="mr-1" />
      {text}
    </span>
  );
}
