import React from "react";
import "../App.css";

export default function ProgressBar({ actualStep }) {
  // totalStep represents the total number of steps
  const totalSteps = 8;

  // We calculate the progression (percentage)
  const progress = Math.round((actualStep / totalSteps) * 100);

  // We define the width of the progressbar
  const barWidth = 400;

  // We calculate the width of the orange <hr> that will be on the left (25 represents the size of the circle in which the percentage of progression appears)
  const progressWidth = (progress * barWidth) / 100 - 25;

  return (
    <div
      className="flexstartcenter"
      style={{
        width: barWidth
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
        className="proglgcircle"
        style={{
          marginLeft: progressWidth
        }}
      >
        <div className="progslcircle ">
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
