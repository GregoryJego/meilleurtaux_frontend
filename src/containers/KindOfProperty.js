import React, { useEffect } from "react";
import "../App.css";
import Title from "../components/Title";
import CheckBox from "../components/CheckBox";

export default function KindOfProperty({
  setActualStep,
  userData,
  choiceSelected,
  setChoiceSelected
}) {
  // The actual step is step 1
  setActualStep(1);

  useEffect(() => {
    // Does userData exist ?
    if (userData) {
      // If yes, we get the stored value : "type" for step 1
      setChoiceSelected(userData["type"]);
    } else setChoiceSelected();
  }, [setChoiceSelected, userData]);

  return (
    <div className="container">
      <Title label="TYPE DE BIEN" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <CheckBox
          label="MAISON"
          choiceSelected={choiceSelected}
          setChoiceSelected={setChoiceSelected}
        />
        <span style={{ width: "1rem" }} />
        <CheckBox
          label="APPARTEMENT"
          choiceSelected={choiceSelected}
          setChoiceSelected={setChoiceSelected}
        />
      </div>
    </div>
  );
}
