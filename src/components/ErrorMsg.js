import React from "react";
import "../App.css";

// This component is used to display an error message

export default function ErrorMsg(error) {
  return (
    <>{error !== "" && <p style={{ color: "red", fontSize: 14 }}>{error}</p>}</>
  );
}
