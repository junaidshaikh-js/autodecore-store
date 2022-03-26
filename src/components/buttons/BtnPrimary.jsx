import "./button.css";

export function BtnPrimary({ children, cnames, onClick }) {
  return (
    <button className={"btn btn-primary " + cnames} onClick={onClick}>
      {children}
    </button>
  );
}
