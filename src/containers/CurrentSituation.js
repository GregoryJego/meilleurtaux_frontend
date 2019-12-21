import React, { useEffect } from "react";
import "../App.css";
import Title from "../components/Title";
import CheckBox from "../components/CheckBox";

export default function CurrentSituation({
  setActualStep,
  userData,
  choiceSelected,
  setChoiceSelected,
  setIsBackOffice
}) {
  // The actual step is step 4
  setActualStep(4);

  // We are on the Front Office
  setIsBackOffice(false);

  useEffect(() => {
    // Does userData exist ?
    if (userData) {
      // If yes, we get the stored value : "situation" for step 4
      setChoiceSelected(userData["situation"]);
    } else setChoiceSelected();
  }, [setChoiceSelected, userData]);

  return (
    <div className="container">
      <Title label="VOTRE SITUATION ACTUELLE" />
      <div className="flexrowb">
        <CheckBox
          label="LOCATAIRE"
          choiceSelected={choiceSelected}
          setChoiceSelected={setChoiceSelected}
        />
        <span className="w1rem" />
        <CheckBox
          label="PROPRIÉTAIRE"
          choiceSelected={choiceSelected}
          setChoiceSelected={setChoiceSelected}
        />
        <span className="w1rem" />
        <CheckBox
          label="BÉNÉFICIAIRE D'UN LOGEMENT DE FONCTION"
          choiceSelected={choiceSelected}
          setChoiceSelected={setChoiceSelected}
        />
        <span className="w1rem" />
        <CheckBox
          label="HÉBERGÉ À TITRE GRATUIT"
          choiceSelected={choiceSelected}
          setChoiceSelected={setChoiceSelected}
        />
      </div>
    </div>
  );
}
