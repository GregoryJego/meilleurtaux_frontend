import React, { useState, useEffect } from "react";
import "../App.css";

export default function TextInput({ label, type, number }) {
  return (
    <div
      style={{
        display: "flex",
        width: "70%",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: ".5rem"
      }}
    >
      <div style={{ display: "flex", flex: 2 }}>
        <span>{label}</span>
      </div>
      <input
        style={{
          display: "flex",
          flex: 1,
          height: 24,
          fontFamily: "Oswald",
          fontWeight: "800",
          fontSize: 16
        }}
        type={number ? "number" : "text"}
      />
      {number && <span>€</span>}
    </div>
  );
}
