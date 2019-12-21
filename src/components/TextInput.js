import React, { useState, useEffect } from "react";
import "../App.css";

export default function TextInput({ label, placeholder, setInput }) {
  const [value, setValue] = useState();
  return (
    <div style={{ display: "flex" }}>
      <div className="textinputbox">
        <span>{label}</span>
        <input
          className="input"
          style={{
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
