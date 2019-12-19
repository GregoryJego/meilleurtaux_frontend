import React from "react";
import "../App.css";

export default function Title({ label }) {
  return (
    <p
      style={{
        fontFamily: "Oswald",
        fontSize: 30,
        fontWeight: "800",
        color: "#E8A144",
        marginBottom: "1.5rem"
      }}
    >
      {label}
    </p>
  );
}
