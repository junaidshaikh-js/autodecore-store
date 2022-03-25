import ReactLoading from "react-loading";

export function InlineLoader() {
  const centerLoader = {
    display: "inline-block",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "0.5rem",
  };
  return (
    <div style={centerLoader}>
      <ReactLoading
        type={"spin"}
        color={"#fff"}
        height={"20px"}
        width={"20px"}
      />
    </div>
  );
}
