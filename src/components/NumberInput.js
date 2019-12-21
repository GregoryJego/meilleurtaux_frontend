import React, { useEffect } from "react";
import "../App.css";

export default function NumberInput({
  label,
  bgColor,
  value,
  setValue,
  userData
}) {
  useEffect(() => {
    // we verify if a choice has already been made
    if (userData) {
      if (userData.budget) {
        // we set the value according to the type of NumberInput ("Montant estimé de votre acquisition", "Montant estimé des travaux", etc)
        let number;
        switch (label) {
          case "Montant estimé de votre acquisition*":
            number = Number(userData.budget.split("-")[0].replace(" ", ""));
            break;
          case "Montant estimé des travaux":
            number = Number(userData.budget.split("-")[1].replace(" ", ""));
            break;
          case "Frais de notaire*":
            number = Number(userData.budget.split("-")[2].replace(" ", ""));
            break;
          default:
            number = 0;
        }
        setValue(number);
      }
    }
  }, [userData, label, setValue]);

  return (
    <div
      style={{
        flex: 1,
        padding: ".5rem",
        backgroundColor: bgColor
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
          <span>{label}</span>
        </div>
        <input
          className="nbinput"
          style={{
            border: "1px solid var(--orange)",
            borderBottom: "3px solid var(--orange)"
          }}
          type="number"
          min="0"
          placeholder="0"
          step="100"
          value={value}
          onChange={event => {
            setValue(event.target.value);
          }}
        />
        <span style={{ marginLeft: ".5rem" }}>€</span>
      </div>
    </div>
  );
}
