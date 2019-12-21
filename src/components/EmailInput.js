import React from "react";
import "../App.css";

export default function EmailInput({ label, value, setValue }) {
  return (
    <div className="emailinputcontainer">
      <div className="emailinputbox">
        <div style={{ display: "flex", flex: 3 }}>
          <span style={{ fontWeight: "400" }}>{label}</span>
        </div>
        <input
          className="emailinput "
          defaultValue={value}
          type="email"
          required
          onChange={event => setValue(event.target.value)}
          placeholder="exemple@mail.com"
        />
      </div>
    </div>
  );
}
