import React, { useEffect } from "react";
import "../App.css";
import Title from "../components/Title";
import CheckBox from "../components/CheckBox";

export default function KindOfProperty({
  setActualStep,
  userData,
  choiceSelected,
  setChoiceSelected,
  setIsBackOffice,
  setError
}) {
  // The actual step is step 1
  setActualStep(1);

  // We reinitialize the error message
  setError("");

  // We are on the Front Office
  setIsBackOffice(false);

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
      <div className="flexrowb">
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
