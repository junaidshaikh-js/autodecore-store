import "./button.css";

export function BtnPrimary({ children, cnames, onClick, disabled }) {
  return (
    <button
      className={"btn btn-primary " + cnames}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
