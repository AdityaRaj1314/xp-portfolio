import React from "react";

const Paint = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <iframe
        src="https://jspaint.app"
        title="paint"
        style={{
          border: "none",
          display: "block",
          width: "100%",
          height: "100%",
          backgroundColor: "rgb(192,192,192)",
        }}
      />
    </div>
  );
};

export default Paint;
