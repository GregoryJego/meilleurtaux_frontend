import React, { useEffect } from "react";
import "../App.css";

// const numberWithSpaces = number => {
//   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
// };

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
      // we set the value according to the type of NumberInput ("Montant estimé de votre acquisition", "Montant estimé des travaux", etc)
      let number;
      switch (label) {
        case "Montant estimé de votre acquisition*":
          number = Number(userData.budget.split("-")[0]);
          break;
        case "Montant estimé des travaux":
          number = Number(userData.budget.split("-")[1]);
          break;
        case "Frais de notaire*":
          number = Number(userData.budget.split("-")[2]);
          break;
        default:
          number = 0;
      }
      setValue(number);
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
          style={{
            flex: 2,
            height: 24,
            fontFamily: "Oswald",
            fontWeight: "800",
            fontSize: 18,
            padding: ".5rem",
            textAlign: "right",
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
          // onBlur={event => {
          //   console.log("ON BLUR");
          //   console.log(event.target.value);
          //   setValue(Number(numberWithSpaces(event.target.value)));
          // }}
        />
        <span style={{ marginLeft: ".5rem" }}>€</span>
      </div>
    </div>
  );
}
