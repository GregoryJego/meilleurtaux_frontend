import React from "react";
import "../App.css";

export default function EmailInput({ label, value, setValue }) {
  return (
    <div
      style={{
        padding: ".5rem",
        backgroundColor: "var(--grey2)",
        flex: 1
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
          <span style={{ fontWeight: "400" }}>{label}</span>
        </div>
        <input
          style={{
            display: "flex",
            flex: 2,
            height: 24,
            fontFamily: "Oswald",
            fontWeight: "800",
            fontSize: 18,
            padding: ".5rem",
            outline: "none"
          }}
          value={value}
          type="email"
          required
          onChangeCapture={event => setValue(event.target.value)}
          placeholder="exemple@mail.com"
        />
      </div>
    </div>
  );
}
