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
  // Label for the Next button
  let label;
  if (actualStep === 7) label = "Valider";
  else label = "Suivant";

  return (
    <>
      {actualStep < 8 && !isBackOffice && (
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem"
            }}
          >
            <Prev
              actualStep={actualStep}
              setActualStep={setActualStep}
              userData={userData}
              setUserData={setUserData}
              choiceSelected={choiceSelected}
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
          <div>CHOIX ETAPE EN COURS : {choiceSelected}</div>
          <div>
            CHOIX ENREGISTRES DANS LES COOKIES :
            {userData && userData[Object.keys(userData)[actualStep - 1]]}
          </div>
        </div>
      )}
    </>
  );
}
