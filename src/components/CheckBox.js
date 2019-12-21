import React, { useState, useEffect } from "react";
import "../App.css";

export default function CheckBox({ label, choiceSelected, setChoiceSelected }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // We use toLowerCase because the labels are in uppercase
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
      <div className="check">{isChecked && <div className="checksmall" />}</div>
      <p className="checklabel">{label}</p>
    </div>
  );
}
