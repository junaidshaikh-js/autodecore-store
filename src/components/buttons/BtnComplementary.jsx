import "./button.css";

export function BtnComplementary({
  children,
  onClick,
  cnames,
  type = "button",
  disabled,
}) {
  return (
    <button
      className={"btn btn-complementary " + cnames}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
