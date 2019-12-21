import React, { useEffect } from "react";
import "../App.css";
import Title from "../components/Title";
import CheckBox from "../components/CheckBox";

export default function StateOfProperty({
  setActualStep,
  userData,
  choiceSelected,
  setChoiceSelected,
  setIsBackOffice
}) {
  // The actual step is step 2
  setActualStep(2);

  // We are on the Front Office
  setIsBackOffice(false);

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
      <div className="flexrowb">
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
