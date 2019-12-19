import React from "react";
import "../App.css";

export default function ProgressBar({ actualStep }) {
  const progress = Math.round((actualStep / 8) * 100);
  const hrWidth = 600;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      <hr
        style={{
          width: hrWidth,
          height: 4,
          backgroundColor: "var(--grey3)",
          position: "relative"
        }}
      />
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: "var(--orange3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          marginLeft: (progress * hrWidth) / 100
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            backgroundColor: "var(--orange2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <p style={{ color: "white", fontSize: 14 }}>{progress}%</p>
        </div>
      </div>
    </div>
  );
}
