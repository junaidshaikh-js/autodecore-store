import "./button.css";

export function BtnComplementary({
  children,
  onClick,
  cnames,
  type = "button",
}) {
  return (
    <button
      className={"btn btn-complementary " + cnames}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
