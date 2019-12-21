import React from "react";
import "../App.css";

export default function ProgressBar({ actualStep }) {
  const progress = Math.round((actualStep / 8) * 100);
  const barWidth = 400;
  const progressWidth = (progress * barWidth) / 100 - 25;
  return (
    <div
      style={{
        width: barWidth,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      <hr
        style={{
          width: progressWidth,
          height: 4,
          backgroundColor: "var(--orange3)",
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
          marginLeft: progressWidth
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
      <hr
        style={{
          width: barWidth - progressWidth,
          height: 4,
          backgroundColor: "var(--grey3)"
        }}
      />
    </div>
  );
}
