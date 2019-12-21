import React from "react";
import "../App.css";

export default function SelectInput({ label }) {
  return (
    <div className="selectinputcontainer">
      <div style={{ flex: 1 }}>
        <span>{label}</span>
      </div>
      <div className="selectinputbox ">
        <select className="selectinput">
          <option value="FRANCE">FRANCE</option>
        </select>
      </div>
    </div>
  );
}
