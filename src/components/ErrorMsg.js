import React from "react";
import "../App.css";

export default function ErrorMsg(error) {
  return (
    <>{error !== "" && <p style={{ color: "red", fontSize: 14 }}>{error}</p>}</>
  );
}
