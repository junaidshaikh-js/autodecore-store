import "./button.css";

export function BtnSecondary({ children, cnames, onClick }) {
  return (
    <button className={`btn btn-secondary ${cnames}`} onClick={onClick}>
      {children}
    </button>
  );
}
