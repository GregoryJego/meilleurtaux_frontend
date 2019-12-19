import React from "react";
import "../App.css";

export default function SelectInput({ label }) {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "var(--grey2)",
        padding: ".5rem",
        position: "relative"
      }}
    >
      <div style={{ flex: 1 }}>
        <span>{label}</span>
      </div>
      <div
        style={{
          display: "flex",
          flex: 2,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: ".5rem"
        }}
      >
        <select
          style={{
            fontSize: 18,
            fontWeight: "800",
            fontFamily: "Oswald",
            height: 30,
            width: 310,
            border: "1px solid var(--orange)",
            borderBottom: "3px solid var(--orange)",
            backgroundColor: "var(--white)"
          }}
        >
          <option value="FRANCE">FRANCE</option>
        </select>
      </div>
    </div>
  );
}
