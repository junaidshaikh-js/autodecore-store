import "./button.css";

export function BtnIcon({ children, cnames, onClick, disabled }) {
  return (
    <button
      type="button"
      className={cnames}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
