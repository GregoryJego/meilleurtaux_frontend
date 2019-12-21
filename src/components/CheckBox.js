import React, { useState, useEffect } from "react";
import "../App.css";

export default function CheckBox({ label, choiceSelected, setChoiceSelected }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (choiceSelected !== label.toLowerCase()) setIsChecked(false);
    else setIsChecked(true);
  }, [choiceSelected, label]);

  return (
    <div
      className="checkbox"
      style={{
        backgroundColor: isChecked ? "var(--orange)" : "var(--white)",
        color: isChecked ? "var(--white)" : "var(--black)"
      }}
      onClick={() => {
        if (!isChecked) setChoiceSelected(label.toLowerCase());
        else setChoiceSelected("");
        setIsChecked(!isChecked);
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 16,
          border: "1px solid var(--grey)",
          marginRight: ".5rem",
          position: "relative",
          backgroundColor: "var(--white)"
        }}
      >
        {isChecked && (
          <div
            style={{
              position: "absolute",
              right: 4,
              top: 4,
              width: 8,
              height: 8,
              borderRadius: 8,
              backgroundColor: "var(--orange)"
            }}
          />
        )}
      </div>
      <p style={{ flex: 2, fontWeight: "800", textAlign: "center" }}>{label}</p>
    </div>
  );
}
