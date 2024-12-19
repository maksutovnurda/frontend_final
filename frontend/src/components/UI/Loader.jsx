import React from "react";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span className="loader"></span>
    </div>
  );
}

export default Loader;
