import React from "react";
import "../App.css";
import Prev from "./Prev";
import ProgressBar from "./ProgressBar";
import Next from "../components/Next";

export default function Footer({
  actualStep,
  setActualStep,
  userData,
  setUserData,
  choiceSelected,
  setChoiceSelected,
  isBackOffice,
  error
}) {
  // We initialize the label for the next button
  let label;
  // If we are on the step 7 (email), the label is "Valider"
  if (actualStep === 7) label = "Valider";
  // Otherwise it is "Suivant"
  else label = "Suivant";

  return (
    <>
      {/* We verifiy if we are not at the last step and that we are in the front office */}
      {actualStep < 8 && !isBackOffice && (
        <div className="container">
          <div className="footerbox">
            <Prev
              actualStep={actualStep}
              setChoiceSelected={setChoiceSelected}
            />
            <ProgressBar actualStep={actualStep} />
            <Next
              label={label}
              actualStep={actualStep}
              setActualStep={setActualStep}
              userData={userData}
              setUserData={setUserData}
              choiceSelected={choiceSelected}
              setChoiceSelected={setChoiceSelected}
              error={error}
            />
          </div>
          <div style={{ fontSize: 10 }}>
            <span>* Champ obligatoire - </span>
            <span style={{ textDecoration: "underline" }}>
              Mentions légales
            </span>
          </div>
        </div>
      )}
    </>
  );
}
