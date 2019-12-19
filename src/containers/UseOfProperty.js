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
  // The actual step is step 3
  setActualStep(3);

  useEffect(() => {
    // Does userData exist ?
    if (userData) {
      // If yes, we get the stored value : "use" for step 3
      setChoiceSelected(userData["use"]);
    } else setChoiceSelected();
  }, [setChoiceSelected, userData]);

  return (
    <div className="container">
      <Title label="USAGE DU BIEN" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <CheckBox
          label="RÉSIDENCE PRINCIPALE"
          choiceSelected={choiceSelected}
          setChoiceSelected={setChoiceSelected}
        />
        <span style={{ width: "1rem" }} />
        <CheckBox
          label="RÉSIDENCE SECONDAIRE"
          choiceSelected={choiceSelected}
          setChoiceSelected={setChoiceSelected}
        />{" "}
        <span style={{ width: "1rem" }} />
        <CheckBox
          label="INVESTISSEMENT LOCATIF"
          choiceSelected={choiceSelected}
          setChoiceSelected={setChoiceSelected}
        />
      </div>
    </div>
  );
}
