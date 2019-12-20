import React, { useState, useEffect } from "react";
import "../App.css";
import Title from "../components/Title";
import NumberInput from "../components/NumberInput";
import Total from "../components/Total";
import ErrorMsg from "../components/ErrorMsg";

export default function ProjectAmount({
  setActualStep,
  userData,
  choiceSelected,
  setChoiceSelected
}) {
  // The actual step is step 6
  setActualStep(6);

  useEffect(() => {
    // Does userData exist ?
    if (userData) {
      if (userData.budget) {
        // If yes, we get the stored value : "budget" for step 6
        setChoiceSelected(userData.budget);
      }
    } else setChoiceSelected();
  }, [setChoiceSelected, userData]);

  const [propertyAmount, setPropertyAmount] = useState(0);
  const [worksAmount, setWorksAmount] = useState(0);
  const [notaryFees, setNotaryFees] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    // we calculate the notary fees only if propertyAmount is greater than 0 (NB : it can't be a negative number because NumberInput is 0 at minimum)
    if (propertyAmount !== 0) {
      // we verify is userData exists, otherwise we can't have access to the property "use"
      if (userData) {
        if (userData.state === "ancien") {
          setNotaryFees(Math.round((1.8 / 100) * propertyAmount));
        } else if (userData.state === "neuf") {
          setNotaryFees(Math.round((7.38 / 100) * propertyAmount));
        } else
          setError(
            "Une erreur s'est produite, les frais de notaire ne peuvent être calculés. Veuillez recommencer depuis l'étape 1."
          );
      }
    }
  }, [propertyAmount, userData]);

  useEffect(() => {
    const newTotal =
      Number(propertyAmount) + Number(worksAmount) + Number(notaryFees);
    setTotal(newTotal);
    if (propertyAmount !== 0 && notaryFees !== 0) {
      setChoiceSelected(
        propertyAmount + "-" + worksAmount + "-" + notaryFees + "-" + newTotal
      );
    }
  }, [propertyAmount, worksAmount, notaryFees, setChoiceSelected]);

  return (
    <div className="container">
      <Title label="DÉFINISSONS LE MONTANT DE VOTRE PROJET" />

      <NumberInput
        label="Montant estimé de votre acquisition*"
        bgColor="var(--grey2)"
        value={propertyAmount}
        setValue={setPropertyAmount}
        userData={userData}
      />
      <NumberInput
        label="Montant estimé des travaux"
        bgColor="var(--white)"
        value={worksAmount}
        setValue={setWorksAmount}
        userData={userData}
      />
      <NumberInput
        label="Frais de notaire*"
        bgColor="var(--grey2)"
        value={notaryFees}
        setValue={setNotaryFees}
        userData={userData}
      />
      {ErrorMsg(error)}
      <Total
        label="Budget total estimé du projet"
        bgColor="var(--white)"
        total={total}
        choiceSelected={choiceSelected}
      />
    </div>
  );
}
