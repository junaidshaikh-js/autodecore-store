import ReactLoading from "react-loading";

export function Loader() {
  const centerLoader = {
    display: "flex",
    height: "70vh",
    width: "95vw",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0",
  };
  return (
    <div style={centerLoader}>
      <ReactLoading
        type={"spinningBubbles"}
        color={"#2875f0"}
        height={"70px"}
        width={"70px"}
      />
    </div>
  );
}
