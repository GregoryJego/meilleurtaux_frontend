import React, { useState, useEffect } from "react";
import "../App.css";

export default function TextInput({ label, placeholder, setInput }) {
  const [value, setValue] = useState();
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginLeft: "1rem"
        }}
      >
        <span>{label}</span>
        <input
          style={{
            height: 24,
            fontFamily: "Oswald",
            fontWeight: "800",
            fontSize: 16,
            marginTop: ".5rem"
          }}
          placeholder={placeholder}
          value={value}
          onChange={event => {
            setValue(event.target.value);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          margin: "0 1rem"
        }}
      >
        <div
          className="button"
          onClick={() => {
            setInput(value);
          }}
        >
          Valider
        </div>
      </div>
    </div>
  );
}
