import React, { useEffect } from "react";
import "../App.css";
import Title from "../components/Title";
import SelectInput from "../components/SelectInput";
import ZipcodeInput from "../components/ZipcodeInput";

export default function PropertyLocation({
  setActualStep,
  userData,
  choiceSelected,
  setChoiceSelected,
  setIsBackOffice
}) {
  // The actual step is step 5
  setActualStep(5);

  // We are on the Front Office
  setIsBackOffice(false);

  useEffect(() => {
    // Does userData exist ?
    if (userData) {
      // If yes, we get the stored value : "location" for step 5
      setChoiceSelected(userData.location);
    } else setChoiceSelected();
  }, [setChoiceSelected, userData]);

  return (
    <div className="container">
      <Title label="OÙ SE SITUE LE BIEN À FINANCER ?" />

      <SelectInput label="Dans quel pays se situe votre projet ?*" />
      <ZipcodeInput
        label="Ville ou code postal*"
        choiceSelected={choiceSelected}
        setChoiceSelected={setChoiceSelected}
      />
      <div style={{ padding: ".5rem", fontSize: 14 }}>
        <p>
          La connaissance du code postal du bien permettra de calculer les frais
          de notaire selon les conditions en vigueur dans le département
          concerné.
        </p>
        <p>
          Si vous êtes en recherche de bien sur plusieurs communes, indiquez une
          commune ciblée.
        </p>
      </div>
    </div>
  );
}
