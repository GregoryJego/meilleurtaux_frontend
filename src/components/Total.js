import React from "react";
import "../App.css";

const numberWithSpaces = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export default function Total({ label, bgColor, total, choiceSelected }) {
  return (
    <div
      style={{
        flex: 1,
        padding: ".5rem",
        backgroundColor: bgColor
      }}
    >
      <div
        style={{
          width: "70%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <div style={{ display: "flex", flex: 3 }}>
          <span>{label}</span>
        </div>
        <div
          style={{
            flex: 2,
            height: 24,
            fontFamily: "Oswald",
            fontWeight: "800",
            fontSize: 18,
            padding: ".5rem",
            textAlign: "right",
            border: "1px solid var(--grey)",
            borderBottom: "3px solid var(--grey)"
          }}
        >
          <p>{numberWithSpaces(total)}</p>
        </div>
        <span style={{ marginLeft: ".5rem" }}>€</span>
      </div>
    </div>
  );
}
