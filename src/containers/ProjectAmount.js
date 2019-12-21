import React, { useState, useEffect } from "react";
import "../App.css";
import Title from "../components/Title";
import NumberInput from "../components/NumberInput";
import Total from "../components/Total";
import ErrorMsg from "../components/ErrorMsg";
import NumberWithSpaces from "../functions/NumberWithSpaces";

export default function ProjectAmount({
  setActualStep,
  userData,
  choiceSelected,
  setChoiceSelected,
  setIsBackOffice,
  error,
  setError
}) {
  // The actual step is step 6
  setActualStep(6);

  // We are on the Front Office
  setIsBackOffice(false);

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

  useEffect(() => {
    // we calculate the notary fees only if propertyAmount is greater than 0 (NB : it can't be a negative number because NumberInput is 0 at minimum)
    if (Number(propertyAmount) !== 0) {
      // we verify is userData exists, otherwise we can't have access to the property "state"
      if (userData) {
        // We apply the notary fees according to the state of the property : "neuf" or "ancien"
        if (userData.state === "neuf") {
          setNotaryFees(Math.round((1.8 / 100) * Number(propertyAmount)));
        } else if (userData.state === "ancien") {
          setNotaryFees(Math.round((7.38 / 100) * Number(propertyAmount)));
        } else
          setError(
            "Une erreur s'est produite, les frais de notaire ne peuvent être calculés. Veuillez recommencer depuis l'étape 1."
          );
      }
    }
  }, [propertyAmount, userData, setError]);

  useEffect(() => {
    // we calculate the total
    const newTotal =
      Number(propertyAmount) + Number(worksAmount) + Number(notaryFees);
    setTotal(newTotal);
    // we verify if propertyAmount and notaryFees are not equal to zero
    if (Number(propertyAmount) !== 0 && Number(notaryFees) !== 0) {
      setError("");
      setChoiceSelected(
        NumberWithSpaces(propertyAmount.toString()) +
          "-" +
          NumberWithSpaces(worksAmount.toString()) +
          "-" +
          NumberWithSpaces(notaryFees.toString()) +
          "-" +
          NumberWithSpaces(newTotal.toString())
      );
    }
    // propertyAmount or/and notaryFees is/are equal to zero
    else
      setError(
        "Le montant estimé de votre acquisition et les frais de notaire sont des champs obligatoires"
      );
  }, [propertyAmount, worksAmount, notaryFees, setChoiceSelected, setError]);

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
      <Total label="Budget total estimé du projet" total={total} />
    </div>
  );
}
