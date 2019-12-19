import React from "react";
import "../App.css";
import Prev from "./Prev";
import Legend from "./Legend";
import ProgressBar from "./ProgressBar";
import Next from "../components/Next";

export default function Footer({
  actualStep,
  setActualStep,
  userData,
  setUserData,
  choiceSelected,
  setChoiceSelected
}) {
  return (
    <>
      {actualStep < 8 && (
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ flex: 1 }}>
              <Prev
                actualStep={actualStep}
                setActualStep={setActualStep}
                userData={userData}
                setUserData={setUserData}
                choiceSelected={choiceSelected}
                setChoiceSelected={setChoiceSelected}
              />
            </div>
            <ProgressBar actualStep={actualStep} style={{ flex: 1 }} />
            <div style={{ flex: 1 }}>
              <Next
                actualStep={actualStep}
                setActualStep={setActualStep}
                userData={userData}
                setUserData={setUserData}
                choiceSelected={choiceSelected}
                setChoiceSelected={setChoiceSelected}
              />
            </div>
          </div>
          <Legend label="* Champ obligatoire - Mentions légales" />
          <div>CHOIX ETAPE EN COURS : {choiceSelected}</div>
          {/* <div>CHOIX ETAPE PRECEDENTE : {userData[actualStep - 2]}</div> */}
        </div>
      )}
    </>
  );
}
