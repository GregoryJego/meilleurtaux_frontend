import React, { useEffect } from "react";
import "../App.css";
import Title from "../components/Title";
import CheckBox from "../components/CheckBox";

export default function StateOfProperty({
  setActualStep,
  userData,
  choiceSelected,
  setChoiceSelected
}) {
  // The actual step is step 2
  setActualStep(2);

  useEffect(() => {
    // Does userData exist ?
    if (userData) {
      // If yes, we get the stored value : "state" for step 2
      setChoiceSelected(userData["state"]);
    } else setChoiceSelected();
  }, [setChoiceSelected, userData]);

  return (
    <div className="container">
      <Title label="ETAT DU BIEN" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <CheckBox
          label="ANCIEN"
          choiceSelected={choiceSelected}
          setChoiceSelected={setChoiceSelected}
        />
        <span style={{ width: "1rem" }} />
        <CheckBox
          label="NEUF"
          choiceSelected={choiceSelected}
          setChoiceSelected={setChoiceSelected}
        />
      </div>
    </div>
  );
}
