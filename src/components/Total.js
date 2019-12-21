import React from "react";
import "../App.css";
import NumberWithSpaces from "../functions/NumberWithSpaces";

export default function Total({ label, total }) {
  return (
    <div
      style={{
        flex: 1,
        padding: ".5rem",
        backgroundColor: "var(--white)"
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
          className="nbinput"
          style={{
            border: "1px solid var(--grey)",
            borderBottom: "3px solid var(--grey)"
          }}
        >
          <p>{NumberWithSpaces(total.toString())}</p>
        </div>
        <span style={{ marginLeft: ".5rem" }}>€</span>
      </div>
    </div>
  );
}
